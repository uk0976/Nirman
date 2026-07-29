import uuid
import logging
import time
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

from backend.app.ai.planner.task_planner import TaskPlanner, ExecutionPlan
from backend.app.ai.registry.agent_router import AgentRouter
from backend.app.ai.context.context_manager import ContextManager
from backend.app.ai.memory.memory_manager import MemoryManager
from backend.app.ai.events.event_bus import event_bus
from backend.app.ai.engine.artifact_collector import ArtifactCollector, CollectedArtifact
from backend.app.ai.engine.execution_manager import ExecutionManager, TaskExecutionResult

logger = logging.getLogger(__name__)

class OrchestrationResponse(BaseModel):
    execution_id: str
    workflow_id: str
    project_id: str
    status: str  # COMPLETED, FAILED
    summary: str
    total_tasks: int
    completed_tasks: int
    total_tokens_used: int
    total_cost_usd: float
    total_duration_sec: float
    artifacts: List[CollectedArtifact] = Field(default_factory=list)
    task_results: List[TaskExecutionResult] = Field(default_factory=list)

class AIOrchestrator:
    """
    Central brain coordinating multi-agent software engineering pipelines.
    User Request -> CEO Agent -> Planner -> Task Generator -> Agent Router -> Parallel AI Employees -> Artifact Collector -> Response Builder
    """

    def __init__(self):
        self.planner = TaskPlanner()
        self.agent_router = AgentRouter()
        self.context_manager = ContextManager()
        self.memory_manager = MemoryManager()
        self.artifact_collector = ArtifactCollector()
        self.execution_manager = ExecutionManager(
            agent_router=self.agent_router,
            context_manager=self.context_manager,
            memory_manager=self.memory_manager,
            artifact_collector=self.artifact_collector,
        )

    async def execute_user_request(
        self, prompt: str, project_id: str, workflow_id: Optional[str] = None
    ) -> OrchestrationResponse:
        
        start_time = time.time()
        exec_id = str(uuid.uuid4())
        wf_id = workflow_id or f"WF-{uuid.uuid4().hex[:6].upper()}"

        logger.info(f"AIOrchestrator initiating workflow {wf_id} for prompt: '{prompt[:50]}'")

        await event_bus.publish(
            "workflow_started",
            {"execution_id": exec_id, "workflow_id": wf_id, "project_id": project_id}
        )

        # 1. Step 1: CEO & Task Planner generate DAG Execution Plan
        plan: ExecutionPlan = await self.planner.plan_execution(prompt, project_id, wf_id)

        # 2. Step 2: Parallel execution manager runs DAG subtasks
        task_results: List[TaskExecutionResult] = await self.execution_manager.execute_plan(plan)

        # 3. Step 3: Collect artifacts & calculate telemetry
        all_artifacts: List[CollectedArtifact] = []
        total_tokens = 0
        total_cost = 0.0
        completed_count = 0

        for res in task_results:
            if res.status == "COMPLETED":
                completed_count += 1
            all_artifacts.extend(res.artifacts)
            total_tokens += res.tokens_used
            total_cost += res.cost_usd

        elapsed = time.time() - start_time
        status = "COMPLETED" if completed_count == len(task_results) else "PARTIAL"

        await event_bus.publish(
            "workflow_finished",
            {
                "execution_id": exec_id,
                "workflow_id": wf_id,
                "status": status,
                "artifacts_count": len(all_artifacts),
                "duration_sec": round(elapsed, 2),
            }
        )

        return OrchestrationResponse(
            execution_id=exec_id,
            workflow_id=wf_id,
            project_id=project_id,
            status=status,
            summary=f"Successfully executed autonomous software build for prompt: '{prompt[:60]}'",
            total_tasks=len(plan.tasks),
            completed_tasks=completed_count,
            total_tokens_used=total_tokens,
            total_cost_usd=round(total_cost, 4),
            total_duration_sec=round(elapsed, 2),
            artifacts=all_artifacts,
            task_results=task_results,
        )

# Global orchestrator instance
orchestrator = AIOrchestrator()
