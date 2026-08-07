from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.pm_agent import pm_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class RoadmapRequest(BaseModel):
    project_name: str
    ba_requirements_summary: Optional[str] = None

class RoadmapApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/roadmap")
async def synthesize_roadmap(req: RoadmapRequest):
    task = AgentTask(
        title=f"Product Strategy & Roadmap for {req.project_name}",
        description="Synthesize MoSCoW Prioritization, 4-Phase Roadmap, Epics Backlog, and Sprint Plan.",
        phase="Phase 3: Product Strategy",
        assigned_agent_id=pm_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "ba_summary": req.ba_requirements_summary
        }
    )
    pm_agent_instance.assign_task(task)
    roadmap_pkg = await pm_agent_instance.execute(task, {})
    
    return {
        "status": "ROADMAP_SYNTHESIZED",
        "agent": {
            "name": pm_agent_instance.name,
            "role": pm_agent_instance.role
        },
        "roadmap": roadmap_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-roadmap")
async def approve_roadmap(req: RoadmapApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Product roadmap approved! Handoff sent to System Architect (Elena Rostova) for Clean Architecture design." if req.approved else "Roadmap updated based on user feedback.",
        "next_agent": "System Architect (Elena Rostova)"
    }
