import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.workflow import (
    TaskResponse,
    TaskCreate,
    TaskUpdate,
    TaskUpdateStatus
)
from backend.app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Workflow Engine - Tasks"])

@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new workflow task",
    description="Registers a new task card inside a pipeline stage. Validates stage status, dependencies, and assigns the agent."
)
async def create_task(
    task_in: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TaskService(db)
    try:
        return await service.create_task(
            workflow_stage_id=task_in.workflow_stage_id,
            title=task_in.title,
            description=task_in.description,
            assigned_agent_id=task_in.assigned_agent_id,
            priority=task_in.priority,
            depends_on=task_in.depends_on
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=List[TaskResponse],
    summary="List all tasks",
    description="Returns a paginated list of all tasks."
)
async def list_tasks(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TaskService(db)
    return await service.list_tasks(skip, limit)


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Get task details by ID",
    description="Retrieves a specific task's title, description, assigned agent, and dependency parameters."
)
async def get_task(
    task_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TaskService(db)
    task = await service.get_task(task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workflow task not found"
        )
    return task


@router.patch(
    "/{task_id}",
    response_model=TaskResponse,
    summary="Update task parameters",
    description="Modifies a task's title, description, priority, depends_on, or assigned agent."
)
async def update_task(
    task_id: uuid.UUID,
    task_in: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TaskService(db)
    try:
        task = await service.update_task(
            task_id=task_id,
            title=task_in.title,
            description=task_in.description,
            assigned_agent_id=task_in.assigned_agent_id,
            priority=task_in.priority,
            depends_on=task_in.depends_on
        )
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow task not found"
            )
        return task
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.patch(
    "/{task_id}/status",
    response_model=TaskResponse,
    summary="Transition task status",
    description="Transitions status (Ready -> Working -> Completed). Auto-triggers stage progression and resolves downstream blockers."
)
async def update_task_status(
    task_id: uuid.UUID,
    status_in: TaskUpdateStatus,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = TaskService(db)
    try:
        task = await service.update_task_status(task_id, status_in.status)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Workflow task not found"
            )
        return task
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
