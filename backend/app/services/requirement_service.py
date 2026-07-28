import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.models.project import ProjectRequirement
from backend.app.models.user import User
from backend.app.repositories.requirement_repository import RequirementRepository
from backend.app.repositories.project_repository import ProjectRepository
from backend.app.schemas.project import RequirementCreate, RequirementUpdate
from backend.app.services.activity_service import ActivityService
from backend.app.utils.exceptions import UnauthorizedException

class RequirementService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating requirements creation, listings, editing, and deletion.
        """
        self.repo = RequirementRepository(db)
        self.project_repo = ProjectRepository(db)
        self.activity_service = ActivityService(db)
        self.db = db

    async def _verify_project_ownership(self, project_id: uuid.UUID, user: User) -> None:
        """
        Confirms the user has owner or administrator access rights to modify the project's requirements.
        """
        project = await self.project_repo.get(project_id)
        if not project:
            raise ValueError(f"Project with ID {project_id} not found")
        if project.owner_id != user.id and user.role != "admin":
            raise UnauthorizedException("Access Denied: You do not own this project")

    async def add_requirement(
        self,
        project_id: uuid.UUID,
        req_in: RequirementCreate,
        user: User
    ) -> ProjectRequirement:
        """
        Creates a new specification item and logs a 'Requirement Added' event.
        """
        await self._verify_project_ownership(project_id, user)

        req_data = req_in.model_dump()
        req_data["project_id"] = project_id

        requirement = await self.repo.create(req_data)

        # Log requirement addition
        await self.activity_service.log_activity(
            project_id=project_id,
            user_id=user.id,
            activity="Requirement Added",
            metadata_json={"requirement_title": requirement.title, "type": requirement.type}
        )

        await self.db.commit()
        await self.db.refresh(requirement)
        return requirement

    async def list_requirements(self, project_id: uuid.UUID, user: User) -> List[ProjectRequirement]:
        """
        Lists all requirements defined for a project.
        """
        await self._verify_project_ownership(project_id, user)
        return await self.repo.get_by_project(project_id)

    async def get_requirement_by_id(
        self,
        project_id: uuid.UUID,
        requirement_id: uuid.UUID,
        user: User
    ) -> Optional[ProjectRequirement]:
        """
        Fetches a specific requirement from a project.
        """
        await self._verify_project_ownership(project_id, user)
        return await self.repo.get_requirement(project_id, requirement_id)

    async def update_requirement(
        self,
        project_id: uuid.UUID,
        requirement_id: uuid.UUID,
        req_in: RequirementUpdate,
        user: User
    ) -> Optional[ProjectRequirement]:
        """
        Edits a requirement specification and writes an update log.
        """
        await self._verify_project_ownership(project_id, user)
        requirement = await self.repo.get_requirement(project_id, requirement_id)
        if not requirement:
            return None

        update_data = req_in.model_dump(exclude_unset=True)
        updated_requirement = await self.repo.update(requirement, update_data)

        # Log requirement updates
        await self.activity_service.log_activity(
            project_id=project_id,
            user_id=user.id,
            activity="Requirement Updated",
            metadata_json={"requirement_id": str(requirement_id), "updated_fields": list(update_data.keys())}
        )

        await self.db.commit()
        await self.db.refresh(updated_requirement)
        return updated_requirement

    async def delete_requirement(
        self,
        project_id: uuid.UUID,
        requirement_id: uuid.UUID,
        user: User
    ) -> bool:
        """
        Removes a requirement specification.
        """
        await self._verify_project_ownership(project_id, user)
        requirement = await self.repo.get_requirement(project_id, requirement_id)
        if not requirement:
            return False

        # Log activity before record deletion
        await self.activity_service.log_activity(
            project_id=project_id,
            user_id=user.id,
            activity="Requirement Deleted",
            metadata_json={"requirement_title": requirement.title}
        )

        await self.repo.delete(requirement_id)
        await self.db.commit()
        return True
