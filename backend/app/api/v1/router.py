from fastapi import APIRouter
from backend.app.api.v1.auth.auth_router import router as auth_router
from backend.app.api.v1.users.user_router import router as users_router
from backend.app.api.v1.projects.projects_router import router as projects_router
from backend.app.api.v1.agents.agents_router import (
    router as agents_router,
    departments_router,
    skills_router
)
from backend.app.api.v1.stubs import (
    tasks_router,
    workflows_router,
    warroom_router,
    analytics_router,
    deployments_router
)


# Central router registry for v1 API namespace
v1_router = APIRouter()

# Register core authentication and profile routers
v1_router.include_router(auth_router)
v1_router.include_router(users_router)

# Register project and agent routers
v1_router.include_router(projects_router)
v1_router.include_router(agents_router)
v1_router.include_router(departments_router)
v1_router.include_router(skills_router)
v1_router.include_router(tasks_router)
v1_router.include_router(workflows_router)
v1_router.include_router(warroom_router)
v1_router.include_router(analytics_router)
v1_router.include_router(deployments_router)
