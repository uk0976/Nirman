from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

CEO_SYSTEM_PROMPT = """You are Evelyn Vance, Chief Executive Officer of Nirman, an autonomous AI software engineering platform.
Your persona is a seasoned startup founder, CTO, and Product Executive combined.
Your sole responsibility is Strategic Planning & Project Initiation.

Rules:
1. You DO NOT write code, design UIs, model database schemas, or write API specs.
2. You conduct structured discovery workshops to clarify ambiguous requirements, business goals, and target audiences.
3. You synthesize high-level Strategic Execution Plans containing Executive Summaries, Vision/Mission, Problem Statements, Scope Matrices, Feasibility Scores, and SDLC Milestones.
4. You delegate tasks to downstream specialized agents (Business Analyst, Product Manager, System Architect, DB Architect, etc.).
"""

class CEOAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-ceo-evelyn",
            name="Evelyn Vance",
            role="Chief Executive Officer",
            description="Leads strategic project discovery, defines business goals, establishes product scope, and delegates execution plans to specialized AI agents.",
            system_prompt=CEO_SYSTEM_PROMPT,
            capabilities=[AgentCapability.BUSINESS_ANALYSIS, AgentCapability.PRODUCT_MANAGEMENT],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        idea = task.input_payload.get("idea", "New Enterprise Software Platform")
        
        return {
            "agent_id": self.agent_id,
            "status": "PLANNING_COMPLETE",
            "discovery_questions": [
                "What is the primary business problem this software solves?",
                "Who are the core target users and industry personas?",
                "What are the critical MVP features vs nice-to-have items?",
                "What are the compliance, security, or budget constraints?"
            ],
            "estimated_complexity_score": 78,
            "sdlc_strategy": "Clean Architecture Modular Monolith with Iterative 20-Phase SDLC"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        idea = task.input_payload.get("idea", "Nirman AI SaaS Core Platform")
        
        plan_artifact = {
            "project_name": task.input_payload.get("project_name", "Nirman SaaS Core"),
            "executive_summary": f"Strategic initiation plan for '{idea}'. Enterprise platform designed for high scale, security, and AI agent orchestration.",
            "vision_statement": "To transform software development into an autonomous, AI-driven company collaboration model.",
            "mission_statement": "Deliver production-ready enterprise software applications through deterministic 20-phase SDLC execution.",
            "problem_statement": "Traditional software engineering is fragmented, slow, and expensive. Nirman automates end-to-end SDLC via specialized AI agents.",
            "business_goals": [
                "Achieve 10x faster time-to-market for enterprise SaaS applications.",
                "Ensure 100% compliance with Clean Architecture and 3NF database standards.",
                "Reduce software development overhead by 80%."
            ],
            "scope_definition": {
                "in_scope": [
                    "Full-stack Next.js 15 App Router frontend",
                    "FastAPI async backend services",
                    "PostgreSQL 3NF schema & migrations",
                    "JWT Auth, 2FA, and RBAC security"
                ],
                "future_scope": ["Multi-region Kubernetes deployment", "Real-time AI voice coding assistant"],
                "out_of_scope": ["Legacy monolith migration", "Manual QA testing workflows"]
            },
            "feasibility_score": 92,
            "complexity_index": 78,
            "delegation_plan": [
                {"agent": "Business Analyst (Marcus Brody)", "task": "Synthesize Market Analysis & Persona Specifications"},
                {"agent": "Product Manager (Sarah Lin)", "task": "Draft PRD & SRS Specifications with 45 User Stories"},
                {"agent": "System Architect (Elena Rostova)", "task": "Design Clean Architecture Modular Monolith Topology"},
                {"agent": "Database Architect (David Chen)", "task": "Model PostgreSQL 3NF Schema & Alembic Migrations"},
                {"agent": "Security Auditor (Alex Mercer)", "task": "Conduct OWASP Top 10 Audit & JWT Security Policy"}
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return plan_artifact

ceo_agent_instance = CEOAgent()
