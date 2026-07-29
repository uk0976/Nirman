from fastapi import APIRouter
from backend.app.api.v1.auth.auth_router import router as auth_router
from backend.app.api.v1.users.user_router import router as users_router
from backend.app.api.v1.projects.projects_router import router as projects_router
from backend.app.api.v1.agents.agents_router import (
    router as agents_router,
    departments_router,
    skills_router
)
from backend.app.api.v1.workflows.workflows_router import router as workflows_router
from backend.app.api.v1.workflows.tasks_router import router as tasks_router
from backend.app.api.v1.ai.ai_router import router as ai_router
from backend.app.api.v1.warroom.warroom_router import router as warroom_router
from backend.app.api.v1.execution.execution_router import router as execution_router
from backend.app.api.v1.orchestrator_router import router as orchestrator_router
from backend.app.api.v1.github_router import router as github_router
from backend.app.api.v1.sandbox_router import router as sandbox_router
from backend.app.api.v1.pipeline_router import router as pipeline_router
from backend.app.api.v1.qa_security_router import router as qa_security_router
from backend.app.api.v1.deployment_router import router as deployment_router
from backend.app.api.v1.stubs import (
    analytics_router,
)


# Central router registry for v1 API namespace
v1_router = APIRouter()

# Register core authentication and profile routers
v1_router.include_router(auth_router)
v1_router.include_router(users_router)

# Register project, agent, and workflow routers
v1_router.include_router(projects_router)
v1_router.include_router(agents_router)
v1_router.include_router(departments_router)
v1_router.include_router(skills_router)
v1_router.include_router(workflows_router)
v1_router.include_router(tasks_router)
v1_router.include_router(ai_router, prefix="/ai", tags=["AI Platform"])
v1_router.include_router(warroom_router, prefix="/warroom", tags=["AI War Room"])
v1_router.include_router(execution_router, prefix="/execution", tags=["Execution Pipeline"])
v1_router.include_router(orchestrator_router)
v1_router.include_router(github_router)
v1_router.include_router(sandbox_router)
v1_router.include_router(pipeline_router)
v1_router.include_router(qa_security_router)
v1_router.include_router(deployment_router)
v1_router.include_router(analytics_router)
