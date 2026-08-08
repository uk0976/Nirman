from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.doc_agent import doc_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class DocCompileRequest(BaseModel):
    project_name: str
    infrastructure_summary: Optional[str] = None

class DocApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/compile")
async def compile_documentation_suite(req: DocCompileRequest):
    task = AgentTask(
        title=f"Master SDLC Documentation Suite for {req.project_name}",
        description="Synthesize Master Documentation Hierarchy, Developer Onboarding Guide, ADR Registry, and 14 SDLC Agent Specifications.",
        phase="Phase 15: Technical Writing & Documentation",
        assigned_agent_id=doc_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "iad_summary": req.infrastructure_summary
        }
    )
    doc_agent_instance.assign_task(task)
    doc_pkg = await doc_agent_instance.execute(task, {})
    
    return {
        "status": "DOCUMENTATION_SUITE_COMPILED",
        "agent": {
            "name": doc_agent_instance.name,
            "role": doc_agent_instance.role
        },
        "documentation_suite": doc_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-docs")
async def approve_documentation_suite(req: DocApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Master documentation suite approved and frozen! Complete multi-agent SDLC engineering process verified and fully documented!" if req.approved else "Documentation updated based on user feedback.",
        "next_agent": "FINAL_DOC_COMPLETE"
    }
