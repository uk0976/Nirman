from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("/stream/{project_id}")
async def get_warroom_stream(project_id: str, db: AsyncSession = Depends(get_db)):
    """
    Returns live multi-agent collaboration timeline for a project in the AI War Room.
    """
    return [
        {
            "id": "msg-1",
            "agent_role": "CEO",
            "agent_name": "Evelyn Vance",
            "avatar": "👔",
            "message": "Initiating Product Discovery phase for new SaaS project. Product Manager & Business Analyst, present the market analysis.",
            "timestamp": "2 mins ago",
            "type": "DIRECTIVE"
        },
        {
            "id": "msg-2",
            "agent_role": "BUSINESS_ANALYST",
            "agent_name": "Marcus Brody",
            "avatar": "📊",
            "message": "Market research confirms strong demand. Synthesized 3 primary user personas and competitor matrix.",
            "timestamp": "1 min ago",
            "type": "ANALYSIS"
        },
        {
            "id": "msg-3",
            "agent_role": "SYSTEM_ARCHITECT",
            "agent_name": "Elena Rostova",
            "avatar": "📐",
            "message": "Evaluating Modular Monolith vs Microservices. Recommend Clean Architecture Modular Monolith with FastAPI and Next.js.",
            "timestamp": "Just now",
            "type": "CONSENSUS_PROPOSAL"
        }
    ]
