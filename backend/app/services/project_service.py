import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import Project
from backend.app.models.user import User
from backend.app.repositories.project_repository import ProjectRepository
from backend.app.schemas.project import ProjectCreate, ProjectUpdate
from backend.app.services.activity_service import ActivityService
from backend.app.utils.exceptions import UnauthorizedException

class ProjectService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating project planning, creation, archiving, and deletion.
        """
        self.repo = ProjectRepository(db)
        self.activity_service = ActivityService(db)
        self.db = db

    def _verify_ownership(self, project: Project, user: User) -> None:
        """
        Guards actions by asserting that the executing user is the owner or an administrator.
        """
        if project.owner_id != user.id and user.role != "admin":
            raise UnauthorizedException("Access Denied: You do not own this project")

    async def create_project(self, project_in: ProjectCreate, user: User) -> Project:
        """
        Saves a new project under the current user's profile and registers a creation log.
        """
        obj_data = project_in.model_dump()
        obj_data["owner_id"] = user.id

        project = await self.repo.create(obj_data)
        
        # Log project creation activity
        await self.activity_service.log_activity(
            project_id=project.id,
            user_id=user.id,
            activity="Project Created",
            metadata_json={"project_name": project.name, "priority": project.priority}
        )

        await self.db.commit()
        await self.db.refresh(project)
        return project

    async def get_project_by_id(self, project_id: uuid.UUID, user: User) -> Optional[Project]:
        """
        Retrieves a project while validating ownership access rules.
        """
        project = await self.repo.get(project_id)
        if not project:
            return None
        self._verify_ownership(project, user)
        return project

    async def update_project(self, project_id: uuid.UUID, project_in: ProjectUpdate, user: User) -> Optional[Project]:
        """
        Updates project metadata and writes an update log.
        """
        project = await self.repo.get(project_id)
        if not project:
            return None
        self._verify_ownership(project, user)

        update_data = project_in.model_dump(exclude_unset=True)
        updated_project = await self.repo.update(project, update_data)

        # Log project update activity
        await self.activity_service.log_activity(
            project_id=project.id,
            user_id=user.id,
            activity="Project Updated",
            metadata_json={"updated_fields": list(update_data.keys())}
        )

        await self.db.commit()
        await self.db.refresh(updated_project)
        return updated_project

    async def archive_project(self, project_id: uuid.UUID, user: User) -> Optional[Project]:
        """
        Sets a project's status to 'Archived'.
        """
        project = await self.repo.get(project_id)
        if not project:
            return None
        self._verify_ownership(project, user)

        updated_project = await self.repo.update(project, {"status": "Archived"})

        # Log archive activity
        await self.activity_service.log_activity(
            project_id=project.id,
            user_id=user.id,
            activity="Project Archived"
        )

        await self.db.commit()
        await self.db.refresh(updated_project)
        return updated_project

    async def restore_project(self, project_id: uuid.UUID, user: User) -> Optional[Project]:
        """
        Restores an archived project back to the 'Draft' state.
        """
        project = await self.repo.get(project_id)
        if not project:
            return None
        self._verify_ownership(project, user)

        updated_project = await self.repo.update(project, {"status": "Draft"})

        # Log restore activity
        await self.activity_service.log_activity(
            project_id=project.id,
            user_id=user.id,
            activity="Project Restored"
        )

        await self.db.commit()
        await self.db.refresh(updated_project)
        return updated_project

    async def delete_project(self, project_id: uuid.UUID, user: User) -> bool:
        """
        Removes a project and cascades delete triggers to all child records.
        """
        project = await self.repo.get(project_id)
        if not project:
            return False
        self._verify_ownership(project, user)

        # Activity log should be created before removal clears DB records
        await self.activity_service.log_activity(
            project_id=project.id,
            user_id=user.id,
            activity="Project Deleted",
            metadata_json={"project_name": project.name}
        )

        await self.repo.delete(project_id)
        await self.db.commit()
        return True

    async def search_and_filter_projects(
        self,
        user: User,
        query: Optional[str] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        technology: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Project]:
        """
        Lists and filters projects owned by the user. Administrators can query all projects.
        """
        owner_id = None if user.role == "admin" else user.id
        return await self.repo.search_projects(
            query=query,
            status=status,
            priority=priority,
            owner_id=owner_id,
            technology=technology,
            skip=skip,
            limit=limit
        )
