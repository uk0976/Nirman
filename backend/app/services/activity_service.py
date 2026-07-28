import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import ProjectActivity
from backend.app.repositories.activity_repository import ActivityRepository

class ActivityService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating system audit logs for projects.
        """
        self.repo = ActivityRepository(db)
        self.db = db

    async def log_activity(
        self,
        project_id: uuid.UUID,
        user_id: uuid.UUID,
        activity: str,
        metadata_json: Optional[dict] = None
    ) -> ProjectActivity:
        """
        Records a new project activity event.
        Flushes to session so it is captured in the active parent transaction scope.
        """
        obj_in = {
            "project_id": project_id,
            "user_id": user_id,
            "activity": activity,
            "metadata_json": metadata_json or {}
        }
        activity_obj = await self.repo.create(obj_in)
        # Flush to DB to populate timestamps, commit is handled by parent service call
        await self.db.flush()
        return activity_obj

    async def get_project_activities(self, project_id: uuid.UUID) -> List[ProjectActivity]:
        """
        Retrieves all activity events tracked for a specific project.
        """
        return await self.repo.get_by_project(project_id)
