import asyncio
from typing import Dict, Any, List, Set, Optional
from enum import Enum
import datetime

from app.core.orchestrator.dependency_resolver import dependency_resolver_instance
from app.core.orchestrator.context_manager import context_manager_instance
from app.core.orchestrator.artifact_pipeline import artifact_pipeline_instance
from app.core.agent_framework.base_agent import AgentTask, AgentState
from app.agents import (
    ceo_agent_instance, ba_agent_instance, pm_agent_instance,
    architect_agent_instance, system_architect_agent_instance,
    db_architect_agent_instance, ux_designer_agent_instance,
    frontend_agent_instance, backend_agent_instance,
    qa_agent_instance, security_agent_instance,
    devops_agent_instance, doc_agent_instance
)

class WorkflowState(str, Enum):
    CREATED = "CREATED"
    DISCOVERY = "DISCOVERY"
    REQUIREMENTS = "REQUIREMENTS"
    PRODUCT_PLANNING = "PRODUCT_PLANNING"
    ARCHITECTURE = "ARCHITECTURE"
    DESIGN = "DESIGN"
    PARALLEL_ENGINEERING = "PARALLEL_ENGINEERING"
    TESTING = "TESTING"
    SECURITY_AUDIT = "SECURITY_AUDIT"
    DEVOPS = "DEVOPS"
    DOCUMENTATION = "DOCUMENTATION"
    WAITING_FOR_APPROVAL = "WAITING_FOR_APPROVAL"
    PAUSED = "PAUSED"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class AIOrchestratorEngine:
    """
    Enterprise-grade AI Orchestration Engine coordinating 14 specialized SDLC agents.
    Manages dependency DAGs, parallel branches, state machine transitions, context filtering, token costs, and human approval gates.
    """
    def __init__(self):
        self.agent_map = {
            "agent-ceo-evelyn": ceo_agent_instance,
            "agent-ba-marcus": ba_agent_instance,
            "agent-pm-sarah": pm_agent_instance,
            "agent-arch-elena": architect_agent_instance,
            "agent-sysarch-elena": system_architect_agent_instance,
            "agent-db-david": db_architect_agent_instance,
            "agent-ux-sophia": ux_designer_agent_instance,
            "agent-fe-lucas": frontend_agent_instance,
            "agent-be-ethan": backend_agent_instance,
            "agent-qa-rachel": qa_agent_instance,
            "agent-sec-devon": security_agent_instance,
            "agent-devops-marcus": devops_agent_instance,
            "agent-doc-amara": doc_agent_instance
        }
        self.current_state = WorkflowState.CREATED
        self.completed_agents: Set[str] = set()
        self.workflow_logs: List[Dict[str, Any]] = []
        self.accumulated_tokens = 0
        self.estimated_cost_usd = 0.0

    async def execute_agent(self, agent_id: str, input_payload: Dict[str, Any]) -> Dict[str, Any]:
        agent = self.agent_map.get(agent_id)
        if not agent:
            raise ValueError(f"Unknown agent ID: {agent_id}")

        filtered_ctx = context_manager_instance.filter_context_for_agent(agent_id, input_payload)
        task = AgentTask(
            title=f"SDLC Task for {agent.name}",
            description=f"Automated execution step for {agent.role}",
            phase=self.current_state.value,
            assigned_agent_id=agent_id,
            input_payload=filtered_ctx
        )
        
        agent.assign_task(task)
        result = await agent.execute(task, filtered_ctx)
        
        # Register generated artifact in lineage pipeline
        artifact_pipeline_instance.register_artifact(
            artifact_type=agent.role,
            source_agent_id=agent_id,
            content=result
        )

        # Track simulated telemetry
        tokens_used = 12500
        self.accumulated_tokens += tokens_used
        self.estimated_cost_usd += (tokens_used / 1000) * 0.002
        
        self.completed_agents.add(agent_id)
        self.workflow_logs.append({
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "agent_id": agent_id,
            "agent_name": agent.name,
            "role": agent.role,
            "state": self.current_state.value,
            "status": "COMPLETED"
        })
        
        return result

    async def run_next_step(self, project_name: str) -> Dict[str, Any]:
        ready = dependency_resolver_instance.get_ready_agents(self.completed_agents)
        if not ready:
            if len(self.completed_agents) == len(self.agent_map):
                self.current_state = WorkflowState.COMPLETED
                return {"status": "WORKFLOW_COMPLETE", "message": "All 14 agents executed successfully!"}
            return {"status": "WAITING_APPROVAL", "message": "Workflow paused for human approval gate."}

        # Handle Parallel Executions
        if dependency_resolver_instance.is_parallel_stage(ready):
            self.workflow_logs.append({
                "timestamp": datetime.datetime.utcnow().isoformat(),
                "event": "PARALLEL_EXECUTION_STARTED",
                "agents": ready
            })
            tasks = [self.execute_agent(aid, {"project_name": project_name}) for aid in ready]
            results = await asyncio.gather(*tasks)
            return {
                "status": "PARALLEL_STAGE_COMPLETED",
                "executed_agents": ready,
                "results_count": len(results)
            }
        else:
            agent_id = ready[0]
            res = await self.execute_agent(agent_id, {"project_name": project_name})
            return {
                "status": "SINGLE_STEP_COMPLETED",
                "agent_id": agent_id,
                "result": res
            }

ai_orchestrator_engine_instance = AIOrchestratorEngine()
