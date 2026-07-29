import logging
from typing import List, Optional, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.app.services.deployment_engine import deployment_engine, DeploymentStatus

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/deployments", tags=["Deployment Engine"])

class TriggerDeploymentRequest(BaseModel):
    project_id: str
    provider: str = "docker"
    env_vars: Optional[Dict[str, str]] = None

class RollbackDeploymentRequest(BaseModel):
    project_id: str
    target_deployment_id: str

@router.post("/trigger", response_model=DeploymentStatus)
async def trigger_deployment(req: TriggerDeploymentRequest):
    """
    Triggers an automated multi-cloud deployment across Docker, Vercel, Render, Railway, AWS, Azure, or GCP.
    Compiles assets, provisions infrastructure, generates production deployment URLs, and probes health.
    """
    return await deployment_engine.trigger_deployment(req.project_id, req.provider, req.env_vars)

@router.post("/rollback", response_model=DeploymentStatus)
async def rollback_deployment(req: RollbackDeploymentRequest):
    dep = await deployment_engine.rollback_deployment(req.project_id, req.target_deployment_id)
    if not dep:
        raise HTTPException(status_code=404, detail="Target deployment not found for rollback")
    return dep

@router.get("/project/{project_id}", response_model=List[DeploymentStatus])
async def get_project_deployment_history(project_id: str):
    return deployment_engine.get_deployment_history(project_id)

@router.get("/status/{deployment_id}", response_model=DeploymentStatus)
async def get_deployment_status(deployment_id: str):
    dep = deployment_engine.get_deployment_status(deployment_id)
    if not dep:
        raise HTTPException(status_code=404, detail="Deployment not found")
    return dep
