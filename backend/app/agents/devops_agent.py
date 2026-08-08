from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

DEVOPS_SYSTEM_PROMPT = """You are Marcus Vance, Principal DevOps & Cloud Platform Engineer at Nirman.
Your persona is a Principal DevOps / Platform / Cloud Engineer operating a large-scale production SaaS platform using Docker Compose, Kubernetes, Terraform IaC, AWS/GCP, Prometheus, Grafana, and Nginx SSL Proxies.

Rules:
1. You enforce multi-stage Docker builds, non-root container users, resource limits, and zero-downtime rolling deployments.
2. You design Infrastructure-as-Code (Terraform main.tf), full-stack Docker Compose manifests, Prometheus metrics, Grafana alert rules, and Point-In-Time-Recovery (PITR) disaster recovery runbooks.
3. You produce scalable, reproducible, production-ready infrastructure specifications without relying on undocumented manual configurations.
"""

class DevOpsAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-devops-marcus",
            name="Marcus Vance",
            role="Principal DevOps & Cloud Platform Engineer",
            description="Designs containerization, Docker Compose manifests, Terraform IaC blueprints, Prometheus/Grafana observability, and disaster recovery runbooks.",
            system_prompt=DEVOPS_SYSTEM_PROMPT,
            capabilities=[AgentCapability.DEVOPS_DEPLOYMENT],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "DEVOPS_PLANNING_COMPLETE",
            "containerization": "Multi-stage Docker (Next.js 15 + FastAPI)",
            "iac_tool": "Terraform 1.6+",
            "rpo_rto_targets": "RPO < 5 mins, RTO < 15 mins (PostgreSQL PITR)"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        docker_compose_yaml = """# ========================================================
# NIRMAN AI PLATFORM — PRODUCTION DOCKER COMPOSE STACK
# ========================================================
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://nirman_user:secret_pass@postgres:5432/nirman_db
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: nirman_db
      POSTGRES_USER: nirman_user
      POSTGRES_PASSWORD: secret_pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

volumes:
  postgres_data:
"""

        devops_package = {
            "project_name": project_name,
            "iad_version": "v1.0",
            "executive_summary": "Infrastructure Architecture Document (IAD v1.0) synthesized from Security Audit #SEC-SAD-001. Configured for zero-downtime production deployment.",
            "docker_compose_yaml": docker_compose_yaml,
            "terraform_blueprint": {
                "cloud_provider": "AWS (Amazon Web Services)",
                "compute_service": "AWS ECS Fargate (Serverless Container Orchestration)",
                "database_service": "AWS RDS PostgreSQL 16 (Multi-AZ Deployment with Read Replicas)",
                "cache_service": "AWS ElastiCache Redis 7",
                "object_storage": "AWS S3 Private Buckets with KMS Server-Side Encryption"
            },
            "observability_matrix": [
                {"metric": "HTTP Request Latency", "tool": "Prometheus / Grafana", "threshold": "P99 < 150ms", "alert_channel": "Slack #alerts-prod"},
                {"metric": "HTTP 5xx Error Rate", "tool": "Prometheus Alertmanager", "threshold": "> 1.0% in 5 mins", "alert_channel": "PagerDuty Critical"},
                {"metric": "PostgreSQL Connections", "tool": "pg_stat_activity / Grafana", "threshold": "> 85% Pool Usage", "alert_channel": "Slack #alerts-db"},
                {"metric": "AI Agent Token Spending", "tool": "Nirman Observability Engine", "threshold": "> $500/hour", "alert_channel": "Email Executive Admin"}
            ],
            "disaster_recovery_runbook": {
                "rpo": "5 minutes (Continuous PostgreSQL WAL Archiving to S3)",
                "rto": "15 minutes (Automated Terraform failover script)",
                "backup_retention": "30 days Daily Backups + 12 months Monthly Snapshots",
                "rollback_procedure": "Zero-downtime rolling rollback to previous Docker image tag via ECS Deployment Controller"
            },
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return devops_package

devops_agent_instance = DevOpsAgent()
