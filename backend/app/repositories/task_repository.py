import uuid
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.workflow import WorkflowTask
from backend.app.repositories.base import BaseRepository

class TaskRepository(BaseRepository[WorkflowTask]):
    def __init__(self, db: AsyncSession):
        """
        Task repository handling CRUD operations on workflow tasks.
        """
        super().__init__(WorkflowTask, db)

    async def get_tasks_by_stage(self, stage_id: uuid.UUID) -> List[WorkflowTask]:
        """
        Retrieves all tasks associated with a workflow stage.
        """
        stmt = select(self.model).filter(self.model.workflow_stage_id == stage_id).order_by(self.model.created_at.asc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_dependent_tasks(self, task_id: uuid.UUID) -> List[WorkflowTask]:
        """
        Retrieves tasks that depend directly on the specified task completion.
        """
        stmt = select(self.model).filter(self.model.depends_on == task_id)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
