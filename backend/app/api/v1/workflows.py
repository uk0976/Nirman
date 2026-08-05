from typing import List, Dict, Any
from fastapi import APIRouter

router = APIRouter()

SDLC_PHASES = [
    {"phase": 1, "name": "Product Discovery", "agent": "BUSINESS_ANALYST", "status": "COMPLETED"},
    {"phase": 2, "name": "Requirement Gathering", "agent": "PRODUCT_MANAGER", "status": "COMPLETED"},
    {"phase": 3, "name": "Product Vision", "agent": "CEO", "status": "COMPLETED"},
    {"phase": 4, "name": "Competitor Analysis", "agent": "BUSINESS_ANALYST", "status": "COMPLETED"},
    {"phase": 5, "name": "User Personas", "agent": "BUSINESS_ANALYST", "status": "COMPLETED"},
    {"phase": 6, "name": "Functional & Non-Functional Requirements", "agent": "PRODUCT_MANAGER", "status": "IN_PROGRESS"},
    {"phase": 7, "name": "System Architecture", "agent": "SYSTEM_ARCHITECT", "status": "PENDING"},
    {"phase": 8, "name": "Database Design", "agent": "DATABASE_ARCHITECT", "status": "PENDING"},
    {"phase": 9, "name": "API Design", "agent": "API_ENGINEER", "status": "PENDING"},
    {"phase": 10, "name": "Project Foundation", "agent": "SOLUTION_ARCHITECT", "status": "PENDING"},
    {"phase": 11, "name": "Authentication & Security", "agent": "SECURITY_ENGINEER", "status": "PENDING"},
    {"phase": 12, "name": "AI Infrastructure", "agent": "AI_ENGINEER", "status": "PENDING"},
    {"phase": 13, "name": "AI Agent Development", "agent": "AI_ENGINEER", "status": "PENDING"},
    {"phase": 14, "name": "Independent Testing of Each Agent", "agent": "QA_ENGINEER", "status": "PENDING"},
    {"phase": 15, "name": "Multi-Agent Orchestration", "agent": "SYSTEM_ARCHITECT", "status": "PENDING"},
    {"phase": 16, "name": "System Integration Testing", "agent": "QA_ENGINEER", "status": "PENDING"},
    {"phase": 17, "name": "Performance Optimization", "agent": "BACKEND_ENGINEER", "status": "PENDING"},
    {"phase": 18, "name": "Deployment", "agent": "DEVOPS_ENGINEER", "status": "PENDING"},
    {"phase": 19, "name": "Monitoring & Logging", "agent": "DEVOPS_ENGINEER", "status": "PENDING"},
    {"phase": 20, "name": "Documentation & Maintenance", "agent": "TECHNICAL_WRITER", "status": "PENDING"},
]

@router.get("/sdlc-phases")
async def get_sdlc_phases():
    return SDLC_PHASES
