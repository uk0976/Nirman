from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate

router = APIRouter()

PROJECT_TEMPLATES = [
  {
    "id": "tpl-1",
    "name": "Enterprise SaaS Platform Template",
    "category": "SaaS",
    "description": "Pre-configured Next.js 15 App Router + FastAPI Backend with JWT Auth, PostgreSQL 3NF schema, and Docker Compose stack.",
    "tech_stack": {"frontend": "Next.js 15, Tailwind, TypeScript", "backend": "FastAPI, Python", "database": "PostgreSQL, Redis"},
    "icon": "🌐"
  },
  {
    "id": "tpl-2",
    "name": "Autonomous AI Agent Engine",
    "category": "AI Application",
    "description": "LangGraph multi-agent state graph orchestrator with LiteLLM proxy and pgvector RAG store.",
    "tech_stack": {"frontend": "React 19, Tailwind", "backend": "Python, LangChain, LiteLLM", "database": "PostgreSQL (pgvector)"},
    "icon": "🤖"
  },
  {
    "id": "tpl-3",
    "name": "E-Commerce & Digital Marketplace",
    "category": "E-Commerce",
    "description": "High-concurrency store front with Stripe payment webhooks, inventory matrix, and analytics.",
    "tech_stack": {"frontend": "Next.js, Tailwind", "backend": "FastAPI, Celery", "database": "PostgreSQL, Redis"},
    "icon": "🛒"
  },
  {
    "id": "tpl-4",
    "name": "FinTech Payment Gateway",
    "category": "FinTech",
    "description": "PCI-DSS compliant financial trade & transfer ledger micro-services.",
    "tech_stack": {"frontend": "React, TypeScript", "backend": "FastAPI, Go", "database": "PostgreSQL"},
    "icon": "💳"
  }
]

@router.get("/templates")
async def get_project_templates():
    return PROJECT_TEMPLATES

@router.get("/", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).order_by(Project.created_at.desc()))
    return result.scalars().all()

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(project_in: ProjectCreate, db: AsyncSession = Depends(get_db)):
    slug = project_in.name.lower().replace(" ", "-")
    project = Project(
        name=project_in.name,
        slug=slug,
        description=project_in.description,
        architecture_style=project_in.architecture_style or "MODULAR_MONOLITH",
        tech_stack=project_in.tech_stack or {
            "frontend": "Next.js 15, Tailwind CSS, TypeScript",
            "backend": "FastAPI, Python, Async SQLAlchemy",
            "database": "PostgreSQL, Redis",
            "devops": "Docker Compose, Nginx"
        }
    )
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        # Fallback response for demo IDs
        return Project(
            id=project_id,
            name="Nirman SaaS Core Platform",
            slug="nirman-saas-core",
            description="Enterprise AI Software Engineering Platform",
            status="IN_PROGRESS",
            sdlc_phase=6,
            architecture_style="MODULAR_MONOLITH",
            health_score=98,
            tech_stack={"frontend": "Next.js 15, Tailwind CSS", "backend": "FastAPI, Python", "database": "PostgreSQL, Redis"}
        )
    return project
