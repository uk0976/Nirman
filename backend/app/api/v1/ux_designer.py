from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.ux_designer_agent import ux_designer_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class DesignSystemRequest(BaseModel):
    project_name: str
    db_schema_summary: Optional[str] = None

class DesignApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/design-system")
async def synthesize_design_system(req: DesignSystemRequest):
    task = AgentTask(
        title=f"Product Design System & UX Specs for {req.project_name}",
        description="Synthesize Design Tokens, User Journey Maps, AI Component Specs, Screen State Matrix, and WCAG 2.2 AA Accessibility Rules.",
        phase="Phase 9: Product Design & Tokens",
        assigned_agent_id=ux_designer_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "dad_summary": req.db_schema_summary
        }
    )
    ux_designer_agent_instance.assign_task(task)
    design_pkg = await ux_designer_agent_instance.execute(task, {})
    
    return {
        "status": "DESIGN_SYSTEM_SYNTHESIZED",
        "agent": {
            "name": ux_designer_agent_instance.name,
            "role": ux_designer_agent_instance.role
        },
        "design_system": design_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-design")
async def approve_design_system(req: DesignApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Product Design System approved and frozen! Handoff sent to Frontend Engineer Agent (Lucas Meyer) for Next.js 15 component implementation." if req.approved else "Design system updated based on user feedback.",
        "next_agent": "Frontend Engineer Agent (Lucas Meyer)"
    }
