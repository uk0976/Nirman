import os
import uuid
from typing import List, Optional, Tuple
from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.core.config import settings
from backend.app.models.project import ProjectFile
from backend.app.models.user import User
from backend.app.repositories.file_repository import FileRepository
from backend.app.repositories.project_repository import ProjectRepository
from backend.app.services.activity_service import ActivityService
from backend.app.utils.exceptions import UnauthorizedException

# Allowed file formats in specification parameters
ALLOWED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md", ".png", ".jpg", ".jpeg", ".zip"}

class FileService:
    def __init__(self, db: AsyncSession):
        """
        Service layer coordinating file uploads, downloads, and storage logic.
        """
        self.repo = FileRepository(db)
        self.project_repo = ProjectRepository(db)
        self.activity_service = ActivityService(db)
        self.db = db

    async def _verify_project_ownership(self, project_id: uuid.UUID, user: User) -> None:
        """
        Confirms the user has owner or administrator access rights to the project.
        """
        project = await self.project_repo.get(project_id)
        if not project:
            raise ValueError(f"Project with ID {project_id} not found")
        if project.owner_id != user.id and user.role != "admin":
            raise UnauthorizedException("Access Denied: You do not own this project")

    async def upload_file(
        self,
        project_id: uuid.UUID,
        upload_file: UploadFile,
        user: User
    ) -> ProjectFile:
        """
        Processes multi-part uploads, performs validation, copies stream to disk, and indexes the entry.
        """
        await self._verify_project_ownership(project_id, user)

        filename = upload_file.filename or "unnamed_file"
        ext = os.path.splitext(filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise ValueError(
                f"File format '{ext}' is not supported. Allowed formats: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        # Setup local project-specific storage folder
        project_upload_dir = os.path.join(settings.UPLOAD_DIR, str(project_id))
        os.makedirs(project_upload_dir, exist_ok=True)

        # Prepend UUID to avoid file collisions
        unique_filename = f"{uuid.uuid4()}_{filename}"
        dest_path = os.path.join(project_upload_dir, unique_filename)

        # Write file in chunks to prevent server RAM overflows
        file_size = 0
        try:
            with open(dest_path, "wb") as buffer:
                while content := await upload_file.read(1024 * 1024):  # 1MB chunks
                    buffer.write(content)
                    file_size += len(content)
        except Exception as e:
            if os.path.exists(dest_path):
                os.remove(dest_path)
            raise IOError(f"Failed writing file bytes to storage path: {str(e)}")

        file_data = {
            "project_id": project_id,
            "filename": filename,
            "file_type": upload_file.content_type or "application/octet-stream",
            "file_size": file_size,
            "storage_path": dest_path,
            "uploaded_by": user.id
        }

        project_file = await self.repo.create(file_data)

        # Record upload activity
        await self.activity_service.log_activity(
            project_id=project_id,
            user_id=user.id,
            activity="File Uploaded",
            metadata_json={"filename": filename, "file_size_bytes": file_size}
        )

        await self.db.commit()
        await self.db.refresh(project_file)
        return project_file

    async def list_files(self, project_id: uuid.UUID, user: User) -> List[ProjectFile]:
        """
        Lists all files associated with a project.
        """
        await self._verify_project_ownership(project_id, user)
        return await self.repo.get_by_project(project_id)

    async def get_file_metadata(self, project_id: uuid.UUID, file_id: uuid.UUID, user: User) -> Optional[ProjectFile]:
        """
        Fetches file index entries by project and file ID.
        """
        await self._verify_project_ownership(project_id, user)
        return await self.repo.get_file(project_id, file_id)

    async def get_file_for_download(self, project_id: uuid.UUID, file_id: uuid.UUID, user: User) -> Tuple[str, str]:
        """
        Validates target download files and returns (storage_path, original_filename).
        """
        await self._verify_project_ownership(project_id, user)
        project_file = await self.repo.get_file(project_id, file_id)
        if not project_file:
            raise ValueError("Requested file does not exist")

        if not os.path.exists(project_file.storage_path):
            raise FileNotFoundError("The file could not be found in storage")

        return project_file.storage_path, project_file.filename

    async def delete_file(self, project_id: uuid.UUID, file_id: uuid.UUID, user: User) -> bool:
        """
        Deletes the target file from local storage and deletes its database record.
        """
        await self._verify_project_ownership(project_id, user)
        project_file = await self.repo.get_file(project_id, file_id)
        if not project_file:
            return False

        # Clear file from local disk
        if os.path.exists(project_file.storage_path):
            try:
                os.remove(project_file.storage_path)
            except Exception:
                pass  # Continue to delete DB records if disk fails

        # Log activity before DB deletion clears metadata
        await self.activity_service.log_activity(
            project_id=project_id,
            user_id=user.id,
            activity="File Deleted",
            metadata_json={"filename": project_file.filename}
        )

        await self.repo.delete(file_id)
        await self.db.commit()
        return True
