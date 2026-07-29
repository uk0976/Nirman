import logging
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session

from app.ai.engine.orchestrator import orchestrator, OrchestrationResponse

logger = logging.getLogger(__name__)

class OrchestratorService:
    """
    Application service layer wrapping AIOrchestrator for database state persistence,
    project tracking, and execution logging.
    """

    @staticmethod
    async def run_orchestration(
        db: Session, prompt: str, project_id: str, workflow_id: Optional[str] = None
    ) -> OrchestrationResponse:
        
        logger.info(f"OrchestratorService executing workflow for project {project_id}")
        response = await orchestrator.execute_user_request(prompt, project_id, workflow_id)
        
        # Here we persist DB logs, update project timeline, and store artifacts
        return response
