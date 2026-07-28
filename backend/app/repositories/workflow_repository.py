import uuid
from typing import List, Optional
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import Workflow, WorkflowStage, WorkflowExecution
from backend.app.repositories.base import BaseRepository

class WorkflowRepository(BaseRepository[Workflow]):
    def __init__(self, db: AsyncSession):
        """
        Workflow repository handling CRUD operations on workflows.
        """
        super().__init__(Workflow, db)

    async def get_active_workflow_for_project(self, project_id: uuid.UUID) -> Optional[Workflow]:
        """
        Checks if a running or paused workflow already exists for the given project.
        """
        stmt = select(self.model).filter(
            and_(
                self.model.project_id == project_id,
                self.model.status.in_(["Running", "Paused"])
            )
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_stages_for_workflow(self, workflow_id: uuid.UUID) -> List[WorkflowStage]:
        """
        Retrieves all stages belonging to a workflow, ordered by sequence index.
        """
        stmt = select(WorkflowStage).filter(WorkflowStage.workflow_id == workflow_id).order_by(WorkflowStage.order.asc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_executions_for_workflow(self, workflow_id: uuid.UUID) -> List[WorkflowExecution]:
        """
        Retrieves the timeline log entries for a workflow.
        """
        stmt = select(WorkflowExecution).filter(WorkflowExecution.workflow_id == workflow_id).order_by(WorkflowExecution.created_at.asc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_workflow_with_stages(self, workflow_id: uuid.UUID) -> Optional[Workflow]:
        """
        Retrieves a workflow by its ID, eager loading its stages and tasks to prevent lazy-load greenlet errors.
        """
        from sqlalchemy.orm import selectinload
        stmt = select(self.model).filter(self.model.id == workflow_id).options(
            selectinload(self.model.stages).selectinload(WorkflowStage.tasks)
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def list_workflows_with_stages(self, skip: int = 0, limit: int = 100) -> List[Workflow]:
        """
        Lists workflows, eager loading stages and tasks.
        """
        from sqlalchemy.orm import selectinload
        stmt = select(self.model).options(
            selectinload(self.model.stages).selectinload(WorkflowStage.tasks)
        ).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
