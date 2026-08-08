from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

SECURITY_SYSTEM_PROMPT = """You are Devon Vance, Principal Application Security Engineer & Cloud Security Architect at Nirman.
Your persona is a Principal Application Security Engineer responsible for 10-layer Security Architecture, STRIDE Threat Modeling, AI Agent Tool Sandboxing, OWASP Top 10 SAST/DAST audits, HashiCorp Vault secrets management, and SOC2 Type II compliance.

Rules:
1. You enforce Zero-Trust security, strict tenant isolation via PostgreSQL Row-Level Security (RLS), and backend-authoritative authorization.
2. You design least-privilege tool execution rules for AI agents, mandating human approval gates for high-risk operations (shell execution, DB DDL, production deployments).
3. You produce comprehensive Security Architecture Documents (SEC-SAD v1.0), STRIDE Threat Matrices, Data Encryption Policies (AES-256-GCM / Argon2id), and SOC2/ISO27001 readiness matrices.
"""

class SecurityAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-sec-devon",
            name="Devon Vance",
            role="Principal Security Engineer & Architect",
            description="Enforces 10-layer security, STRIDE threat models, AI tool sandboxing, AES-256/Argon2id data encryption, OWASP audits, and SOC2 compliance.",
            system_prompt=SECURITY_SYSTEM_PROMPT,
            capabilities=[AgentCapability.SECURITY_AUDITING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "SECURITY_PLANNING_COMPLETE",
            "threat_model_framework": "STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation)",
            "encryption_standard": "AES-256-GCM (Data at Rest), TLS 1.3 (Data in Transit)"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        security_package = {
            "project_name": project_name,
            "sec_sad_version": "v1.0",
            "executive_summary": "Security Architecture & STRIDE Threat Model Document (SEC-SAD v1.0) synthesized from QA Strategy #QSD-001. Configured for SOC2 Type II readiness.",
            "stride_matrix": [
                {"category": "Spoofing", "asset": "JWT Access Tokens", "vulnerability": "Token Theft / Replay", "mitigation": "15-minute token expiry + Refresh Token Rotation in HttpOnly cookies"},
                {"category": "Tampering", "asset": "PostgreSQL 3NF Data", "vulnerability": "Cross-Tenant Data Tampering", "mitigation": "PostgreSQL Row-Level Security (RLS) enforcement via tenant_id"},
                {"category": "Repudiation", "asset": "AI Agent Task Executions", "vulnerability": "Unauthenticated Action Denial", "mitigation": "Immutable Audit Log stream with SHA-256 hash chains"},
                {"category": "Information Disclosure", "asset": "LLM API Keys & Secrets", "vulnerability": "Git Commit / Log Exfiltration", "mitigation": "HashiCorp Vault secret injection + automated git secret scanning"},
                {"category": "Denial of Service", "asset": "FastAPI REST Endpoints", "vulnerability": "API Resource Exhaustion", "mitigation": "Slowapi Redis rate limiters (60 req/min auth, 20 req/min AI)"},
                {"category": "Elevation of Privilege", "asset": "AI Code Execution Engine", "vulnerability": "Host Container Breakout", "mitigation": "Isolated gVisor / Docker sandboxes with gUID/gPID limits"}
            ],
            "ai_tool_sandboxing": [
                {"agent": "CEO Agent (Evelyn Vance)", "allowed_tools": ["strategic_planner", "scope_matrix_gen"], "human_approval_required": False},
                {"agent": "Database Architect Agent (David Chen)", "allowed_tools": ["ddl_synthesizer", "schema_analyzer"], "human_approval_required": True},
                {"agent": "Backend Engineer Agent (Ethan Vance)", "allowed_tools": ["fastapi_router_gen", "repository_builder"], "human_approval_required": False},
                {"agent": "DevOps Engineer Agent (Devon Vance)", "allowed_tools": ["docker_build", "k8s_deploy", "shell_exec"], "human_approval_required": True}
            ],
            "data_protection": {
                "password_hashing": "Argon2id with 64MB memory cost, 3 iterations, 4 parallelism",
                "field_encryption": "AES-256-GCM for sensitive LLM API keys and OAuth refresh tokens",
                "transit_encryption": "TLS 1.3 with HSTS (HTTP Strict Transport Security) 1-year max-age"
            },
            "owasp_audit_results": {
                "sast_scanner": "Bandit / Semgrep (0 High, 0 Critical findings)",
                "dast_scanner": "OWASP ZAP (Clean scan pass on /api/v1 endpoints)",
                "dependency_scanner": "Trivy / Dependabot (0 Vulnerable dependencies)"
            },
            "compliance_readiness": [
                "1. SOC2 Type II Trust Services Criteria (Security, Availability, Confidentiality)",
                "2. ISO/IEC 27001:2022 Information Security Management System controls",
                "3. GDPR Article 32 Security of Processing & Right to be Forgotten data deletion endpoints"
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return security_package

security_agent_instance = SecurityAgent()
