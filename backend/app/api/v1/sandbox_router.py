import logging
from typing import List, Optional, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.execution.sandbox.sandbox import sandbox, SandboxResult

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/sandbox", tags=["Nirman Sandbox"])

class CreateWorkspaceRequest(BaseModel):
    session_id: Optional[str] = None

class RunCommandRequest(BaseModel):
    session_id: str
    command: str
    timeout_sec: int = 30
    memory_limit_mb: float = 512.0

class WriteFileRequest(BaseModel):
    session_id: str
    file_path: str
    content: str

@router.post("/workspace/create")
async def create_workspace(req: CreateWorkspaceRequest):
    sid = sandbox.create_workspace(req.session_id)
    return {"status": "created", "session_id": sid}

@router.delete("/workspace/{session_id}")
async def cleanup_workspace(session_id: str):
    success = sandbox.cleanup_workspace(session_id)
    return {"status": "cleaned", "session_id": session_id, "success": success}

@router.post("/write")
async def write_sandbox_file(req: WriteFileRequest):
    path = sandbox.write_file(req.session_id, req.file_path, req.content)
    return {"status": "written", "session_id": req.session_id, "file_path": req.file_path}

@router.post("/run", response_model=SandboxResult)
async def run_sandbox_command(req: RunCommandRequest):
    """
    Executes code or CLI commands safely inside the Nirman Sandbox environment.
    Captures stdout, stderr, execution time, logs, exit code, and artifacts.
    """
    res = await sandbox.run_command(
        session_id=req.session_id,
        command=req.command,
        timeout_sec=req.timeout_sec,
        memory_limit_mb=req.memory_limit_mb,
    )
    return res
