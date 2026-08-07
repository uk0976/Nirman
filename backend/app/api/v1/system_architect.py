from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.system_architect_agent import system_architect_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class SystemDesignRequest(BaseModel):
    project_name: str
    sad_summary: Optional[str] = None

class SystemDesignApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/design")
async def synthesize_system_design(req: SystemDesignRequest):
    task = AgentTask(
        title=f"Detailed System Design for {req.project_name}",
        description="Synthesize Clean Architecture 4-Layer specification, module interfaces, sequence diagrams, and design pattern mappings.",
        phase="Phase 5: Detailed System Design",
        assigned_agent_id=system_architect_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "sad_summary": req.sad_summary
        }
    )
    system_architect_agent_instance.assign_task(task)
    system_design_pkg = await system_architect_agent_instance.execute(task, {})
    
    return {
        "status": "SYSTEM_DESIGN_SYNTHESIZED",
        "agent": {
            "name": system_architect_agent_instance.name,
            "role": system_architect_agent_instance.role
        },
        "system_design": system_design_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-design")
async def approve_system_design(req: SystemDesignApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Detailed system design approved! Handoff sent to Database Architect (David Chen) for 3NF PostgreSQL DDL schema & Alembic migration modeling." if req.approved else "System design updated based on user feedback.",
        "next_agent": "Database Architect (David Chen)"
    }
