from typing import Dict, Any, Optional
from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.db_architect_agent import db_architect_agent_instance
from app.core.agent_framework.base_agent import AgentTask

router = APIRouter()

class SchemaRequest(BaseModel):
    project_name: str
    system_design_summary: Optional[str] = None

class SchemaApprovalRequest(BaseModel):
    approved: bool
    feedback: Optional[str] = None

@router.post("/schema")
async def synthesize_database_schema(req: SchemaRequest):
    task = AgentTask(
        title=f"3NF PostgreSQL Database Schema for {req.project_name}",
        description="Synthesize 3NF PostgreSQL DDL, Multi-Tenant RLS Policies, Alembic Migrations, and pgvector HNSW Indexing.",
        phase="Phase 8: Database Architecture (3NF)",
        assigned_agent_id=db_architect_agent_instance.agent_id,
        input_payload={
            "project_name": req.project_name,
            "dsdd_summary": req.system_design_summary
        }
    )
    db_architect_agent_instance.assign_task(task)
    schema_pkg = await db_architect_agent_instance.execute(task, {})
    
    return {
        "status": "SCHEMA_SYNTHESIZED",
        "agent": {
            "name": db_architect_agent_instance.name,
            "role": db_architect_agent_instance.role
        },
        "database_architecture": schema_pkg,
        "next_step": "HUMAN_APPROVAL_REQUIRED"
    }

@router.post("/approve-schema")
async def approve_database_schema(req: SchemaApprovalRequest):
    return {
        "status": "APPROVED" if req.approved else "CHANGES_REQUESTED",
        "message": "3NF PostgreSQL Database schema approved and frozen! Handoff sent to UI/UX Designer Agent (Sophia Martinez)." if req.approved else "Database schema updated based on user feedback.",
        "next_agent": "UI/UX Designer Agent (Sophia Martinez)"
    }
