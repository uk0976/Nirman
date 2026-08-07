from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

PM_SYSTEM_PROMPT = """You are Sarah Lin, Senior Product Manager at Nirman.
Your persona is a Senior Product Manager at top tech companies (Google, Microsoft, Atlassian, Stripe).
Your sole responsibility is Product Strategy, Feature Prioritization, and Roadmap Execution Planning.

Rules:
1. You DO NOT write code, design UIs, or create system architecture diagrams.
2. You transform BA functional requirements into a structured Product Execution Strategy.
3. You synthesize MoSCoW Feature Prioritization, 4-Phase Product Roadmaps, Epics & Backlog breakdowns, Sprint 1 Capacity Plans, Release Strategies, and Risk Registers.
"""

class PMAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-pm-sarah",
            name="Sarah Lin",
            role="Senior Product Manager",
            description="Manages product strategy, feature prioritization (MoSCoW/RICE), 4-phase product roadmaps, epics backlog, and release planning.",
            system_prompt=PM_SYSTEM_PROMPT,
            capabilities=[AgentCapability.PRODUCT_MANAGEMENT],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "ROADMAP_PLANNING_COMPLETE",
            "prioritization_framework": "MoSCoW + RICE Scoring",
            "estimated_sprint_velocity": 34
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        roadmap_package = {
            "project_name": project_name,
            "product_strategy_version": "v1.0",
            "executive_summary": "Product Strategy and Release Roadmap synthesized from BA Requirements Package #BA-001.",
            "moscow_prioritization": {
                "must_have": [
                    "Multi-Tenant Project Dashboard & Core Layout",
                    "Autonomous 14-Agent DAG Task Engine",
                    "JWT Auth, Google & GitHub OAuth2 SSO, 2FA TOTP",
                    "Human Approval Gates for DB & Code Deployments"
                ],
                "should_have": [
                    "Cmd+K Universal Command Palette",
                    "Real-Time Inter-Agent Pub/Sub Message Bus",
                    "Live Execution Log Console"
                ],
                "could_have": [
                    "AI Voice Coding Assistant",
                    "Custom Dark/Light Theme Builder"
                ],
                "wont_have_current": [
                    "Legacy Monolith Automatic Code Migrator",
                    "Third-Party Jira Sync Plugin"
                ]
            },
            "roadmap_phases": [
                {
                    "phase": "Phase 1: Foundation & Authentication",
                    "duration": "Sprint 1 - 2",
                    "goals": "Core Next.js 15 App Shell, FastAPI Async Backend, JWT SSO Auth.",
                    "deliverables": ["Login/Register Pages", "Sidebar Navigation", "User Onboarding Wizard"],
                    "status": "COMPLETED"
                },
                {
                    "phase": "Phase 2: AI Workspace & Project Management",
                    "duration": "Sprint 3 - 4",
                    "goals": "3-Pane Command Center, 18-Tab Project Hub, Multi-View Dashboards.",
                    "deliverables": ["Workflow Canvas", "Kanban/Timeline Views", "File Explorer"],
                    "status": "IN_PROGRESS"
                },
                {
                    "phase": "Phase 3: Multi-Agent Infrastructure",
                    "duration": "Sprint 5 - 6",
                    "goals": "BaseAgent Framework, AgentRegistry, Pub/Sub Event Bus.",
                    "deliverables": ["Agent Status Roster", "Tool Matrix", "Observability Dashboard"],
                    "status": "READY"
                },
                {
                    "phase": "Phase 4: Production Rollout & Monitoring",
                    "duration": "Sprint 7 - 8",
                    "goals": "Docker Compose Stack, Nginx SSL Proxy, Prometheus Monitoring.",
                    "deliverables": ["Production Container Image", "SOC2 Compliance Specs"],
                    "status": "PLANNED"
                }
            ],
            "epics": [
                {"epic_id": "EPIC-001", "name": "Authentication & Onboarding", "story_count": 5, "status": "COMPLETED"},
                {"epic_id": "EPIC-002", "name": "Core Workspace & Navigation", "story_count": 8, "status": "COMPLETED"},
                {"epic_id": "EPIC-003", "name": "Project Management System", "story_count": 12, "status": "IN_PROGRESS"},
                {"epic_id": "EPIC-004", "name": "AI Workspace Command Center", "story_count": 10, "status": "IN_PROGRESS"},
                {"epic_id": "EPIC-005", "name": "Multi-Agent Framework Core", "story_count": 10, "status": "READY"}
            ],
            "sprint_1_plan": {
                "sprint_number": 1,
                "sprint_goal": "Establish Core App Shell, Auth Suite, and Base Dashboard.",
                "capacity_points": 34,
                "stories_assigned": ["US-001 (5 pts)", "US-002 (3 pts)", "US-003 (8 pts)"],
                "definition_of_done": "Code merged to main, zero lints, 100% Next.js build pass."
            },
            "release_strategy": {
                "current_release": "v1.0-alpha",
                "milestones": ["Alpha (Internal)", "Private Beta (Design Partners)", "v1.0 GA Production"],
                "target_launch_date": "2026-09-01"
            },
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return roadmap_package

pm_agent_instance = PMAgent()
