from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.security_agent import security_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class SecurityAuditRequest(BaseModel):
    project_name: str
    qa_strategy_summary: Optional[str] = None

class SecurityApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/audit")
async def synthesize_security_audit(req: SecurityAuditRequest):
    task = AgentTask(
        title=f"Security Architecture & Threat Audit for {req.project_name}",
        description="Synthesize STRIDE Threat Model, AI Tool Sandboxing Matrix, Secrets Encryption Specs, and OWASP Audit Results.",
        phase="Phase 13: Security Architecture & Threat Audit",
        assigned_agent_id=security_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "qsd_summary": req.qa_strategy_summary
        }
    )
    security_agent_instance.assign_task(task)
    sec_pkg = await security_agent_instance.execute(task, {})
    
    return {
        "status": "SECURITY_AUDIT_SYNTHESIZED",
        "agent": {
            "name": security_agent_instance.name,
            "role": security_agent_instance.role
        },
        "security_architecture": sec_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-security")
async def approve_security_audit(req: SecurityApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "Security architecture and STRIDE threat mitigations approved! Handoff sent to DevOps Engineer Agent (Devon Vance) for Docker Compose & Kubernetes production deployment." if req.approved else "Security audit updated based on user feedback.",
        "next_agent": "DevOps Engineer Agent (Devon Vance)"
    }
