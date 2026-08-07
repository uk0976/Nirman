from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.architect_agent import architect_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class ArchitectureRequest(BaseModel):
    project_name: str
    pm_roadmap_summary: Optional[str] = None

class ArchitectureApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/design")
async def synthesize_architecture(req: ArchitectureRequest):
    task = AgentTask(
        title=f"Solution Architecture Design for {req.project_name}",
        description="Synthesize Solution Architecture Document (SAD), ADR-001 through ADR-005, Component Topology, and Security Blueprint.",
        phase="Phase 4: High-Level Architecture",
        assigned_agent_id=architect_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "pm_summary": req.pm_roadmap_summary
        }
    )
    architect_agent_instance.assign_task(task)
    architecture_pkg = await architect_agent_instance.execute(task, {})
    
    return {
        "status": "ARCHITECTURE_SYNTHESIZED",
        "agent": {
            "name": architect_agent_instance.name,
            "role": architect_agent_instance.role
        },
        "architecture": architecture_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-architecture")
async def approve_architecture(req: ArchitectureApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Solution Architecture blueprint approved! Handoff sent to Database Architect (David Chen) for 3NF PostgreSQL schema modeling." if req.approved else "Architecture updated based on user feedback.",
        "next_agent": "Database Architect (David Chen)"
    }
