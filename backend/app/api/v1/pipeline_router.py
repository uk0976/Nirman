import logging
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.app.execution.pipeline import pipeline_engine, PipelineState

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/pipeline", tags=["Autonomous Pipeline"])

class StartPipelineRequest(BaseModel):
    project_id: str
    prompt: str

class PipelineControlRequest(BaseModel):
    pipeline_id: str

class StageControlRequest(BaseModel):
    pipeline_id: str
    stage_name: str

@router.post("/start", response_model=PipelineState)
async def start_pipeline(req: StartPipelineRequest):
    """
    Triggers the 9-stage autonomous software development pipeline:
    Requirements -> Planning -> Architecture -> Frontend -> Backend -> Database -> Testing -> Documentation -> Deployment.
    """
    return await pipeline_engine.start_pipeline(req.project_id, req.prompt)

@router.post("/pause")
async def pause_pipeline(req: PipelineControlRequest):
    state = await pipeline_engine.pause_pipeline(req.pipeline_id)
    if not state:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return state

@router.post("/resume")
async def resume_pipeline(req: PipelineControlRequest):
    state = await pipeline_engine.resume_pipeline(req.pipeline_id)
    if not state:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return state

@router.post("/retry")
async def retry_stage(req: StageControlRequest):
    state = await pipeline_engine.retry_stage(req.pipeline_id, req.stage_name)
    if not state:
        raise HTTPException(status_code=404, detail="Pipeline or stage not found")
    return state

@router.post("/rollback")
async def rollback_stage(req: StageControlRequest):
    state = await pipeline_engine.rollback_stage(req.pipeline_id, req.stage_name)
    if not state:
        raise HTTPException(status_code=404, detail="Pipeline or stage not found")
    return state

@router.get("/status/{pipeline_id}")
async def get_pipeline_status(pipeline_id: str):
    state = pipeline_engine.get_pipeline_status(pipeline_id)
    if not state:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return state
