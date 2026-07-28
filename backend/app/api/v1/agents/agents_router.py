import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.agent import (
    AgentResponse,
    AgentUpdateStatus,
    AgentUpdateAvailability,
    DepartmentResponse,
    SkillResponse,
    AgentStatusSummaryResponse
)
from backend.app.services.agent_service import AgentService

# Create router instances
router = APIRouter(prefix="/agents", tags=["AI Company - Agents"])
departments_router = APIRouter(prefix="/departments", tags=["AI Company - Metadata"])
skills_router = APIRouter(prefix="/skills", tags=["AI Company - Metadata"])

# =====================================================================
# CORE AGENT ENDPOINTS
# =====================================================================

@router.get(
    "/status",
    response_model=AgentStatusSummaryResponse,
    summary="Get agents health and activity summary",
    description="Returns aggregate counts of online, busy, and offline agents, including status distribution."
)
async def get_agent_status_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    return await service.get_status_summary()


@router.get(
    "/",
    response_model=List[AgentResponse],
    summary="Search and filter AI employees",
    description="Lists agents. Supports query searches (by name, role, skills) and filters (by status, department, project)."
)
async def list_agents(
    query: Optional[str] = None,
    status: Optional[str] = None,
    availability: Optional[bool] = None,
    department: Optional[str] = None,
    project_id: Optional[uuid.UUID] = None,
    skill: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    return await service.search_and_filter_agents(
        query=query,
        status=status,
        availability=availability,
        department=department,
        project_id=project_id,
        skill=skill,
        skip=skip,
        limit=limit
    )


@router.get(
    "/{agent_id}",
    response_model=AgentResponse,
    summary="Get AI employee details by ID",
    description="Retrieves profile parameters, capabilities, and workload for a specific AI agent."
)
async def get_agent(
    agent_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    agent = await service.get_agent_by_id(agent_id)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AI employee profile not found"
        )
    return agent


@router.patch(
    "/{agent_id}/status",
    response_model=AgentResponse,
    summary="Update AI employee active status",
    description="Partially updates an agent's status (Idle, Working, Coding, Offline) and updates workload metrics."
)
async def update_agent_status(
    agent_id: uuid.UUID,
    status_in: AgentUpdateStatus,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    agent = await service.update_agent_status(agent_id, status_in)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AI employee profile not found"
        )
    return agent


@router.patch(
    "/{agent_id}/availability",
    response_model=AgentResponse,
    summary="Update AI employee availability",
    description="Partially updates an agent's availability flag."
)
async def update_agent_availability(
    agent_id: uuid.UUID,
    availability_in: AgentUpdateAvailability,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    agent = await service.update_agent_availability(agent_id, availability_in)
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AI employee profile not found"
        )
    return agent


# =====================================================================
# METADATA ENDPOINTS
# =====================================================================

@departments_router.get(
    "/",
    response_model=List[DepartmentResponse],
    summary="List all Agent Departments",
    description="Retrieves a list of all seeding departments."
)
async def list_departments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    return await service.get_departments()


@skills_router.get(
    "/",
    response_model=List[SkillResponse],
    summary="List all Agent Skills",
    description="Retrieves a list of all cataloged skill assets."
)
async def list_skills(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AgentService(db)
    return await service.get_skills()
