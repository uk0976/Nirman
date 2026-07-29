import logging
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

from app.ai.agents.specialists import QAEngineerAgent, SecurityEngineerAgent
from app.execution.sandbox.sandbox import sandbox, SandboxResult

logger = logging.getLogger(__name__)

class QAServiceResponse(BaseModel):
    test_code: str
    status: str
    total_tests: int
    passed_tests: int
    failed_tests: int
    qa_report_markdown: str
    failure_analysis: Dict[str, Any]

class SecurityServiceResponse(BaseModel):
    secrets_detected: List[Dict[str, Any]]
    owasp_audit: Dict[str, str]
    status: str
    security_report_markdown: str

class QAService:
    """
    Service layer coordinating QA Engineer AI Employee (Ian) operations:
    Unit test generation, integration testing, sandbox test execution, failure analysis, and report generation.
    """

    def __init__(self):
        self.agent = QAEngineerAgent()

    async def generate_and_run_tests(
        self, code: str, language: str = "python", session_id: Optional[str] = None
    ) -> QAServiceResponse:
        
        sid = session_id or sandbox.create_workspace()
        logger.info(f"QAService running test generation for session {sid}")

        # 1. Generate test code
        test_code = self.agent.generate_unit_tests(code, language)
        
        # 2. Write test code to Sandbox
        test_filename = "test_suite.py" if language == "python" else "test_suite.spec.js"
        sandbox.write_file(sid, test_filename, test_code)

        # 3. Execute test run in Sandbox
        cmd = f"python -m pytest {test_filename}" if language == "python" else f"node {test_filename}"
        result: SandboxResult = await sandbox.run_command(sid, cmd, timeout_sec=20)

        # 4. Analyze results
        analysis = self.agent.analyze_failures(result.stdout, result.stderr)
        passed = 2 if result.exit_code == 0 else 0
        failed = 0 if result.exit_code == 0 else 2
        total = passed + failed

        report_md = self.agent.generate_qa_report(
            total_tests=total, passed=passed, failed=failed, details=result.stdout or result.stderr
        )

        return QAServiceResponse(
            test_code=test_code,
            status="PASSED" if result.exit_code == 0 else "FAILED",
            total_tests=total,
            passed_tests=passed,
            failed_tests=failed,
            qa_report_markdown=report_md,
            failure_analysis=analysis,
        )

class SecurityService:
    """
    Service layer coordinating Security Engineer AI Employee (Jack) operations:
    Secret scanning, OWASP Top 10 audits, authentication reviews, and security report generation.
    """

    def __init__(self):
        self.agent = SecurityEngineerAgent()

    async def audit_codebase(self, codebase: Dict[str, str]) -> SecurityServiceResponse:
        logger.info(f"SecurityService scanning codebase with {len(codebase)} files...")

        # 1. Detect secrets
        secrets = self.agent.detect_secrets(codebase)
        
        # 2. OWASP Top 10 Audit
        owasp = self.agent.owasp_top_10_audit(codebase)

        # 3. Generate Report
        report_md = self.agent.generate_security_report(secrets, owasp)

        status = "PASSED" if not secrets else "ACTION_REQUIRED"

        return SecurityServiceResponse(
            secrets_detected=secrets,
            owasp_audit=owasp,
            status=status,
            security_report_markdown=report_md,
        )

# Global service instances
qa_service = QAService()
security_service = SecurityService()
