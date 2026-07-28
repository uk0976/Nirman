import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import WorkflowExecution
from backend.app.repositories.workflow_repository import WorkflowRepository

class TimelineService:
    def __init__(self, db: AsyncSession):
        """
        Service layer to capture and output chronological workflow execution events.
        """
        self.db = db
        self.repo = WorkflowRepository(db)

    async def record_event(
        self,
        workflow_id: uuid.UUID,
        event: str,
        message: str,
        agent_id: Optional[uuid.UUID] = None,
        metadata_json: Optional[dict] = None
    ) -> WorkflowExecution:
        """
        Records a workflow lifecycle event in the database execution log.
        """
        execution = WorkflowExecution(
            workflow_id=workflow_id,
            event=event,
            message=message,
            agent_id=agent_id,
            metadata_json=metadata_json or {}
        )
        self.db.add(execution)
        await self.db.flush()
        return execution

    async def get_timeline(self, workflow_id: uuid.UUID) -> List[WorkflowExecution]:
        """
        Retrieves the chronological list of event logs for the workflow.
        """
        return await self.repo.get_executions_for_workflow(workflow_id)
