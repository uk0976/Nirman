from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.core.orchestrator.orchestrator_engine import ai_orchestrator_engine_instance

router = APIRouter()

class StartWorkflowRequest(BaseModel):
    project_name: str
    raw_idea: str

class ApprovalActionRequest(BaseModel):
    action: str  # "APPROVE", "REJECT", "PAUSE", "RESUME"
    feedback: Optional[str] = None

@router.post("/start-workflow")
async def start_workflow(req: StartWorkflowRequest):
    ai_orchestrator_engine_instance.completed_agents.clear()
    ai_orchestrator_engine_instance.workflow_logs.clear()
    ai_orchestrator_engine_instance.accumulated_tokens = 0
    ai_orchestrator_engine_instance.estimated_cost_usd = 0.0
    
    # Run initial Discovery step (CEO Agent)
    step_res = await ai_orchestrator_engine_instance.run_next_step(req.project_name)
    
    return {
        "status": "WORKFLOW_STARTED",
        "project_name": req.project_name,
        "initial_step": step_res,
        "telemetry": {
            "accumulated_tokens": ai_orchestrator_engine_instance.accumulated_tokens,
            "estimated_cost_usd": ai_orchestrator_engine_instance.estimated_cost_usd
        }
    }

@router.get("/status/{project_id}")
async def get_workflow_status(project_id: str):
    return {
        "project_id": project_id,
        "current_state": ai_orchestrator_engine_instance.current_state.value,
        "completed_agents_count": len(ai_orchestrator_engine_instance.completed_agents),
        "total_agents": len(ai_orchestrator_engine_instance.agent_map),
        "logs": ai_orchestrator_engine_instance.workflow_logs,
        "telemetry": {
            "accumulated_tokens": ai_orchestrator_engine_instance.accumulated_tokens,
            "estimated_cost_usd": round(ai_orchestrator_engine_instance.estimated_cost_usd, 4)
        }
    }

@router.post("/next-step")
async def execute_next_step(project_name: str = "Nirman SaaS Core Platform"):
    step_res = await ai_orchestrator_engine_instance.run_next_step(project_name)
    return {
        "status": "STEP_EXECUTED",
        "step_result": step_res,
        "current_state": ai_orchestrator_engine_instance.current_state.value,
        "telemetry": {
            "accumulated_tokens": ai_orchestrator_engine_instance.accumulated_tokens,
            "estimated_cost_usd": round(ai_orchestrator_engine_instance.estimated_cost_usd, 4)
        }
    }

@router.post("/approval-action")
async def process_approval_action(req: ApprovalActionRequest):
    return {
        "status": f"WORKFLOW_{req.action}",
        "message": f"Action '{req.action}' processed successfully by AI Orchestration Engine.",
        "current_state": ai_orchestrator_engine_instance.current_state.value
    }
