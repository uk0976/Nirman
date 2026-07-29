import logging
from typing import Dict, Optional, List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.qa_security_service import (
    qa_service,
    security_service,
    QAServiceResponse,
    SecurityServiceResponse,
)

logger = logging.getLogger(__name__)

router = APIRouter(tags=["QA & Security AI Employees"])

class QATestRunRequest(BaseModel):
    code: str
    language: str = "python"
    session_id: Optional[str] = None

class SecurityAuditRequest(BaseModel):
    codebase_files: Dict[str, str]

@router.post("/qa/run-tests", response_model=QAServiceResponse)
async def run_qa_tests(req: QATestRunRequest):
    """Generates unit tests, executes them in NirmanSandbox, and returns failure analysis & report."""
    return await qa_service.generate_and_run_tests(req.code, req.language, req.session_id)

@router.post("/security/audit", response_model=SecurityServiceResponse)
async def audit_security(req: SecurityAuditRequest):
    """Scans codebase for hardcoded secrets, OWASP vulnerabilities, and generates a security report."""
    return await security_service.audit_codebase(req.codebase_files)
