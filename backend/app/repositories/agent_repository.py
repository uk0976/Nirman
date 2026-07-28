import uuid
from typing import List, Optional
from sqlalchemy import and_, or_, String, select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.agent import Agent
from backend.app.repositories.base import BaseRepository

class AgentRepository(BaseRepository[Agent]):
    def __init__(self, db: AsyncSession):
        """
        Agent repository for database operations on the Agent model.
        """
        super().__init__(Agent, db)

    async def search_and_filter_agents(
        self,
        query: Optional[str] = None,
        status: Optional[str] = None,
        availability: Optional[bool] = None,
        department: Optional[str] = None,
        project_id: Optional[uuid.UUID] = None,
        skill: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Agent]:
        """
        Search and filter agents based on search query or specific status, department, project, and skills filters.
        """
        stmt = select(self.model)
        filters = []

        if query:
            filters.append(or_(
                self.model.name.ilike(f"%{query}%"),
                self.model.display_name.ilike(f"%{query}%"),
                self.model.role.ilike(f"%{query}%"),
                self.model.department.ilike(f"%{query}%"),
                self.model.skills.cast(String).ilike(f'%"{query}"%')
            ))

        if status:
            filters.append(self.model.status == status)

        if availability is not None:
            filters.append(self.model.availability == availability)

        if department:
            filters.append(self.model.department == department)

        if project_id:
            filters.append(self.model.current_project_id == project_id)

        if skill:
            filters.append(self.model.skills.cast(String).ilike(f'%"{skill}"%'))

        if filters:
            stmt = stmt.filter(and_(*filters))

        stmt = stmt.order_by(self.model.name.asc()).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
