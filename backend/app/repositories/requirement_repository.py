import uuid
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import ProjectRequirement
from backend.app.repositories.base import BaseRepository

class RequirementRepository(BaseRepository[ProjectRequirement]):
    def __init__(self, db: AsyncSession):
        """
        Requirement repository for database operations on ProjectRequirement model.
        """
        super().__init__(ProjectRequirement, db)

    async def get_by_project(self, project_id: uuid.UUID) -> List[ProjectRequirement]:
        """
        Retrieves all requirements assigned to a project.
        """
        stmt = select(self.model).filter(self.model.project_id == project_id)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_requirement(self, project_id: uuid.UUID, requirement_id: uuid.UUID) -> Optional[ProjectRequirement]:
        """
        Retrieves a single requirement verifying it belongs to the given project.
        """
        stmt = select(self.model).filter(
            self.model.project_id == project_id,
            self.model.id == requirement_id
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()
