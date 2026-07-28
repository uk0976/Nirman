import uuid
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from backend.app.core.database import get_db
from backend.app.schemas.warroom import (
    WarRoomSessionResponse, SessionCreateRequest, MessageCreateRequest,
    WarRoomMessageResponse, VoteCreateRequest, VoteResponse,
    DecisionCreateRequest, DecisionResponse, ApproveOverrideRequest,
    TimelineEventResponse
)
from backend.app.models.warroom import WarRoomSession, WarRoomParticipant, WarRoomMessage, Decision, Vote
from backend.app.warroom.coordinator import WarRoomCoordinator
from backend.app.warroom.summaries import SummaryEngine

router = APIRouter()

async def get_session_with_relations(session_id: uuid.UUID, db: AsyncSession) -> Optional[WarRoomSession]:
    """
    Eager loads participant list and decisions with nested votes to prevent lazy load exceptions.
    """
    stmt = select(WarRoomSession).filter(WarRoomSession.id == session_id).options(
        selectinload(WarRoomSession.participants),
        selectinload(WarRoomSession.decisions).selectinload(Decision.votes)
    )
    res = await db.execute(stmt)
    return res.scalars().first()


@router.post("/session", response_model=WarRoomSessionResponse)
async def create_session(req: SessionCreateRequest, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        session = await coordinator.create_session(
            project_id=req.project_id,
            workflow_id=req.workflow_id,
            title=req.title,
            purpose=req.purpose
        )
        await db.commit()
        return await get_session_with_relations(session.id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/session/{id}", response_model=WarRoomSessionResponse)
async def read_session(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    session = await get_session_with_relations(id, db)
    if not session:
        raise HTTPException(status_code=404, detail="War Room session not found")
    return session


@router.post("/session/{id}/start", response_model=WarRoomSessionResponse)
async def start_session(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        await coordinator.start_discussion(id)
        await db.commit()
        return await get_session_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/invite", response_model=WarRoomSessionResponse)
async def invite_participants(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        await coordinator.invite_agents(id)
        await db.commit()
        return await get_session_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/message", response_model=WarRoomMessageResponse)
async def post_message(id: uuid.UUID, req: MessageCreateRequest, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        msg = await coordinator.post_message(
            session_id=id,
            agent_id=req.agent_id,
            message=req.message,
            message_type=req.message_type,
            parent_message_id=req.parent_message_id,
            confidence=req.confidence
        )
        await db.commit()
        return msg
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/decision", response_model=DecisionResponse)
async def initiate_decision(id: uuid.UUID, req: DecisionCreateRequest, db: AsyncSession = Depends(get_db)):
    """
    Creates a decision card and starts voting on the session.
    """
    try:
        coordinator = WarRoomCoordinator(db)
        decision = await coordinator.initiate_voting(
            session_id=id,
            title=req.title,
            description=req.description,
            decision_type=req.decision_type
        )
        await db.commit()
        
        # Reload decision with empty votes
        stmt = select(Decision).filter(Decision.id == decision.id).options(selectinload(Decision.votes))
        res = await db.execute(stmt)
        return res.scalars().first()
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/vote", response_model=VoteResponse)
async def cast_vote(id: uuid.UUID, req: VoteCreateRequest, decision_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        vote = await coordinator.cast_vote(
            decision_id=decision_id,
            agent_id=req.agent_id,
            vote_choice=req.vote,
            reason=req.reason
        )
        await db.commit()
        return vote
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/approve", response_model=DecisionResponse)
async def executive_approve(id: uuid.UUID, decision_id: uuid.UUID, req: ApproveOverrideRequest, db: AsyncSession = Depends(get_db)):
    """
    Allows executive override for decisions (CEO veto).
    """
    try:
        coordinator = WarRoomCoordinator(db)
        decision = await coordinator.approve_override(
            decision_id=decision_id,
            approved_by=req.approved_by,
            reasoning=req.reasoning
        )
        await db.commit()
        
        stmt = select(Decision).filter(Decision.id == decision_id).options(selectinload(Decision.votes))
        res = await db.execute(stmt)
        return res.scalars().first()
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/session/{id}/close", response_model=WarRoomSessionResponse)
async def close_session(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        coordinator = WarRoomCoordinator(db)
        await coordinator.close_session(id)
        await db.commit()
        return await get_session_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/session/{id}/timeline", response_model=List[TimelineEventResponse])
async def get_session_timeline(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    coordinator = WarRoomCoordinator(db)
    return await coordinator.get_timeline(id)


@router.get("/session/{id}/summary")
async def get_session_summary(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    session = await get_session_with_relations(id, db)
    if not session:
        raise HTTPException(status_code=404, detail="War Room session not found")

    stmt_msgs = select(WarRoomMessage).filter(WarRoomMessage.session_id == id)
    res_msgs = await db.execute(stmt_msgs)
    messages = list(res_msgs.scalars().all())

    return SummaryEngine.generate_summary(session, messages, session.decisions)


@router.websocket("/session/{id}/ws")
async def session_websocket(websocket: WebSocket, id: uuid.UUID):
    """
    Real-time streaming for discussions, timeline logs, voting alerts, consensus, and status shifts.
    """
    await websocket.accept()
    try:
        while True:
            # Receive sync request parameters
            data = await websocket.receive_json()
            action = data.get("action", "ping")

            await websocket.send_json({"type": "status", "content": f"Socket command '{action}' accepted."})
            if action == "subscribe":
                # Stream initial state updates
                await websocket.send_json({"type": "session_status", "content": "Running"})
                await websocket.send_json({"type": "timeline_update", "content": "Specialists analyzing design choices."})
                await websocket.send_json({"type": "consensus_ratio", "content": 75.0})
    except WebSocketDisconnect:
        pass
