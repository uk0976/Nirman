from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.ba_agent import ba_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class RequirementsRequest(BaseModel):
    project_name: str
    ceo_plan_summary: Optional[str] = None

class RequirementsApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/requirements")
async def synthesize_requirements(req: RequirementsRequest):
    task = AgentTask(
        title=f"Requirements Engineering for {req.project_name}",
        description="Synthesize BRD, FRD, NFR, User Personas, User Stories, and Traceability Matrix.",
        phase="Phase 2: Requirements Gathering",
        assigned_agent_id=ba_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "ceo_summary": req.ceo_plan_summary
        }
    )
    ba_agent_instance.assign_task(task)
    requirements_pkg = await ba_agent_instance.execute(task, {})
    
    return {
        "status": "REQUIREMENTS_SYNTHESIZED",
        "agent": {
            "name": ba_agent_instance.name,
            "role": ba_agent_instance.role
        },
        "requirements": requirements_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-requirements")
async def approve_requirements(req: RequirementsApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Requirements package approved! Handoff sent to Product Manager (Sarah Lin) for PRD synthesis." if req.approved else "Requirements updated based on user feedback.",
        "next_agent": "Product Manager (Sarah Lin)"
    }
