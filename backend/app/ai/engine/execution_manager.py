import asyncio
import logging
import time
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

from app.ai.planner.task_planner import PlannedSubtask, ExecutionPlan
from app.ai.registry.agent_router import AgentRouter, AgentProfile
from app.ai.context.context_manager import ContextManager
from app.ai.prompts.prompt_builder import PromptBuilder
from app.ai.memory.memory_manager import MemoryManager
from app.ai.events.event_bus import event_bus
from app.ai.engine.artifact_collector import ArtifactCollector, CollectedArtifact
from app.ai.providers.factory import get_llm_provider

logger = logging.getLogger(__name__)

class TaskExecutionResult(BaseModel):
    task_id: str
    assigned_role: str
    agent_name: str
    status: str  # COMPLETED, FAILED
    output: str
    artifacts: List[CollectedArtifact] = []
    tokens_used: int = 0
    cost_usd: float = 0.0
    execution_time_sec: float = 0.0
    error: Optional[str] = None

class ExecutionManager:
    """
    Executes task batches concurrently using LLMProvider instances,
    handles automatic retries with exponential backoff, tracks token consumption,
    and publishes streaming progress events.
    """
    
    def __init__(
        self,
        agent_router: AgentRouter,
        context_manager: ContextManager,
        memory_manager: MemoryManager,
        artifact_collector: ArtifactCollector,
    ):
        self.agent_router = agent_router
        self.context_manager = context_manager
        self.memory_manager = memory_manager
        self.artifact_collector = artifact_collector

    async def execute_plan(self, plan: ExecutionPlan) -> List[TaskExecutionResult]:
        logger.info(f"ExecutionManager starting workflow {plan.workflow_id} with {len(plan.parallel_batches)} batches.")
        results: List[TaskExecutionResult] = []
        task_dict = {t.task_id: t for t in plan.tasks}

        for batch_idx, batch in enumerate(plan.parallel_batches):
            logger.info(f"Executing Batch {batch_idx + 1}/{len(plan.parallel_batches)}: {batch}")
            
            # Execute tasks in current batch concurrently
            batch_tasks = [task_dict[tid] for tid in batch if tid in task_dict]
            batch_results = await asyncio.gather(
                *[self._execute_single_task_with_retry(plan.workflow_id, plan.project_id, t) for t in batch_tasks],
                return_exceptions=True
            )

            for res in batch_results:
                if isinstance(res, TaskExecutionResult):
                    results.append(res)
                    # Store in shared memory for downstream tasks
                    self.memory_manager.set_task_output(plan.workflow_id, res.task_id, res.output)
                else:
                    logger.error(f"Task batch execution exception: {res}")

        return results

    async def _execute_single_task_with_retry(
        self, workflow_id: str, project_id: str, subtask: PlannedSubtask, max_retries: int = 2
    ) -> TaskExecutionResult:
        
        agent = self.agent_router.route_task(subtask.assigned_role)
        provider = get_llm_provider("openai")
        start_time = time.time()

        await event_bus.publish(
            "task_started",
            {"workflow_id": workflow_id, "task_id": subtask.task_id, "agent": agent.name, "role": agent.role}
        )

        for attempt in range(max_retries + 1):
            try:
                # Build context & prompt
                upstream_memory = self.memory_manager.get_workflow_memory(workflow_id)
                formatted_ctx = self.context_manager.format_context_for_prompt(project_id, upstream_memory)
                messages = PromptBuilder.build_agent_prompt(
                    agent, subtask.title, subtask.description, formatted_ctx
                )

                await event_bus.publish(
                    "agent_thinking",
                    {"task_id": subtask.task_id, "agent": agent.name, "attempt": attempt + 1}
                )

                # Execute LLM provider generation
                system_prompt = messages[0]["content"]
                user_prompt = messages[1]["content"]

                # Collect streaming response tokens
                output_text = ""
                async for token in provider.stream(user_prompt, system_prompt=system_prompt, config={"model": agent.model}):
                    output_text += token
                    await event_bus.publish("token_stream", {"task_id": subtask.task_id, "token": token})

                if not output_text.strip():
                    output_text = await provider.generate(user_prompt, system_prompt=system_prompt, config={"model": agent.model})

                # Calculate tokens & estimated cost
                prompt_tokens = len(user_prompt.split()) + len(system_prompt.split())
                completion_tokens = len(output_text.split())
                tokens_used = prompt_tokens + completion_tokens
                cost_usd = provider.estimate_cost(prompt_tokens, completion_tokens, agent.model)

                # Extract artifacts
                artifacts = self.artifact_collector.extract_artifacts(subtask.task_id, agent.role, output_text)
                elapsed = time.time() - start_time

                await event_bus.publish(
                    "task_completed",
                    {"task_id": subtask.task_id, "agent": agent.name, "status": "COMPLETED", "tokens": tokens_used, "cost": cost_usd}
                )

                return TaskExecutionResult(
                    task_id=subtask.task_id,
                    assigned_role=agent.role,
                    agent_name=agent.name,
                    status="COMPLETED",
                    output=output_text,
                    artifacts=artifacts,
                    tokens_used=tokens_used,
                    cost_usd=round(cost_usd, 5),
                    execution_time_sec=round(elapsed, 2),
                )
            except Exception as err:
                logger.warning(f"Task {subtask.task_id} failed on attempt {attempt + 1}: {err}")
                if attempt < max_retries:
                    await asyncio.sleep(1.5 * (attempt + 1))
                else:
                    elapsed = time.time() - start_time
                    return TaskExecutionResult(
                        task_id=subtask.task_id,
                        assigned_role=agent.role,
                        agent_name=agent.name,
                        status="FAILED",
                        output="",
                        error=str(err),
                        execution_time_sec=round(elapsed, 2),
                    )
