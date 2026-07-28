import uuid
from typing import List, Optional
from sqlalchemy import and_, or_, String, select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import Project
from backend.app.repositories.base import BaseRepository

class ProjectRepository(BaseRepository[Project]):
    def __init__(self, db: AsyncSession):
        """
        Project repository for database operations on the Project model.
        """
        super().__init__(Project, db)

    async def get_by_owner(self, owner_id: uuid.UUID, skip: int = 0, limit: int = 100) -> List[Project]:
        """
        Fetch all projects owned by a specific user.
        """
        stmt = select(self.model).filter(self.model.owner_id == owner_id).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def search_projects(
        self,
        query: Optional[str] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        owner_id: Optional[uuid.UUID] = None,
        technology: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Project]:
        """
        Search and filter projects based on text query, status, priority, owner, or tech stack.
        Uses cross-compatible cast filtering to run on both SQLite and Postgres.
        """
        stmt = select(self.model)
        filters = []

        if query:
            filters.append(or_(
                self.model.name.ilike(f"%{query}%"),
                self.model.description.ilike(f"%{query}%")
            ))

        if status:
            filters.append(self.model.status == status)

        if priority:
            filters.append(self.model.priority == priority)

        if owner_id:
            filters.append(self.model.owner_id == owner_id)

        if technology:
            # Cast JSON technology stack to String to search elements on SQLite and Postgres
            filters.append(self.model.technology_stack.cast(String).ilike(f'%"{technology}"%'))

        if filters:
            stmt = stmt.filter(and_(*filters))

        stmt = stmt.order_by(self.model.created_at.desc()).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
