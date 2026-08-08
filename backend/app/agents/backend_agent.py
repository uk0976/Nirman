from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

BACKEND_SYSTEM_PROMPT = """You are Ethan Vance, Senior Principal Backend Engineer at Nirman.
Your persona is a Senior Principal Backend Engineer building high-concurrency SaaS applications with Python 3.11+, FastAPI, Pydantic v2, Async SQLAlchemy 2.0, PostgreSQL 16, Redis, Celery, and Pytest.

Rules:
1. You enforce Clean Architecture boundaries (Domain, Application, Infrastructure, Presentation) with strict multi-tenant isolation and tenant-scoped repository queries.
2. You design versioned REST APIs (/api/v1/...), automatic OpenAPI documentation, rate limiting (Slowapi), Pydantic v2 request/response validation, and Pytest integration test suites.
3. You produce scalable, asynchronous, production-ready backend code without relying on fake APIs or hardcoded mock placeholders.
"""

class BackendAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-be-ethan",
            name="Ethan Vance",
            role="Senior Principal Backend Engineer",
            description="Implements FastAPI REST APIs, 4-layer Clean Architecture, Async SQLAlchemy repositories, Redis session cache, Celery worker queues, and Pytest integration test pipelines.",
            system_prompt=BACKEND_SYSTEM_PROMPT,
            capabilities=[AgentCapability.BACKEND_ENGINEERING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "BACKEND_PLANNING_COMPLETE",
            "framework": "FastAPI (Python 3.11+)",
            "orm": "Async SQLAlchemy 2.0 + Alembic",
            "cache_broker": "Redis 7 + Celery Workers"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        async_repo_code = """# ========================================================
# NIRMAN AI PLATFORM — ASYNC SQLALCHEMY 2.0 REPOSITORY
# ========================================================

from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.project import ProjectModel
from app.schemas.project import ProjectCreateDTO, ProjectUpdateDTO

class AsyncProjectRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, project_id: UUID, org_id: UUID) -> Optional[ProjectModel]:
        query = select(ProjectModel).where(
            ProjectModel.id == project_id,
            ProjectModel.organization_id == org_id
        )
        result = await self.session.execute(query)
        return result.scalars().first()

    async def create(self, org_id: UUID, dto: ProjectCreateDTO) -> ProjectModel:
        project = ProjectModel(
            organization_id=org_id,
            name=dto.name,
            slug=dto.slug,
            description=dto.description
        )
        self.session.add(project)
        await self.session.commit()
        await self.session.refresh(project)
        return project

    async def list_by_org(self, org_id: UUID, limit: int = 50, offset: int = 0) -> List[ProjectModel]:
        query = (
            select(ProjectModel)
            .where(ProjectModel.organization_id == org_id)
            .limit(limit)
            .offset(offset)
        )
        result = await self.session.execute(query)
        return result.scalars().all()
"""

        backend_package = {
            "project_name": project_name,
            "bad_version": "v1.0",
            "executive_summary": "Production Backend Architecture Document (BAD v1.0) synthesized from Frontend Architecture #FAD-001. Powered by FastAPI & Async SQLAlchemy 2.0.",
            "async_repo_code": async_repo_code,
            "route_registry": [
                {"method": "GET", "path": "/api/v1/health", "dto": "HealthCheckDTO", "rate_limit": "60/min"},
                {"method": "POST", "path": "/api/v1/auth/login", "dto": "LoginRequestDTO", "rate_limit": "5/min"},
                {"method": "GET", "path": "/api/v1/projects", "dto": "ListProjectsDTO", "rate_limit": "120/min"},
                {"method": "POST", "path": "/api/v1/projects", "dto": "ProjectCreateDTO", "rate_limit": "30/min"},
                {"method": "POST", "path": "/api/v1/ceo/discovery", "dto": "DiscoveryWorkshopDTO", "rate_limit": "20/min"},
                {"method": "POST", "path": "/api/v1/ba/requirements", "dto": "RequirementsRequestDTO", "rate_limit": "20/min"}
            ],
            "pytest_specs": {
                "unit_tests": "Pytest for Pydantic validators, JWT issuance, and Argon2id password hashing",
                "repository_tests": "Async SQLAlchemy integration tests running against PostgreSQL test database",
                "api_security_tests": "HTTPX test client verifying RBAC tenant isolation and expired JWT tokens"
            },
            "definition_of_done": [
                "1. 100% Pytest test suite pass rate across unit and integration tests",
                "2. Automatic OpenAPI schema generated at /docs without missing DTO models",
                "3. All database queries scoped to current tenant (organization_id)",
                "4. Redis rate limiters active on public and authentication endpoints"
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return backend_package

backend_agent_instance = BackendAgent()
