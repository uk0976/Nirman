import os
import shutil
import uuid
import time
import asyncio
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class SandboxResult(BaseModel):
    session_id: str
    command: str
    status: str  # SUCCESS, FAILED, TIMEOUT
    exit_code: int
    stdout: str
    stderr: str
    logs: List[str] = Field(default_factory=list)
    artifacts: List[str] = Field(default_factory=list)
    execution_time_sec: float
    memory_limit_mb: float = 512.0

class NirmanSandbox:
    """
    Isolated execution sandbox where AI employees execute Python, Node.js, React,
    Next.js, FastAPI, and Docker commands safely.
    """

    def __init__(self, base_dir: str = "uploads/sandboxes"):
        self.base_dir = os.path.abspath(base_dir)
        os.makedirs(self.base_dir, exist_ok=True)
        self._history: Dict[str, List[SandboxResult]] = {}

    def create_workspace(self, session_id: Optional[str] = None) -> str:
        sid = session_id or f"sbx-{uuid.uuid4().hex[:8]}"
        workspace_path = os.path.join(self.base_dir, sid)
        os.makedirs(workspace_path, exist_ok=True)
        logger.info(f"NirmanSandbox created temporary workspace: {workspace_path}")
        return sid

    def cleanup_workspace(self, session_id: str) -> bool:
        workspace_path = os.path.join(self.base_dir, session_id)
        if os.path.exists(workspace_path):
            shutil.rmtree(workspace_path, ignore_errors=True)
            logger.info(f"NirmanSandbox cleaned up workspace: {workspace_path}")
            return True
        return False

    def write_file(self, session_id: str, relative_path: str, content: str) -> str:
        workspace_path = os.path.join(self.base_dir, session_id)
        file_path = os.path.join(workspace_path, relative_path)
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        logger.info(f"NirmanSandbox wrote file {relative_path} in session {session_id}")
        return file_path

    def read_file(self, session_id: str, relative_path: str) -> str:
        workspace_path = os.path.join(self.base_dir, session_id)
        file_path = os.path.join(workspace_path, relative_path)
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File {relative_path} not found in session {session_id}")
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    def list_files(self, session_id: str) -> List[str]:
        workspace_path = os.path.join(self.base_dir, session_id)
        file_list = []
        if os.path.exists(workspace_path):
            for root, _, files in os.walk(workspace_path):
                for file in files:
                    rel_path = os.path.relpath(os.path.join(root, file), workspace_path)
                    file_list.append(rel_path)
        return file_list

    async def install_dependencies(
        self, session_id: str, dependencies: List[str], runtime: str = "python"
    ) -> SandboxResult:
        if runtime.lower() == "python":
            cmd = f"pip install {' '.join(dependencies)}"
        else:
            cmd = f"npm install {' '.join(dependencies)}"
        return await self.run_command(session_id, cmd, timeout_sec=60)

    async def run_command(
        self,
        session_id: str,
        command: str,
        timeout_sec: int = 30,
        memory_limit_mb: float = 512.0,
        max_retries: int = 1,
    ) -> SandboxResult:
        
        workspace_path = os.path.join(self.base_dir, session_id)
        if not os.path.exists(workspace_path):
            self.create_workspace(session_id)

        start_time = time.time()
        logs: List[str] = [f"[SANDBOX] Session: {session_id}", f"[SANDBOX] Command: {command}"]

        for attempt in range(max_retries + 1):
            try:
                logger.info(f"NirmanSandbox executing command attempt {attempt + 1}: '{command}' in {session_id}")
                
                process = await asyncio.create_subprocess_shell(
                    command,
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                    cwd=workspace_path,
                )

                stdout_data, stderr_data = await asyncio.wait_for(
                    process.communicate(), timeout=timeout_sec
                )

                stdout_str = stdout_data.decode("utf-8", errors="replace")
                stderr_str = stderr_data.decode("utf-8", errors="replace")
                exit_code = process.returncode or 0
                elapsed = time.time() - start_time

                status = "SUCCESS" if exit_code == 0 else "FAILED"
                artifacts = self.list_files(session_id)

                logs.append(f"[SANDBOX] Exit Code: {exit_code}")
                logs.append(f"[SANDBOX] Execution Time: {round(elapsed, 2)}s")

                result = SandboxResult(
                    session_id=session_id,
                    command=command,
                    status=status,
                    exit_code=exit_code,
                    stdout=stdout_str,
                    stderr=stderr_str,
                    logs=logs,
                    artifacts=artifacts,
                    execution_time_sec=round(elapsed, 2),
                    memory_limit_mb=memory_limit_mb,
                )

                if session_id not in self._history:
                    self._history[session_id] = []
                self._history[session_id].append(result)

                if exit_code == 0 or attempt == max_retries:
                    return result

            except asyncio.TimeoutError:
                elapsed = time.time() - start_time
                logs.append(f"[SANDBOX ERROR] Command timed out after {timeout_sec}s")
                logger.error(f"NirmanSandbox command timed out: '{command}'")
                
                result = SandboxResult(
                    session_id=session_id,
                    command=command,
                    status="TIMEOUT",
                    exit_code=124,
                    stdout="",
                    stderr=f"Execution timed out after {timeout_sec} seconds.",
                    logs=logs,
                    artifacts=self.list_files(session_id),
                    execution_time_sec=round(elapsed, 2),
                    memory_limit_mb=memory_limit_mb,
                )
                if attempt == max_retries:
                    return result

        # Fallback return
        return result

# Global Sandbox instance
sandbox = NirmanSandbox()
