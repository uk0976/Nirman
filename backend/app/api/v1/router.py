from fastapi import APIRouter
from app.api.v1 import health, projects, agents, warroom, workflows, artifacts, auth

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health Check"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(agents.router, prefix="/agents", tags=["AI Agents Ecosystem"])
api_router.include_router(warroom.router, prefix="/warroom", tags=["AI War Room Stream"])
api_router.include_router(workflows.router, prefix="/workflows", tags=["SDLC Workflow Engine"])
api_router.include_router(artifacts.router, prefix="/artifacts", tags=["Artifact Management"])
