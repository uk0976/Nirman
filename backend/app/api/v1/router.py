from fastapi import APIRouter
from app.api.v1 import health, projects, agents, warroom, workflows, artifacts, auth, ceo, ba, pm, architect, system_architect, db_architect, ux_designer, frontend_agent, backend_agent, qa, security, devops

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(agents.router, prefix="/agents", tags=["Agents"])
api_router.include_router(ceo.router, prefix="/ceo", tags=["CEO Agent"])
api_router.include_router(ba.router, prefix="/ba", tags=["Business Analyst Agent"])
api_router.include_router(pm.router, prefix="/pm", tags=["Product Manager Agent"])
api_router.include_router(architect.router, prefix="/architect", tags=["Solution Architect Agent"])
api_router.include_router(system_architect.router, prefix="/system-architect", tags=["System Architect Agent"])
api_router.include_router(db_architect.router, prefix="/db-architect", tags=["Database Architect Agent"])
api_router.include_router(ux_designer.router, prefix="/ux-designer", tags=["UI/UX Designer Agent"])
api_router.include_router(frontend_agent.router, prefix="/frontend-agent", tags=["Frontend Engineer Agent"])
api_router.include_router(backend_agent.router, prefix="/backend-agent", tags=["Backend Engineer Agent"])
api_router.include_router(qa.router, prefix="/qa", tags=["QA Engineer Agent"])
api_router.include_router(security.router, prefix="/security-agent", tags=["Security Engineer Agent"])
api_router.include_router(devops.router, prefix="/devops", tags=["DevOps Engineer Agent"])
api_router.include_router(warroom.router, prefix="/warroom", tags=["War Room"])
api_router.include_router(workflows.router, prefix="/workflows", tags=["Workflows"])
api_router.include_router(artifacts.router, prefix="/artifacts", tags=["Artifacts"])
