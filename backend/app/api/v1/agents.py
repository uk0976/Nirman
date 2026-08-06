from typing import List, Dict, Any
from fastapi import APIRouter
from app.core.agent_framework.registry import agent_registry
from app.core.agent_framework.observability import agent_observability
from app.core.agent_framework.communication import communication_bus
from app.core.agent_framework.tools import tool_registry

router = APIRouter()

ROSTER = [
  { "id": "ceo", "name": "Evelyn Vance", "role": "Chief Executive Officer", "state": "THINKING", "task": "Product Vision & Company Alignment", "tokens": "142.5k", "cost": "$0.28" },
  { "id": "ba", "name": "Marcus Brody", "role": "Business Analyst", "state": "READY", "task": "Market Research & Competitor Matrix", "tokens": "98.2k", "cost": "$0.19" },
  { "id": "pm", "name": "Sarah Lin", "role": "Product Manager", "state": "EXECUTING", "task": "PRD & SRS Specifications", "tokens": "210.4k", "cost": "$0.42" },
  { "id": "arch", "name": "Elena Rostova", "role": "System Architect", "state": "EXECUTING", "task": "Clean Architecture Topology", "tokens": "180.1k", "cost": "$0.36" },
  { "id": "db", "name": "David Chen", "role": "Database Architect", "state": "WAITING_HUMAN_APPROVAL", "task": "PostgreSQL 3NF Schema", "tokens": "154.6k", "cost": "$0.31" },
  { "id": "api", "name": "Omar Al-Mansoor", "role": "API Engineer", "state": "READY", "task": "OpenAPI 3.1 REST Specifications", "tokens": "88.0k", "cost": "$0.17" },
  { "id": "fe", "name": "Lucas Meyer", "role": "Frontend Engineer", "state": "READY", "task": "Next.js 15 App Router Components", "tokens": "165.2k", "cost": "$0.33" },
  { "id": "be", "name": "Aria Takahashi", "role": "Backend Engineer", "state": "READY", "task": "FastAPI Async Services & SQLAlchemy", "tokens": "178.9k", "cost": "$0.35" },
  { "id": "ai", "name": "Dr. Aris Thorne", "role": "AI Engineer", "state": "READY", "task": "LiteLLM Router & Vector Store RAG", "tokens": "112.4k", "cost": "$0.22" },
  { "id": "sec", "name": "Alex Mercer", "role": "Security Engineer", "state": "READY", "task": "OWASP Audit & JWT RBAC", "tokens": "105.7k", "cost": "$0.21" },
  { "id": "qa", "name": "Devon Hayes", "role": "QA Engineer", "state": "READY", "task": "PyTest Async Test Suites", "tokens": "94.3k", "cost": "$0.18" },
  { "id": "ops", "name": "Kaito Tanaka", "role": "DevOps Engineer", "state": "READY", "task": "Docker Compose & Nginx Proxy", "tokens": "130.8k", "cost": "$0.26" },
  { "id": "writer", "name": "Clara Sterling", "role": "Technical Writer", "state": "READY", "task": "API Documentation & User Guides", "tokens": "76.1k", "cost": "$0.15" },
  { "id": "deploy", "name": "Vikram Patel", "role": "Deployment Engineer", "state": "READY", "task": "Kubernetes & Production Rollout", "tokens": "89.4k", "cost": "$0.18" }
]

@router.get("/")
async def list_agents():
    return ROSTER

@router.get("/observability")
async def get_observability_metrics():
    return {
        "metrics": {
            "total_prompt_tokens": 1836600,
            "total_completion_tokens": 420500,
            "estimated_cost_usd": 3.59,
            "total_agent_executions": 48,
            "failed_executions": 0
        },
        "logs": agent_observability.get_logs()
    }

@router.get("/communication")
async def get_interagent_messages():
    return [
        {"timestamp": "10:42:01", "sender": "CEO (Evelyn Vance)", "recipient": "Product Manager (Sarah Lin)", "type": "DIRECTIVE", "message": "Synthesize PRD for Nirman SaaS Core."},
        {"timestamp": "10:42:30", "sender": "Product Manager (Sarah Lin)", "recipient": "System Architect (Elena Rostova)", "type": "HANDOFF", "message": "PRD Spec completed with 45 User Stories. Proceed to Architecture."},
        {"timestamp": "10:43:15", "sender": "System Architect (Elena Rostova)", "recipient": "DB Architect (David Chen)", "type": "HANDOFF", "message": "Clean Architecture specified. Synthesize 3NF PostgreSQL schema."}
    ]
