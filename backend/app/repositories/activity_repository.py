import uuid
from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import ProjectActivity
from backend.app.repositories.base import BaseRepository

class ActivityRepository(BaseRepository[ProjectActivity]):
    def __init__(self, db: AsyncSession):
        """
        Activity repository for database operations on ProjectActivity model.
        """
        super().__init__(ProjectActivity, db)

    async def get_by_project(self, project_id: uuid.UUID) -> List[ProjectActivity]:
        """
        Retrieves the chronological audit log history of a project.
        """
        stmt = select(self.model).filter(self.model.project_id == project_id).order_by(self.model.created_at.desc())
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
