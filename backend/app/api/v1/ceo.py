from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.ceo_agent import ceo_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class DiscoveryRequest(BaseModel):
    project_name: str
    idea_description: str
    target_audience: Optional[str] = None
    business_goals: Optional[str] = None

class PlanApprovalRequest(BaseModel):
    plan_id: str
    approved: bool
    feedback: Optional[str] = None

@router.post("/discovery")
async def start_ceo_discovery(req: DiscoveryRequest):
    task = AgentTask(
        title=f"Discovery for {req.project_name}",
        description=req.idea_description,
        phase="Phase 1: Discovery",
        assigned_agent_id=ceo_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "idea": req.idea_description,
            "target_audience": req.target_audience,
            "business_goals": req.business_goals
        }
    )
    ceo_agent_instance.assign_task(task)
    plan_info = await ceo_agent_instance.plan(task)
    
    return {
        "status": "DISCOVERY_INITIATED",
        "agent": {
            "name": ceo_agent_instance.name,
            "role": ceo_agent_instance.role
        },
        "discovery_questions": plan_info["discovery_questions"],
        "complexity_score": plan_info["estimated_complexity_score"],
        "sdlc_strategy": plan_info["sdlc_strategy"]
    }

@router.post("/synthesize-plan")
async def synthesize_strategic_plan(req: DiscoveryRequest):
    task = AgentTask(
        title=f"Strategic Execution Plan for {req.project_name}",
        description=req.idea_description,
        phase="Phase 1: Strategic Planning",
        assigned_agent_id=ceo_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "idea": req.idea_description
        }
    )
    ceo_agent_instance.assign_task(task)
    plan_artifact = await ceo_agent_instance.execute(task, {})
    
    return {
        "status": "PLAN_SYNTHESIZED",
        "plan": plan_artifact,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-plan")
async def approve_strategic_plan(req: PlanApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Strategic Execution Plan approved! Task delegation sent to Business Analyst & Product Manager agents." if req.approved else "Plan updated based on user feedback.",
        "delegated_agents": [
            "Business Analyst (Marcus Brody)",
            "Product Manager (Sarah Lin)",
            "System Architect (Elena Rostova)"
        ]
    }
