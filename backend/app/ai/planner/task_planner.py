import json
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

class PlannedSubtask(BaseModel):
    task_id: str
    title: str
    description: str
    assigned_role: str  # CEO, PM, Architect, Frontend, Backend, Database, QA, Security, DevOps, Documentation
    dependencies: List[str] = Field(default_factory=list)
    priority: str = "HIGH"
    expected_output_type: str = "code" # code, markdown, sql, yaml, schema

class ExecutionPlan(BaseModel):
    workflow_id: str
    project_id: str
    summary: str
    tasks: List[PlannedSubtask]
    parallel_batches: List[List[str]] = Field(default_factory=list)

class TaskPlanner:
    """
    Decomposes user requirements into a structured DAG of subtasks
    and calculates topological execution order and parallel batches.
    """
    
    def __init__(self):
        pass

    async def plan_execution(self, prompt: str, project_id: str, workflow_id: str) -> ExecutionPlan:
        logger.info(f"TaskPlanner generating DAG execution plan for workflow {workflow_id}...")

        # Standard multi-agent engineering workflow DAG
        tasks = [
            PlannedSubtask(
                task_id="task-1-req",
                title="Requirement & Scope Analysis",
                description="Extract functional requirement specs and API boundaries from user prompt.",
                assigned_role="Product Manager",
                dependencies=[],
                expected_output_type="markdown",
            ),
            PlannedSubtask(
                task_id="task-2-arch",
                title="System Architecture Blueprint",
                description="Design domain models, router architecture, and system component diagrams.",
                assigned_role="Software Architect",
                dependencies=["task-1-req"],
                expected_output_type="markdown",
            ),
            PlannedSubtask(
                task_id="task-3-db",
                title="PostgreSQL Database Schema",
                description="Write SQL DDL migrations and indices based on domain architecture.",
                assigned_role="Database Engineer",
                dependencies=["task-2-arch"],
                expected_output_type="sql",
            ),
            PlannedSubtask(
                task_id="task-4-backend",
                title="FastAPI Controllers & Service Routers",
                description="Implement async routers, Pydantic schemas, and business logic controllers.",
                assigned_role="Backend Engineer",
                dependencies=["task-2-arch", "task-3-db"],
                expected_output_type="code",
            ),
            PlannedSubtask(
                task_id="task-5-frontend",
                title="Next.js Client Components",
                description="Build UI components and TanStack Query API hooks.",
                assigned_role="Frontend Engineer",
                dependencies=["task-2-arch"],
                expected_output_type="code",
            ),
            PlannedSubtask(
                task_id="task-6-qa",
                title="Pytest Test Suite",
                description="Write unit & integration test fixtures asserting response contracts.",
                assigned_role="QA Engineer",
                dependencies=["task-4-backend"],
                expected_output_type="code",
            ),
            PlannedSubtask(
                task_id="task-7-security",
                title="Security & Sanitization Audit",
                description="Review authentication tokens, CORS headers, and OWASP Top 10 vulnerabilities.",
                assigned_role="Security Engineer",
                dependencies=["task-4-backend", "task-5-frontend"],
                expected_output_type="markdown",
            ),
            PlannedSubtask(
                task_id="task-8-devops",
                title="Docker & Deployment Config",
                description="Package multi-stage Dockerfiles and deployment manifests.",
                assigned_role="DevOps Engineer",
                dependencies=["task-6-qa", "task-7-security"],
                expected_output_type="yaml",
            ),
        ]

        # Calculate parallel execution batches
        batches = [
            ["task-1-req"],
            ["task-2-arch"],
            ["task-3-db", "task-5-frontend"],
            ["task-4-backend"],
            ["task-6-qa", "task-7-security"],
            ["task-8-devops"],
        ]

        return ExecutionPlan(
            workflow_id=workflow_id,
            project_id=project_id,
            summary=f"Autonomous plan generated for: '{prompt[:60]}...'",
            tasks=tasks,
            parallel_batches=batches,
        )
