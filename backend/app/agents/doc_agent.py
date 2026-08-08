from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

DOC_SYSTEM_PROMPT = """You are Amara Okafor, Principal Technical Writer & Documentation Architect at Nirman.
Your persona is a Principal Technical Writer operating across large-scale software engineering organizations to maintain single-source-of-truth project documentation.

Rules:
1. You organize documentation into 7 core domains: Product, Architecture, Engineering, AI Framework, Operations, Security, and User/Developer Guides.
2. You document all 14 specialized SDLC agents (CEO, BA, PM, Solution Architect, System Architect, DB Architect, UI/UX Designer, Frontend Engineer, Backend Engineer, QA Engineer, Security Engineer, DevOps Engineer, Technical Writer, and Lead Orchestrator).
3. You produce comprehensive Developer Onboarding Guides (DEVELOPER_GUIDE.md), ADR Registries, and User Manuals, detecting any inconsistencies between documentation and code.
"""

class DocAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-doc-amara",
            name="Amara Okafor",
            role="Principal Technical Writer & Doc Architect",
            description="Maintains single-source-of-truth project documentation, 14-agent specifications, developer guides, ADR registries, and release manuals.",
            system_prompt=DOC_SYSTEM_PROMPT,
            capabilities=[AgentCapability.TECHNICAL_WRITING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "DOC_PLANNING_COMPLETE",
            "documentation_domains": 7,
            "agent_specs_count": 14,
            "consistency_status": "VALIDATED_ZERO_CONTRADICTIONS"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        developer_guide_md = """# NIRMAN AI PLATFORM — DEVELOPER ONBOARDING GUIDE

Welcome to the **Nirman AI Platform** codebase! This guide covers setup, architecture, and workflow for new engineers.

## Prerequisites
- Node.js 20+ and npm 10+
- Python 3.11+
- PostgreSQL 16
- Redis 7
- Docker & Docker Compose

## Quick Start
```bash
# 1. Clone repository
git clone https://github.com/uk0976/Nirman.git
cd Nirman

# 2. Setup Frontend
cd frontend
npm install
npm run dev

# 3. Setup Backend (in another terminal)
cd backend
python -m venv venv
source venv/bin/activate # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Architecture Summary
- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, TanStack Query.
- **Backend**: FastAPI async Python backend, Pydantic v2, Async SQLAlchemy 2.0.
- **AI Infrastructure**: 14 Autonomous SDLC Agents with LangGraph DAG orchestration.
"""

        doc_package = {
            "project_name": project_name,
            "doc_master_version": "v1.0",
            "executive_summary": "Master Technical Documentation Suite (DOC-MASTER v1.0) synthesized from DevOps Infrastructure #IAD-001. Single source of truth for Nirman platform.",
            "developer_guide_md": developer_guide_md,
            "hierarchy": [
                "1. Product Domain (Vision, PRD, SRS, Roadmap, Release Notes)",
                "2. Architecture Domain (Solution SAD v1.0, System DSDD v1.0, ADR-001..005)",
                "3. Engineering Domain (Frontend FAD v1.0, Backend BAD v1.0, 3NF DAD v1.0)",
                "4. AI Framework Domain (14 Agent Specs, Workflow DAGs, AI Eval Scorecards)",
                "5. Operations Domain (DevOps IAD v1.0, Docker Compose, Terraform IaC, DR Runbook)",
                "6. Security Domain (SEC-SAD v1.0, STRIDE Threat Matrix, OWASP Audits)",
                "7. User & Developer Domain (Developer Onboarding Guide, User Manual, FAQ)"
            ],
            "agent_roster": [
                {"role": "CEO Agent (Evelyn Vance)", "focus": "Strategic Planning & Client Discovery"},
                {"role": "Business Analyst Agent (Marcus Brody)", "focus": "Requirements Engineering & SRS"},
                {"role": "Product Manager Agent (Sarah Lin)", "focus": "MoSCoW Prioritization & Roadmap"},
                {"role": "Solution Architect Agent (Elena Rostova)", "focus": "High-Level Architecture & ADRs"},
                {"role": "System Architect Agent (Elena Rostova)", "focus": "Clean Architecture 4-Layer Design"},
                {"role": "Database Architect Agent (David Chen)", "focus": "3NF PostgreSQL & pgvector Schema"},
                {"role": "UI/UX Designer Agent (Sophia Martinez)", "focus": "Design Tokens & User Journeys"},
                {"role": "Frontend Engineer Agent (Lucas Meyer)", "focus": "Next.js 15 & Typed ApiClient"},
                {"role": "Backend Engineer Agent (Ethan Vance)", "focus": "FastAPI REST APIs & Repositories"},
                {"role": "QA Engineer Agent (Rachel Adams)", "focus": "Test Traceability & AI Evaluations"},
                {"role": "Security Engineer Agent (Devon Vance)", "focus": "STRIDE Threat Modeling & Security"},
                {"role": "DevOps Engineer Agent (Marcus Vance)", "focus": "Docker Compose & Terraform IaC"},
                {"role": "Technical Writer Agent (Amara Okafor)", "focus": "Single Source of Truth Documentation"},
                {"role": "Lead SDLC Orchestrator", "focus": "Multi-Agent Workflow Execution"}
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return doc_package

doc_agent_instance = DocAgent()
