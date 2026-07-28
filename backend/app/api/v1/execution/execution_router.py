import uuid
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from backend.app.core.database import get_db
from backend.app.schemas.execution import (
    ExecutionResponse, ExecutionCreateRequest,
    ArtifactResponse, DeliverableResponse,
    ExecutionStageResponse
)
from backend.app.models.execution import Execution, ExecutionStage, Artifact, Deliverable
from backend.app.execution.executor.executor import ExecutionEngine

router = APIRouter()

async def get_execution_with_relations(execution_id: uuid.UUID, db: AsyncSession) -> Optional[Execution]:
    """
    Eager loads stages, artifacts, and deliverables to prevent greenlet lazy loading exceptions.
    """
    stmt = select(Execution).filter(Execution.id == execution_id).options(
        selectinload(Execution.stages),
        selectinload(Execution.artifacts),
        selectinload(Execution.deliverables)
    )
    res = await db.execute(stmt)
    return res.scalars().first()


@router.post("/start", response_model=ExecutionResponse)
async def start_pipeline(req: ExecutionCreateRequest, db: AsyncSession = Depends(get_db)):
    try:
        engine = ExecutionEngine(db)
        execution = await engine.start_execution(
            project_id=req.project_id,
            workflow_id=req.workflow_id
        )
        await db.commit()
        return await get_execution_with_relations(execution.id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id}", response_model=ExecutionResponse)
async def read_execution(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    execution = await get_execution_with_relations(id, db)
    if not execution:
        raise HTTPException(status_code=404, detail="Execution pipeline run not found")
    return execution


@router.post("/{id}/pause", response_model=ExecutionResponse)
async def pause_pipeline(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        engine = ExecutionEngine(db)
        await engine.pause_execution(id)
        await db.commit()
        return await get_execution_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{id}/resume", response_model=ExecutionResponse)
async def resume_pipeline(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        engine = ExecutionEngine(db)
        await engine.resume_execution(id)
        await db.commit()
        return await get_execution_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{id}/cancel", response_model=ExecutionResponse)
async def cancel_pipeline(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    try:
        engine = ExecutionEngine(db)
        await engine.cancel_execution(id)
        await db.commit()
        return await get_execution_with_relations(id, db)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{id}/artifacts", response_model=List[ArtifactResponse])
async def get_execution_artifacts(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    stmt = select(Artifact).filter(Artifact.execution_id == id)
    res = await db.execute(stmt)
    return list(res.scalars().all())


@router.get("/{id}/deliverables", response_model=List[DeliverableResponse])
async def get_execution_deliverables(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    stmt = select(Deliverable).filter(Deliverable.execution_id == id)
    res = await db.execute(stmt)
    return list(res.scalars().all())


@router.get("/{id}/timeline")
async def get_execution_timeline(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """
    Returns active timelines progress metrics and logs.
    """
    execution = await get_execution_with_relations(id, db)
    if not execution:
        raise HTTPException(status_code=404, detail="Execution run not found")

    timeline = []
    for stage in execution.stages:
        timeline.append({
            "stage": stage.name,
            "status": stage.status,
            "assigned_agent": stage.assigned_agent,
            "started_at": stage.started_at,
            "completed_at": stage.completed_at
        })
    return timeline
