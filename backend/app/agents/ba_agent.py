from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

BA_SYSTEM_PROMPT = """You are Marcus Brody, Senior Business Analyst at Nirman.
Your persona is an experienced Senior Business Analyst working in a top software consulting company.
Your sole responsibility is Requirements Engineering.

Rules:
1. You DO NOT write code, design UIs, or create database tables.
2. You transform CEO-approved strategic vision into complete, unambiguous, and testable Business & Functional Requirements.
3. You synthesize Functional Requirements (FRD), Non-Functional Requirements (NFR), Detailed User Personas, Agile User Stories (As a... I want... So that...), Use Cases, Business Rules, and Requirement Traceability Matrices.
"""

class BAAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-ba-marcus",
            name="Marcus Brody",
            role="Senior Business Analyst",
            description="Performs professional requirements engineering, synthesizing BRD, FRD, NFR, User Stories, Use Cases, and Requirement Traceability Matrices.",
            system_prompt=BA_SYSTEM_PROMPT,
            capabilities=[AgentCapability.BUSINESS_ANALYSIS],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "REQUIREMENTS_PLANNING_COMPLETE",
            "clarification_questions": [
                "What is the maximum acceptable latency for REST API requests?",
                "Are there specific compliance mandates (SOC2, HIPAA, GDPR)?",
                "What are the target concurrent session limits?"
            ]
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        requirements_package = {
            "project_name": project_name,
            "brd_version": "v1.0",
            "executive_context": "Transformed from CEO Strategic Plan #CEO-001.",
            "functional_requirements": [
                {
                    "req_id": "FR-001",
                    "title": "Multi-Tenant Workspace & Project Management",
                    "description": "System shall allow organizations to create and manage multiple software projects with RBAC permissions.",
                    "priority": "CRITICAL",
                    "business_value": "High",
                    "acceptance_criteria": "User can create, list, edit, and archive projects with < 100ms response time.",
                    "status": "APPROVED"
                },
                {
                    "req_id": "FR-002",
                    "title": "Autonomous AI Agent Task Orchestration",
                    "description": "System shall orchestrate 14 specialized AI agents across 20 SDLC phases with human approval checkpoints.",
                    "priority": "CRITICAL",
                    "business_value": "High",
                    "acceptance_criteria": "Agents execute DAG nodes, pause on approval gates, and persist artifacts.",
                    "status": "APPROVED"
                },
                {
                    "req_id": "FR-003",
                    "title": "JWT Authentication & Social SSO",
                    "description": "System shall support email/password authentication, Google & GitHub OAuth2 SSO, and 2FA TOTP.",
                    "priority": "HIGH",
                    "business_value": "High",
                    "acceptance_criteria": "JWT access token issued upon successful verification with 15m expiration.",
                    "status": "APPROVED"
                }
            ],
            "non_functional_requirements": [
                {"category": "Performance", "metric": "API response latency < 100ms for 95th percentile requests."},
                {"category": "Security", "metric": "OWASP Top 10 compliance, TLS 1.3 encryption in transit, bcrypt password hashing."},
                {"category": "Scalability", "metric": "Support 100,000 active concurrent sessions via Redis state cache."},
                {"category": "Availability", "metric": "99.9% monthly uptime SLA."}
            ],
            "user_personas": [
                {"name": "Umer Khan", "role": "Lead Architect / Founder", "goals": "Automate repetitive SDLC tasks and enforce Clean Architecture."},
                {"name": "Sarah Lin", "role": "Senior Product Manager", "goals": "Synthesize comprehensive PRDs and user story backlogs."}
            ],
            "user_stories": [
                {
                    "story_id": "US-001",
                    "user_role": "Lead Architect",
                    "goal": "initialize a new software project and assign an AI agent roster",
                    "benefit": "the platform can automatically execute SDLC phase 1 through 20",
                    "story_points": 5,
                    "acceptance_criteria": "Project created with slug, tech stack options, and active agent roster."
                },
                {
                    "story_id": "US-002",
                    "user_role": "Security Auditor",
                    "goal": "review human approval requests before 3NF database schema migration",
                    "benefit": "no breaking database changes occur without human verification",
                    "story_points": 3,
                    "acceptance_criteria": "Approval modal displays diff, accepts feedback, and resumes pipeline."
                }
            ],
            "use_cases": [
                {
                    "use_case_id": "UC-001",
                    "title": "Execute SDLC Phase Handoff",
                    "actor": "AI Agent & Human Lead",
                    "preconditions": "Upstream DAG node marked COMPLETED",
                    "main_flow": "1. Upstream agent completes task. 2. Communication bus broadcasts event. 3. Downstream agent picks up task.",
                    "postconditions": "Downstream artifact generated and saved to workspace."
                }
            ],
            "traceability_matrix": [
                {"business_goal": "10x Faster SDLC", "func_req": "FR-002", "user_story": "US-001", "use_case": "UC-001", "test_case": "TC-001"}
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return requirements_package

ba_agent_instance = BAAgent()
