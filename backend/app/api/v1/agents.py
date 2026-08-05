from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.agent import Agent
from app.schemas.agent import AgentResponse

router = APIRouter()

INITIAL_AGENTS = [
    {
        "role": "CEO",
        "name": "Evelyn Vance",
        "avatar": "👔",
        "description": "Executive strategy, vision alignment, resource allocation, business viability oversight.",
        "capabilities": ["Product Vision", "Strategic Direction", "ROI Analysis", "Executive Sign-off"]
    },
    {
        "role": "BUSINESS_ANALYST",
        "name": "Marcus Brody",
        "avatar": "📊",
        "description": "Product discovery, market analysis, competitor breakdown, functional user personas.",
        "capabilities": ["Market Discovery", "User Persona Synthesis", "Competitor Matrix", "Value Proposition"]
    },
    {
        "role": "PRODUCT_MANAGER",
        "name": "Sarah Lin",
        "avatar": "📋",
        "description": "Requirements gathering, PRD synthesis, SRS documentation, feature roadmap prioritization.",
        "capabilities": ["PRD Creation", "SRS Documentation", "User Story Mapping", "Sprint Backlog"]
    },
    {
        "role": "SOLUTION_ARCHITECT",
        "name": "Vikram Patel",
        "avatar": "🏗️",
        "description": "High-level system topology, non-functional requirements, technology selection, ADR drafting.",
        "capabilities": ["System Topology", "Technology Matrix", "ADR Creation", "Scalability Planning"]
    },
    {
        "role": "SYSTEM_ARCHITECT",
        "name": "Elena Rostova",
        "avatar": "📐",
        "description": "Clean Architecture specification, modular boundaries, UML sequence diagrams, component graphs.",
        "capabilities": ["Clean Architecture", "UML Sequence Diagrams", "Domain Model", "Component Boundaries"]
    },
    {
        "role": "DATABASE_ARCHITECT",
        "name": "David Chen",
        "avatar": "🗄️",
        "description": "3NF normalized schema design, ER diagrams, indexing strategy, migration scripts, vector embeddings.",
        "capabilities": ["ER Diagramming", "PostgreSQL Schema", "Indexing Strategy", "Alembic Migrations"]
    },
    {
        "role": "UI_UX_DESIGNER",
        "name": "Chloe Dubois",
        "avatar": "🎨",
        "description": "Design system definition, typography, glassmorphic layout wireframing, component spec.",
        "capabilities": ["Design System", "Component Spec", "Responsive Layouts", "Accessibility (WCAG)"]
    },
    {
        "role": "FRONTEND_ENGINEER",
        "name": "Lucas Meyer",
        "avatar": "⚛️",
        "description": "Next.js App Router, React 19, Tailwind CSS, TanStack Query, state management implementation.",
        "capabilities": ["Next.js App Router", "Tailwind CSS", "Zod Validation", "UI State Machine"]
    },
    {
        "role": "BACKEND_ENGINEER",
        "name": "Aria Takahashi",
        "avatar": "⚙️",
        "description": "FastAPI micro-services, Pydantic v2 validation, SQLAlchemy async ORM, domain services.",
        "capabilities": ["FastAPI Endpoints", "Async SQLAlchemy", "RESTful Architecture", "Service Layer"]
    },
    {
        "role": "API_ENGINEER",
        "name": "Omar Al-Mansoor",
        "avatar": "🔌",
        "description": "OpenAPI / Swagger specs, REST contract design, rate limiting, versioning guidelines.",
        "capabilities": ["OpenAPI 3.1", "API Versioning", "Rate Limiting", "Payload Schemas"]
    },
    {
        "role": "AI_ENGINEER",
        "name": "Dr. Sophia Sterling",
        "avatar": "🤖",
        "description": "LangGraph state orchestrator, LiteLLM proxy, prompt template engineering, RAG pipelines.",
        "capabilities": ["LangGraph State", "LiteLLM Router", "Prompt Engineering", "Vector Search"]
    },
    {
        "role": "SECURITY_ENGINEER",
        "name": "Alex Mercer",
        "avatar": "🛡️",
        "description": "OWASP top 10 audit, JWT auth enforcement, RBAC middleware, API key encryption.",
        "capabilities": ["JWT & RBAC", "OWASP Audit", "Input Sanitization", "Encryption at Rest"]
    },
    {
        "role": "QA_ENGINEER",
        "name": "Devon Hayes",
        "avatar": "🧪",
        "description": "Unit testing (PyTest/Jest), integration testing, end-to-end simulation, coverage reporting.",
        "capabilities": ["PyTest Suites", "Jest Component Tests", "E2E Testing", "Coverage Reports"]
    },
    {
        "role": "DEVOPS_ENGINEER",
        "name": "Kaito Tanaka",
        "avatar": "🐳",
        "description": "Docker multi-stage builds, Docker Compose stack, Prometheus/Grafana metrics, CI/CD pipeline.",
        "capabilities": ["Docker Compose", "GitHub Actions", "Prometheus & Grafana", "Nginx Reverse Proxy"]
    }
]

@router.get("/", response_model=List[AgentResponse])
async def list_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agent))
    agents = result.scalars().all()
    if not agents:
        # Seed initial agents
        for agent_data in INITIAL_AGENTS:
            agent = Agent(**agent_data, status="IDLE", completed_tasks=12, accuracy_rating=99.4)
            db.add(agent)
        await db.commit()
        result = await db.execute(select(Agent))
        agents = result.scalars().all()
    return agents
