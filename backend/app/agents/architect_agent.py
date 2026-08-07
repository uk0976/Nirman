from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

ARCHITECT_SYSTEM_PROMPT = """You are Elena Rostova, Principal Solution Architect at Nirman.
Your persona is a Principal Solution Architect at Microsoft, Amazon, Google, or Netflix.
Your sole responsibility is High-Level System Architecture, Component Topology Design, and Architecture Decision Records (ADRs).

Rules:
1. You DO NOT write production code or database DDL scripts.
2. You transform Product Manager roadmaps into a scalable, secure, and maintainable Solution Architecture Blueprint (SAD v1.0).
3. You synthesize Architecture Decision Records (ADRs), Component Topology Diagrams, Scalability & Security Architecture, and Technology Stack Justification Matrices.
"""

class ArchitectAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-arch-elena",
            name="Elena Rostova",
            role="Principal Solution Architect",
            description="Designs high-level system architecture, ADR records, component topology diagrams, security blueprints, and technology stack justifications.",
            system_prompt=ARCHITECT_SYSTEM_PROMPT,
            capabilities=[AgentCapability.SYSTEM_ARCHITECTURE],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "ARCHITECTURE_PLANNING_COMPLETE",
            "pattern_selected": "Clean Architecture Modular Monolith",
            "tradeoff_analysis": "Modular Monolith chosen over Microservices for initial speed, zero network latency between modules, and seamless future microservices extraction."
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        architecture_package = {
            "project_name": project_name,
            "sad_version": "v1.0",
            "executive_summary": "Solution Architecture Document synthesized from PM Roadmap #PM-001. Formulated as a Clean Architecture Modular Monolith.",
            "adrs": [
                {
                    "adr_id": "ADR-001",
                    "title": "Clean Architecture Modular Monolith Pattern",
                    "status": "ACCEPTED",
                    "context": "Need high engineering velocity with clear component boundaries for 14 AI agents.",
                    "decision": "Adopt a Modular Monolith with decoupled domain services before considering distributed microservices.",
                    "consequences": "Simplified deployment, zero IPC latency, easy refactoring."
                },
                {
                    "adr_id": "ADR-002",
                    "title": "Next.js 15 App Router & React 19 Frontend",
                    "status": "ACCEPTED",
                    "context": "Requires fast initial page loads, SEO optimization, and rich interactive glassmorphism UI.",
                    "decision": "Use Next.js 15 App Router with Server Components and Tailwind CSS.",
                    "consequences": "High performance, static site generation, responsive UI."
                },
                {
                    "adr_id": "ADR-003",
                    "title": "FastAPI Async Python Backend & Pydantic v2",
                    "status": "ACCEPTED",
                    "context": "Requires high-concurrency async non-blocking IO for LLM API streaming and DAG execution.",
                    "decision": "Use FastAPI (Python 3.11+) with Async SQLAlchemy and Pydantic v2 schemas.",
                    "consequences": "Automatic OpenAPI docs, async performance rivaling Node.js/Go."
                },
                {
                    "adr_id": "ADR-004",
                    "title": "PostgreSQL 3NF Schema & Redis Caching",
                    "status": "ACCEPTED",
                    "context": "Relational data integrity is mandatory for multi-tenant projects and task execution history.",
                    "decision": "Use PostgreSQL 16 normalized to 3NF as primary store, Redis for session cache.",
                    "consequences": "ACID compliance, zero data redundancy, high read throughput."
                },
                {
                    "adr_id": "ADR-005",
                    "title": "LangGraph State Machine Orchestration Engine",
                    "status": "ACCEPTED",
                    "context": "Need deterministic state machine execution for 14 specialized AI agents across 20 SDLC phases.",
                    "decision": "Use LangGraph state graphs with human approval checkpoint hooks.",
                    "consequences": "Full trace capability, pause/resume support, state recovery."
                }
            ],
            "component_topology": [
                {"component": "API Gateway & Nginx Proxy", "responsibility": "TLS Termination, Rate Limiting, CORS, Static Asset Routing"},
                {"component": "Auth & Security Service", "responsibility": "JWT Issuance, Google/GitHub OAuth2, 2FA TOTP, RBAC Authorization"},
                {"component": "Project Management Engine", "responsibility": "Multi-Tenant Project Workspaces, SDLC Phase Tracking"},
                {"component": "AI Workspace Command Center", "responsibility": "3-Pane Layout, Real-Time Inter-Agent Pub/Sub Message Bus"},
                {"component": "Multi-Agent Framework Core", "responsibility": "BaseAgent Lifecycle State Machine, AgentRegistry, Tool Execution"},
                {"component": "Persistence & Cache Layer", "responsibility": "PostgreSQL 3NF Relational Store, Redis Session State, Vector Store RAG"}
            ],
            "security_architecture": {
                "authentication": "JWT Tokens with 15m expiry + Refresh Tokens",
                "authorization": "Role-Based Access Control (RBAC: Owner, Admin, Developer, Viewer)",
                "data_protection": "TLS 1.3 in transit, AES-256 at rest, bcrypt password hashing",
                "compliance": "OWASP Top 10 Guidelines, SOC2 Type II Readiness"
            },
            "scalability_strategy": {
                "horizontal_scaling": "Stateless FastAPI container pods behind Nginx load balancer",
                "caching_policy": "Redis LRU cache for active project contexts and token sessions",
                "async_queues": "Celery / Redis background worker pools for long-running AI code gen tasks"
            },
            "tech_stack_justification": [
                {"layer": "Frontend", "tech": "Next.js 15, React 19, Tailwind CSS, TypeScript", "justification": "Premium SSR performance, typed UI components"},
                {"layer": "Backend", "tech": "FastAPI, Python 3.11+, Pydantic v2", "justification": "Async non-blocking performance, AI ecosystem integration"},
                {"layer": "Database", "tech": "PostgreSQL 16, Redis 7", "justification": "ACID compliance 3NF schema, high-speed session cache"}
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return architecture_package

architect_agent_instance = ArchitectAgent()
