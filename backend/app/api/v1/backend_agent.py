from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.backend_agent import backend_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class BackendBuildRequest(BaseModel):
    project_name: str
    frontend_architecture_summary: Optional[str] = None

class BackendApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/build")
async def synthesize_backend_architecture(req: BackendBuildRequest):
    task = AgentTask(
        title=f"FastAPI REST APIs & Repositories for {req.project_name}",
        description="Synthesize FastAPI Route Registry, Async SQLAlchemy Repositories, Redis Session Cache, and Pytest Integration Suites.",
        phase="Phase 11: Backend Implementation",
        assigned_agent_id=backend_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "fad_summary": req.frontend_architecture_summary
        }
    )
    backend_agent_instance.assign_task(task)
    backend_pkg = await backend_agent_instance.execute(task, {})
    
    return {
        "status": "BACKEND_ARCHITECTURE_SYNTHESIZED",
        "agent": {
            "name": backend_agent_instance.name,
            "role": backend_agent_instance.role
        },
        "backend_architecture": backend_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-build")
async def approve_backend_architecture(req: BackendApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Backend architecture approved! Handoff sent to QA & Testing Agent (Rachel Adams) for end-to-end test suite execution." if req.approved else "Backend specifications updated based on user feedback.",
        "next_agent": "QA & Testing Agent (Rachel Adams)"
    }
