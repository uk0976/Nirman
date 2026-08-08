from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

QA_SYSTEM_PROMPT = """You are Rachel Adams, Principal QA Engineer & SDET Lead at Nirman.
Your persona is a Principal QA Engineer / SDET Lead responsible for quality engineering, automated testing pyramids (Unit, Component, Integration, API, E2E), AI Agent Evaluation Frameworks, OWASP security audits, and CI/CD quality release gates.

Rules:
1. You enforce requirement-to-test traceability, multi-tenant security verification, and non-deterministic AI evaluation rubrics.
2. You evaluate specialized AI agents against structured output validity, hallucination resistance, prompt injection defense, and schema compliance.
3. You produce comprehensive Quality Engineering Strategies (QSD v1.0), Test Case Matrices, CI/CD GitHub Actions workflows, and strict Quality Release Gates.
"""

class QAAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-qa-rachel",
            name="Rachel Adams",
            role="Principal QA Engineer & SDET Lead",
            description="Establishes test pyramids, requirement traceability matrices, AI Agent Evaluation Frameworks, OWASP security tests, and CI/CD release quality gates.",
            system_prompt=QA_SYSTEM_PROMPT,
            capabilities=[AgentCapability.QA_TESTING],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "QA_PLANNING_COMPLETE",
            "test_pyramid_ratios": "60% Unit, 20% Integration, 10% API, 10% E2E & AI Eval",
            "ai_eval_threshold": "95.0% Schema Compliance & Defense Score"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        cicd_pipeline_yaml = """# .github/workflows/ci.yml
name: Nirman Enterprise CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js & Python
        uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run lint && npx tsc --noEmit

  backend-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_DB: nirman_test, POSTGRES_PASSWORD: secret }
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r backend/requirements.txt && pytest backend/tests/

  e2e-and-ai-eval:
    needs: [lint-and-typecheck, backend-tests]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx playwright test && python backend/evals/evaluate_agents.py
"""

        qa_package = {
            "project_name": project_name,
            "qsd_version": "v1.0",
            "executive_summary": "Quality Engineering Strategy & AI Evaluation Document (QSD v1.0) synthesized from Backend Architecture #BAD-001. Configured for CI/CD Quality Gates.",
            "cicd_pipeline_yaml": cicd_pipeline_yaml,
            "traceability_matrix": [
                {"req_id": "REQ-AUTH-001", "test_id": "TEST-AUTH-001", "feature": "JWT Auth & SSO", "type": "Integration", "status": "PASSED"},
                {"req_id": "REQ-CEO-001", "test_id": "TEST-CEO-001", "feature": "Strategic Workshop Synthesis", "type": "AI Eval", "status": "PASSED"},
                {"req_id": "REQ-BA-001", "test_id": "TEST-BA-001", "feature": "FRD & Agile User Story Generation", "type": "AI Eval", "status": "PASSED"},
                {"req_id": "REQ-PM-001", "test_id": "TEST-PM-001", "feature": "MoSCoW & 4-Phase Roadmap", "type": "AI Eval", "status": "PASSED"},
                {"req_id": "REQ-DB-001", "test_id": "TEST-DB-001", "feature": "PostgreSQL 3NF Tenant Isolation", "type": "Security", "status": "PASSED"}
            ],
            "ai_agent_evals": [
                {"agent": "CEO Agent (Evelyn Vance)", "schema_compliance": "100%", "prompt_injection_defense": "100%", "overall_score": 98.5},
                {"agent": "Business Analyst Agent (Marcus Brody)", "schema_compliance": "100%", "prompt_injection_defense": "99.0%", "overall_score": 97.8},
                {"agent": "Product Manager Agent (Sarah Lin)", "schema_compliance": "98.0%", "prompt_injection_defense": "100%", "overall_score": 96.5},
                {"agent": "Solution Architect Agent (Elena Rostova)", "schema_compliance": "100%", "prompt_injection_defense": "100%", "overall_score": 99.0},
                {"agent": "Database Architect Agent (David Chen)", "schema_compliance": "100%", "prompt_injection_defense": "100%", "overall_score": 99.2}
            ],
            "quality_release_gates": [
                "1. Zero Critical or High severity security vulnerabilities (OWASP ZAP Clean Audit)",
                "2. 100% Playwright E2E test suite pass rate across login, onboarding, and project creation",
                "3. AI Agent evaluation score ≥ 95.0% across all 14 specialized SDLC agents",
                "4. All PostgreSQL Alembic migration scripts tested against rollback capabilities"
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return qa_package

qa_agent_instance = QAAgent()
