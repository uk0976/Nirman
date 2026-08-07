from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

SYSTEM_ARCHITECT_SYSTEM_PROMPT = """You are Elena Rostova, Principal System Architect at Nirman.
Your persona is a Principal Software Architect responsible for detailed system design, Clean Architecture 4-layer boundaries, and software design patterns.

Rules:
1. You DO NOT write production code or SQL DDL scripts.
2. You transform Solution Architecture Document (SAD v1.0) blueprints into a detailed engineering System Design Document (DSDD v1.0).
3. You synthesize 4-Layer Clean Architecture specifications (Domain, Application, Infrastructure, Presentation), module public interfaces, sequence/interaction diagrams, design pattern mappings (Repository, Factory, Strategy, Observer), and standardized error handling contracts.
"""

class SystemArchitectAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-sysarch-elena",
            name="Elena Rostova",
            role="Principal System Architect",
            description="Designs detailed system architecture, Clean Architecture 4-layer topology, service interactions, design pattern mappings, and error handling contracts.",
            system_prompt=SYSTEM_ARCHITECT_SYSTEM_PROMPT,
            capabilities=[AgentCapability.SYSTEM_ARCHITECTURE],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "DETAILED_DESIGN_PLANNING_COMPLETE",
            "clean_architecture_layers": ["Domain Layer", "Application Layer", "Infrastructure Layer", "Presentation Layer"],
            "decoupled_modules_count": 13
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        system_design_package = {
            "project_name": project_name,
            "dsdd_version": "v1.0",
            "executive_summary": "Detailed System Design Document (DSDD v1.0) synthesized from Solution Architecture #SAD-001. Formulated in accordance with Clean Architecture principles.",
            "clean_architecture": {
                "domain_layer": {
                    "purpose": "Contains pure business logic, entities, value objects, and domain events. Zero external framework dependencies.",
                    "entities": ["Project", "Agent", "WorkflowExecution", "WorkflowStep", "Artifact", "User", "Session"],
                    "value_objects": ["Slug", "Email", "PasswordHash", "SDLCPhase"],
                    "domain_events": ["ProjectCreatedEvent", "TaskAssignedEvent", "ArtifactApprovedEvent"]
                },
                "application_layer": {
                    "purpose": "Contains application use cases, DTOs, and ports/interfaces. Orchestrates domain logic.",
                    "use_cases": [
                        "CreateProjectUseCase",
                        "ExecuteSDLCPhaseUseCase",
                        "ApproveHumanGateUseCase",
                        "DispatchInterAgentMessageUseCase"
                    ],
                    "dtos": ["ProjectCreateDTO", "ProjectResponseDTO", "ApprovalActionDTO"]
                },
                "infrastructure_layer": {
                    "purpose": "Implements interfaces for persistence, external LLM APIs, Redis cache, and messaging.",
                    "adapters": [
                        "AsyncSQLAlchemyProjectRepository",
                        "RedisSessionCacheAdapter",
                        "GeminiLLMProviderAdapter",
                        "PubSubEventBusAdapter"
                    ]
                },
                "presentation_layer": {
                    "purpose": "FastAPI Async Controllers & Next.js React 19 UI Controllers. Handles HTTP request/response validation.",
                    "controllers": ["ProjectController", "AuthController", "WarRoomController", "CEOController"]
                }
            },
            "design_patterns": [
                {
                    "pattern": "Repository Pattern",
                    "location": "Infrastructure / Persistence",
                    "justification": "Decouples domain use cases from SQLAlchemy ORM data access."
                },
                {
                    "pattern": "Strategy Pattern",
                    "location": "Infrastructure / LLM Providers",
                    "justification": "Allows seamless swapping between Google Gemini, OpenAI GPT-4o, and Anthropic Claude."
                },
                {
                    "pattern": "Observer / Event Bus Pattern",
                    "location": "Core / Communication Engine",
                    "justification": "Enables asynchronous inter-agent messaging and task handoffs."
                },
                {
                    "pattern": "Factory Pattern",
                    "location": "Core / Agent Framework",
                    "justification": "Instantiates specialized AI agents dynamically based on registered capabilities."
                }
            ],
            "sequence_flow": [
                {"step": 1, "from": "Client Browser (Next.js)", "to": "API Gateway (FastAPI)", "action": "POST /api/v1/projects (ProjectCreateDTO)"},
                {"step": 2, "from": "API Gateway", "to": "CreateProjectUseCase", "action": "Invoke use case with validated payload"},
                {"step": 3, "from": "CreateProjectUseCase", "to": "Project Domain Entity", "action": "Instantiate Project entity & publish ProjectCreatedEvent"},
                {"step": 4, "from": "CreateProjectUseCase", "to": "AsyncSQLAlchemyProjectRepository", "action": "Persist entity to PostgreSQL 3NF table"},
                {"step": 5, "from": "PubSubEventBus", "to": "CEOAgent", "action": "Dispatch task to CEO Agent for strategic discovery"}
            ],
            "error_handling_contract": {
                "validation_error": {"code": 422, "type": "VALIDATION_ERROR", "message": "Field 'name' is required."},
                "auth_error": {"code": 401, "type": "UNAUTHORIZED", "message": "Invalid or expired JWT token."},
                "business_error": {"code": 400, "type": "BUSINESS_RULE_VIOLATION", "message": "Cannot proceed to Phase 7 until Phase 6 PRD is approved."},
                "system_error": {"code": 500, "type": "INTERNAL_SERVER_ERROR", "message": "Database connection timeout."}
            },
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return system_design_package

system_architect_agent_instance = SystemArchitectAgent()
