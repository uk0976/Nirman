import uuid
from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import ProjectFile
from backend.app.repositories.base import BaseRepository

class FileRepository(BaseRepository[ProjectFile]):
    def __init__(self, db: AsyncSession):
        """
        File repository for database operations on ProjectFile model.
        """
        super().__init__(ProjectFile, db)

    async def get_by_project(self, project_id: uuid.UUID) -> List[ProjectFile]:
        """
        Retrieves database listings of all files uploaded to a specific project.
        """
        stmt = select(self.model).filter(self.model.project_id == project_id)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def get_file(self, project_id: uuid.UUID, file_id: uuid.UUID) -> Optional[ProjectFile]:
        """
        Retrieves a single file metadata record verifying it belongs to the given project.
        """
        stmt = select(self.model).filter(
            self.model.project_id == project_id,
            self.model.id == file_id
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()
