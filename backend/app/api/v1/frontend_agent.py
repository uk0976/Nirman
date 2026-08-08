from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.frontend_agent import frontend_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class FrontendBuildRequest(BaseModel):
    project_name: str
    design_system_summary: Optional[str] = None

class FrontendApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/build")
async def synthesize_frontend_architecture(req: FrontendBuildRequest):
    task = AgentTask(
        title=f"Frontend Architecture & Typed ApiClient for {req.project_name}",
        description="Synthesize Next.js 15 App Router architecture, typed ApiClient, TanStack Query hooks, and Vitest/Playwright test pipelines.",
        phase="Phase 10: Frontend Implementation",
        assigned_agent_id=frontend_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "dsd_summary": req.design_system_summary
        }
    )
    frontend_agent_instance.assign_task(task)
    frontend_pkg = await frontend_agent_instance.execute(task, {})
    
    return {
        "status": "FRONTEND_ARCHITECTURE_SYNTHESIZED",
        "agent": {
            "name": frontend_agent_instance.name,
            "role": frontend_agent_instance.role
        },
        "frontend_architecture": frontend_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-build")
async def approve_frontend_architecture(req: FrontendApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Frontend architecture approved! Handoff sent to Backend Engineer Agent (Ethan Vance) for FastAPI REST service implementation." if req.approved else "Frontend specifications updated based on user feedback.",
        "next_agent": "Backend Engineer Agent (Ethan Vance)"
    }
