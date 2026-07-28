import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectSummaryResponse,
    RequirementCreate,
    RequirementUpdate,
    RequirementResponse,
    FileResponse as SchemaFileResponse,
    ActivityResponse
)
from backend.app.services.project_service import ProjectService
from backend.app.services.requirement_service import RequirementService
from backend.app.services.file_service import FileService
from backend.app.services.activity_service import ActivityService
from backend.app.utils.exceptions import NirmanException


router = APIRouter(prefix="/projects", tags=["Project Management"])

# =====================================================================
# PROJECT CORE ENDPOINTS
# =====================================================================

@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new project",
    description="Registers a new project associated with the authenticated user."
)
async def create_project(
    project_in: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    return await service.create_project(project_in, current_user)


@router.get(
    "/",
    response_model=List[ProjectSummaryResponse],
    summary="List and search projects",
    description="Fetches a list of projects. Supports filtering by status, priority, and tech stacks."
)
async def list_projects(
    query: Optional[str] = None,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    technology: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    return await service.search_and_filter_projects(
        user=current_user,
        query=query,
        status=status,
        priority=priority,
        technology=technology,
        skip=skip,
        limit=limit
    )


@router.get(
    "/{project_id}",
    response_model=ProjectResponse,
    summary="Get project details by UUID",
    description="Retrieves the detailed specifications of a project. Owner-access restricted."
)
async def get_project(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    project = await service.get_project_by_id(project_id, current_user)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


@router.put(
    "/{project_id}",
    response_model=ProjectResponse,
    summary="Update project details",
    description="Modifies project settings (phase, status, progress, tech stack). Owner-access restricted."
)
async def update_project(
    project_id: uuid.UUID,
    project_in: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    project = await service.update_project(project_id, project_in, current_user)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project",
    description="Permanently deletes a project and all associated files. Owner-access restricted."
)
async def delete_project(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    success = await service.delete_project(project_id, current_user)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return


@router.post(
    "/{project_id}/archive",
    response_model=ProjectResponse,
    summary="Archive a project",
    description="Sets project status to 'Archived'. Owner-access restricted."
)
async def archive_project(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    project = await service.archive_project(project_id, current_user)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


@router.post(
    "/{project_id}/restore",
    response_model=ProjectResponse,
    summary="Restore an archived project",
    description="Restores archived project back to 'Draft' status. Owner-access restricted."
)
async def restore_project(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = ProjectService(db)
    project = await service.restore_project(project_id, current_user)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    return project


# =====================================================================
# PROJECT REQUIREMENTS ENDPOINTS
# =====================================================================

@router.post(
    "/{project_id}/requirements",
    response_model=RequirementResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a project requirement",
    description="Registers a new functional spec or user story for the project."
)
async def add_requirement(
    project_id: uuid.UUID,
    req_in: RequirementCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = RequirementService(db)
    try:
        return await service.add_requirement(project_id, req_in, current_user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/{project_id}/requirements",
    response_model=List[RequirementResponse],
    summary="List all requirements for a project",
    description="Fetches a list of specifications defined for the project."
)
async def list_requirements(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = RequirementService(db)
    try:
        return await service.list_requirements(project_id, current_user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.put(
    "/{project_id}/requirements/{requirement_id}",
    response_model=RequirementResponse,
    summary="Update a project requirement",
    description="Modifies a requirement specification. Owner-access restricted."
)
async def update_requirement(
    project_id: uuid.UUID,
    requirement_id: uuid.UUID,
    req_in: RequirementUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = RequirementService(db)
    try:
        updated = await service.update_requirement(project_id, requirement_id, req_in, current_user)
        if not updated:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Requirement not found"
            )
        return updated
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.delete(
    "/{project_id}/requirements/{requirement_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project requirement",
    description="Deletes a requirement specification from the project. Owner-access restricted."
)
async def delete_requirement(
    project_id: uuid.UUID,
    requirement_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = RequirementService(db)
    try:
        success = await service.delete_requirement(project_id, requirement_id, current_user)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Requirement not found"
            )
        return
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


# =====================================================================
# PROJECT FILE ENDPOINTS
# =====================================================================

@router.post(
    "/{project_id}/files",
    response_model=SchemaFileResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a project file",
    description="Uploads specification files (PDF, DOCX, ZIP, PNG, etc.) to project local storage."
)
async def upload_file(
    project_id: uuid.UUID,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = FileService(db)
    try:
        return await service.upload_file(project_id, file, current_user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except NirmanException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Upload processing failure: {str(e)}"
        )


@router.get(
    "/{project_id}/files",
    response_model=List[SchemaFileResponse],
    summary="List all project files",
    description="Fetches metadata listings of all files uploaded to the project."
)
async def list_files(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = FileService(db)
    try:
        return await service.list_files(project_id, current_user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.get(
    "/{project_id}/files/{file_id}",
    summary="Download a project file",
    description="Downloads the physical file content from local disk storage. Owner-access restricted."
)
async def download_file(
    project_id: uuid.UUID,
    file_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = FileService(db)
    try:
        result = await service.get_file_for_download(project_id, file_id, current_user)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File metadata not found"
            )
        
        storage_path, filename = result
        return FileResponse(
            path=storage_path,
            filename=filename,
            media_type="application/octet-stream"
        )
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


@router.delete(
    "/{project_id}/files/{file_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a project file",
    description="Clears file from local storage and deletes metadata index. Owner-access restricted."
)
async def delete_file(
    project_id: uuid.UUID,
    file_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = FileService(db)
    try:
        success = await service.delete_file(project_id, file_id, current_user)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
        return
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )


# =====================================================================
# PROJECT ACTIVITY ENDPOINTS
# =====================================================================

@router.get(
    "/{project_id}/activity",
    response_model=List[ActivityResponse],
    summary="Get project activity logs",
    description="Fetches chronological audit trails of project modifications. Owner-access restricted."
)
async def get_project_activity(
    project_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify owner access by pulling project instance
    proj_service = ProjectService(db)
    project = await proj_service.get_project_by_id(project_id, current_user)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
        
    act_service = ActivityService(db)
    return await act_service.get_project_activities(project_id)
