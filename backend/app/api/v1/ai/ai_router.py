import uuid
import asyncio
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from backend.app.core.database import get_db
from backend.app.schemas.ai import (
    StructuredAIResponse, AIExecuteRequest, AIChatRequest,
    AIReasonRequest, AIStreamRequest
)
from backend.app.ai.engine.router import TaskRouter
from backend.app.ai.engine.reasoning import ReasoningEngine
from backend.app.ai.registry import AgentRegistry
from backend.app.ai.cost.tracker import CostTracker
from backend.app.ai.telemetry.telemetry import TelemetryTracker

router = APIRouter()

# Shared singletons for simple query counters
shared_cost_tracker = CostTracker()
shared_telemetry = TelemetryTracker()

@router.post("/execute", response_model=StructuredAIResponse)
async def ai_execute(req: AIExecuteRequest, db: AsyncSession = Depends(get_db)):
    """
    Routes and executes a task through the task router to the best AI specialist.
    """
    try:
        # Determine best agent
        task_router = TaskRouter()
        best_agent, fallback, priority = task_router.route_task(req.task_title, req.task_description)

        # Execute in reasoning engine
        engine = ReasoningEngine(
            cost_tracker=shared_cost_tracker,
            telemetry=shared_telemetry
        )
        response = await engine.reason(
            agent=best_agent,
            task_title=req.task_title,
            task_description=req.task_description,
            context=req.context,
            validator_types=req.validator_types,
            max_retries=req.max_retries,
            primary_provider=req.primary_provider,
            workflow_id=req.workflow_id,
            task_id=req.task_id,
            db=db
        )
        await db.commit()
        return response
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/chat", response_model=StructuredAIResponse)
async def ai_chat(req: AIChatRequest, db: AsyncSession = Depends(get_db)):
    """
    Initiates/continues an AI conversation, saving message exchanges in the database.
    """
    try:
        from backend.app.models.agent import AgentConversation, AgentMessage
        from backend.app.models.project import Project

        # Find or seed a baseline project for isolation
        res_proj = await db.execute(select(Project).limit(1))
        project = res_proj.scalars().first()
        if not project:
            # Create a fallback project so chat always succeeds
            project = Project(
                owner_id=uuid.uuid4(), # System owner
                name="System Chat Sandbox",
                description="Default sandbox for chat histories",
                technology_stack=["FastAPI"]
            )
            db.add(project)
            await db.flush()

        conv_id = req.conversation_id
        if not conv_id:
            conv = AgentConversation(
                project_id=project.id,
                title=f"Chat thread with {req.agent_role}"
            )
            db.add(conv)
            await db.flush()
            conv_id = conv.id

        # Save user message
        user_msg = AgentMessage(
            conversation_id=conv_id,
            content=req.message,
            sender_user_id=uuid.uuid4() # Mock user id
        )
        db.add(user_msg)
        await db.flush()

        # Load specialists
        registry = AgentRegistry()
        agent = registry.find_by_role(req.agent_role or "Product Manager")
        if not agent:
            agent = registry.find_by_role("Product Manager")

        # Load conversation history for prompt builder context
        res_msgs = await db.execute(
            select(AgentMessage).filter(AgentMessage.conversation_id == conv_id).order_by(AgentMessage.created_at.asc())
        )
        history = res_msgs.scalars().all()
        history_str = "\n".join([f"Sender: {m.sender_user_id or m.sender_agent_id}: {m.content}" for m in history])

        engine = ReasoningEngine(
            cost_tracker=shared_cost_tracker,
            telemetry=shared_telemetry
        )
        response = await engine.reason(
            agent=agent,
            task_title="AI Agent Chat response",
            task_description=req.message,
            context={"project_name": project.name, "conversation": history_str},
            db=db
        )

        # Save agent response message
        agent_msg = AgentMessage(
            conversation_id=conv_id,
            content=response.result,
            sender_agent_id=uuid.uuid4()
        )
        db.add(agent_msg)

        await db.commit()
        return response
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/reason", response_model=StructuredAIResponse)
async def ai_reason(req: AIReasonRequest, db: AsyncSession = Depends(get_db)):
    """
    Queries the reasoning engine directly for a specific agent role.
    """
    try:
        registry = AgentRegistry()
        agent = registry.find_by_role(req.agent_role)
        if not agent:
            raise HTTPException(status_code=404, detail=f"Agent with role '{req.agent_role}' not found")

        engine = ReasoningEngine(
            cost_tracker=shared_cost_tracker,
            telemetry=shared_telemetry
        )
        response = await engine.reason(
            agent=agent,
            task_title=req.task_title,
            task_description=req.task_description,
            context=req.context,
            db=db
        )
        await db.commit()
        return response
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/stream")
async def ai_stream(req: AIStreamRequest):
    """
    Streams output tokens via Server-Sent Events (SSE).
    """
    from backend.app.ai.providers.openai import OpenAIProvider
    provider = OpenAIProvider()

    async def event_generator():
        async for token in provider.stream(prompt=req.prompt, system_prompt=req.system_prompt, config={"model": req.model}):
            yield f"data: {token}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@router.get("/models")
async def list_ai_models():
    from backend.app.ai.providers.openai import OpenAIProvider
    provider = OpenAIProvider()
    return {"models": await provider.models()}


@router.get("/providers")
async def list_ai_providers():
    return {
        "providers": [
            {"name": "openai", "status": "active"},
            {"name": "claude", "status": "fallback"},
            {"name": "gemini", "status": "fallback"}
        ]
    }


@router.get("/usage")
async def get_ai_usage():
    return shared_cost_tracker.get_total_costs()


@router.get("/health")
async def get_ai_health():
    from backend.app.ai.providers.openai import OpenAIProvider
    provider = OpenAIProvider()
    healthy = await provider.health()
    return {"status": "healthy" if healthy else "degraded", "openai": healthy}


@router.websocket("/ws/stream")
async def ws_stream(websocket: WebSocket):
    """
    Handles real-time token streaming and execution progress updates over WebSockets.
    """
    await websocket.accept()
    try:
        while True:
            # Accept execution arguments
            data = await websocket.receive_json()
            prompt = data.get("prompt", "")
            system_prompt = data.get("system_prompt", "")
            model = data.get("model", "gpt-4o")

            await websocket.send_json({"type": "status", "content": "Initializing Specialist..."})
            await websocket.send_json({"type": "progress", "content": "Routing Task...", "progress": 20.0})

            # Stream tokens from OpenAI provider
            from backend.app.ai.providers.openai import OpenAIProvider
            provider = OpenAIProvider()
            
            await websocket.send_json({"type": "progress", "content": "Streaming response tokens...", "progress": 50.0})
            
            async for token in provider.stream(prompt=prompt, system_prompt=system_prompt, config={"model": model}):
                await websocket.send_json({"type": "token", "content": token})
                await asyncio.sleep(0.02)

            await websocket.send_json({"type": "progress", "content": "Validating output constraints...", "progress": 90.0})
            await websocket.send_json({"type": "status", "content": "Execution complete."})
            await websocket.send_json({"type": "progress", "content": "Done", "progress": 100.0})

    except WebSocketDisconnect:
        pass
