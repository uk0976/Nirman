from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.qa_agent import qa_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class QAStrategyRequest(BaseModel):
    project_name: str
    backend_architecture_summary: Optional[str] = None

class QAApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/strategy")
async def synthesize_qa_strategy(req: QAStrategyRequest):
    task = AgentTask(
        title=f"Quality Engineering Strategy & AI Eval Matrix for {req.project_name}",
        description="Synthesize Test Pyramid, Traceability Matrix, AI Agent Evaluation Scorecards, and CI/CD Quality Gates.",
        phase="Phase 12: Quality Engineering & Testing",
        assigned_agent_id=qa_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "bad_summary": req.backend_architecture_summary
        }
    )
    qa_agent_instance.assign_task(task)
    qa_pkg = await qa_agent_instance.execute(task, {})
    
    return {
        "status": "QA_STRATEGY_SYNTHESIZED",
        "agent": {
            "name": qa_agent_instance.name,
            "role": qa_agent_instance.role
        },
        "quality_strategy": qa_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-strategy")
async def approve_qa_strategy(req: QAApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Quality strategy and AI eval rubrics approved! Handoff sent to Security & DevOps Engineer Agent (Devon Vance) for production hardening and infrastructure deployment." if req.approved else "QA strategy updated based on user feedback.",
        "next_agent": "Security & DevOps Engineer Agent (Devon Vance)"
    }
