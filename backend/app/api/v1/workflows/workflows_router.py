import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.workflow import (
    WorkflowResponse,
    WorkflowCreate,
    WorkflowUpdate,
    ExecutionResponse,
    WorkflowProgressResponse
)
from backend.app.services.workflow_service import WorkflowService
from backend.app.services.timeline_service import TimelineService

router = APIRouter(prefix="/workflows", tags=["Workflow Engine - Workflows"])

@router.post(
    "/",
    response_model=WorkflowResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new workflow",
    description="Registers a new workflow sequence for a project and populates its 11 SDLC stages."
)
async def create_workflow(
    wf_in: WorkflowCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.create_workflow(wf_in.project_id, wf_in.name)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=List[WorkflowResponse],
    summary="List all workflows",
    description="Returns a paginated list of all workflows."
)
async def list_workflows(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    return await service.list_workflows(skip, limit)


@router.get(
    "/{workflow_id}",
    response_model=WorkflowResponse,
    summary="Get workflow details by ID",
    description="Retrieves active workflow configurations, pipeline stages, and task assignments."
)
async def get_workflow(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    workflow = await service.get_workflow(workflow_id)
    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow not found"
        )
    return workflow


@router.patch(
    "/{workflow_id}",
    response_model=WorkflowResponse,
    summary="Update workflow settings",
    description="Updates metadata for an active workflow."
)
async def update_workflow(
    workflow_id: uuid.UUID,
    wf_in: WorkflowUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        workflow = await service.update_workflow(workflow_id, name=wf_in.name)
        if not workflow:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow not found"
            )
        return workflow
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/{workflow_id}/start",
    response_model=WorkflowResponse,
    summary="Start workflow execution",
    description="Transitions workflow status from Draft to Running and kicks off stage 1."
)
async def start_workflow(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.start_workflow(workflow_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/{workflow_id}/pause",
    response_model=WorkflowResponse,
    summary="Pause workflow execution",
    description="Suspends pipeline progression temporarily."
)
async def pause_workflow(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.pause_workflow(workflow_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/{workflow_id}/resume",
    response_model=WorkflowResponse,
    summary="Resume workflow execution",
    description="Restarts a paused workflow sequence."
)
async def resume_workflow(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.resume_workflow(workflow_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/{workflow_id}/cancel",
    response_model=WorkflowResponse,
    summary="Cancel workflow execution",
    description="Aborts the workflow and marks it as Cancelled (read-only)."
)
async def cancel_workflow(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.cancel_workflow(workflow_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/{workflow_id}/timeline",
    response_model=List[ExecutionResponse],
    summary="Get workflow timeline history",
    description="Retrieves a chronological list of recorded workflow executions and status triggers."
)
async def get_workflow_timeline(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TimelineService(db)
    return await service.get_timeline(workflow_id)


@router.get(
    "/{workflow_id}/progress",
    response_model=WorkflowProgressResponse,
    summary="Get workflow completion progress metrics",
    description="Returns completion percentages, task counts, and estimated completion dates."
)
async def get_workflow_progress(
    workflow_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = WorkflowService(db)
    try:
        return await service.get_progress(workflow_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
