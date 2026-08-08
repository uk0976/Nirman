from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.devops_agent import devops_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class DeploySpecRequest(BaseModel):
    project_name: str
    security_audit_summary: Optional[str] = None

class DeployApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/deploy-spec")
async def synthesize_devops_infrastructure(req: DeploySpecRequest):
    task = AgentTask(
        title=f"Production Infrastructure & Docker Compose Stack for {req.project_name}",
        description="Synthesize Infrastructure Architecture Document, Production Docker Compose, Terraform IaC Blueprint, and Disaster Recovery Runbook.",
        phase="Phase 14: DevOps & Production Infrastructure",
        assigned_agent_id=devops_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "sec_summary": req.security_audit_summary
        }
    )
    devops_agent_instance.assign_task(task)
    devops_pkg = await devops_agent_instance.execute(task, {})
    
    return {
        "status": "INFRASTRUCTURE_SYNTHESIZED",
        "agent": {
            "name": devops_agent_instance.name,
            "role": devops_agent_instance.role
        },
        "devops_infrastructure": devops_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-deployment")
async def approve_devops_deployment(req: DeployApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Production infrastructure and Docker Compose stack approved! Multi-Agent SDLC Engineering phase complete and ready for production deployment!" if req.approved else "DevOps infrastructure updated based on user feedback.",
        "next_agent": "FINAL_SDLC_COMPLETE"
    }
