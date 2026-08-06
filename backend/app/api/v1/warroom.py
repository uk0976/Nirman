from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

class PromptRequest(BaseModel):
    project_id: Optional[str] = "proj-1"
    prompt: str

class ApprovalAction(BaseModel):
    task_id: str
    action: str # APPROVE, REJECT, REQUEST_CHANGES
    feedback: Optional[str] = None

LIVE_TASKS = [
    {"id": "task-1", "title": "Product Discovery & Market Research", "phase": "Phase 1", "agent": "Business Analyst", "priority": "HIGH", "status": "COMPLETED", "progress": 100, "duration": "1.2m"},
    {"id": "task-2", "title": "PRD & SRS Specifications Synthesis", "phase": "Phase 6", "agent": "Product Manager", "priority": "CRITICAL", "status": "COMPLETED", "progress": 100, "duration": "2.4m"},
    {"id": "task-3", "title": "Clean Architecture Modular Topology", "phase": "Phase 7", "agent": "System Architect", "priority": "CRITICAL", "status": "IN_PROGRESS", "progress": 65, "duration": "Running..."},
    {"id": "task-4", "title": "PostgreSQL 3NF Schema & Migrations", "phase": "Phase 8", "agent": "Database Architect", "priority": "HIGH", "status": "WAITING_APPROVAL", "progress": 90, "duration": "Paused"},
    {"id": "task-5", "title": "FastAPI Async Services & Endpoints", "phase": "Phase 9", "agent": "Backend Engineer", "priority": "HIGH", "status": "QUEUED", "progress": 0, "duration": "Queued"},
    {"id": "task-6", "title": "PyTest Async Unit Suites", "phase": "Phase 16", "agent": "QA Engineer", "priority": "MEDIUM", "status": "QUEUED", "progress": 0, "duration": "Queued"}
]

EXECUTION_LOGS = [
    {"timestamp": "10:42:01", "agent": "CEO (Evelyn Vance)", "level": "INFO", "task": "Project Directive", "message": "Initiating 20-phase SDLC pipeline for 'Nirman SaaS Core Platform'."},
    {"timestamp": "10:42:15", "agent": "Product Manager (Sarah Lin)", "level": "INFO", "task": "PRD Synthesis", "message": "Synthesized 45 User Stories and competitor matrix."},
    {"timestamp": "10:43:00", "agent": "System Architect (Elena Rostova)", "level": "INFO", "task": "Clean Architecture", "message": "Specified Modular Monolith topology with FastAPI and Next.js 15."},
    {"timestamp": "10:43:45", "agent": "DB Architect (David Chen)", "level": "WARN", "task": "3NF Normalization", "message": "Human approval requested for 3NF PostgreSQL schema migration script."},
    {"timestamp": "10:44:10", "agent": "Security Engineer (Alex Mercer)", "level": "SUCCESS", "task": "OWASP Audit", "message": "Passed JWT auth and RBAC input sanitization checks."}
]

@router.get("/tasks")
async def get_task_queue():
    return LIVE_TASKS

@router.get("/logs")
async def get_execution_logs():
    return EXECUTION_LOGS

@router.post("/prompt")
async def submit_user_prompt(req: PromptRequest):
    return {
        "status": "ACCEPTED",
        "message": f"Directive received: '{req.prompt}'. AI Agent Roster notified.",
        "assigned_agent": "System Architect (Elena Rostova)"
    }

@router.post("/approve")
async def submit_human_approval(action: ApprovalAction):
    return {
        "status": "SUCCESS",
        "task_id": action.task_id,
        "action_taken": action.action,
        "message": f"Task {action.task_id} status updated to {action.action}. Pipeline resuming execution."
    }

@router.get("/stream/{project_id}")
async def get_warroom_stream(project_id: str, db: AsyncSession = Depends(get_db)):
    return [
        {
            "id": "msg-1",
            "agent_role": "CEO",
            "agent_name": "Evelyn Vance",
            "avatar": "👔",
            "message": "Initiating Product Discovery phase for new SaaS project. Product Manager & Business Analyst, present the market analysis.",
            "timestamp": "10:42 AM",
            "type": "DIRECTIVE"
        },
        {
            "id": "msg-2",
            "agent_role": "BUSINESS_ANALYST",
            "agent_name": "Marcus Brody",
            "avatar": "📊",
            "message": "Market research confirms strong demand. Synthesized 3 primary user personas and competitor matrix.",
            "timestamp": "10:43 AM",
            "type": "ANALYSIS"
        },
        {
            "id": "msg-3",
            "agent_role": "SYSTEM_ARCHITECT",
            "agent_name": "Elena Rostova",
            "avatar": "📐",
            "message": "Evaluating Modular Monolith vs Microservices. Recommend Clean Architecture Modular Monolith with FastAPI and Next.js.",
            "timestamp": "10:44 AM",
            "type": "CONSENSUS_PROPOSAL"
        }
    ]
