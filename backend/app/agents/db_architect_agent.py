from typing import Dict, Any, List
import datetime
from app.core.agent_framework.base_agent import BaseAgent, AgentCapability, AgentTask, AgentState

DB_ARCHITECT_SYSTEM_PROMPT = """You are David Chen, Principal Database Architect at Nirman.
Your persona is a Principal Database Architect responsible for large-scale multi-tenant SaaS data architecture, 3NF normalization, PostgreSQL 16 schema design, pgvector embeddings, and Alembic migrations.

Rules:
1. You DO NOT write application code or frontend UI components.
2. You transform System Architecture Document (DSDD v1.0) specifications into a production-ready, 3NF normalized PostgreSQL 16 DDL schema, Alembic migration scripts, and multi-tenant RLS policies.
3. You synthesize DDL SQL definitions across 10 core data domains (Identity, Orgs, Projects, SDLC, Architecture, AI Engine, Knowledge/Vector, Collaboration, Files, Audit), B-Tree & HNSW Indexes, Data Dictionaries, and ER Diagrams.
"""

class DBArchitectAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="agent-db-david",
            name="David Chen",
            role="Principal Database Architect",
            description="Designs 3NF PostgreSQL 16 relational DDL schema, multi-tenant RLS security policies, Alembic migration scripts, pgvector embedding stores, and ER diagrams.",
            system_prompt=DB_ARCHITECT_SYSTEM_PROMPT,
            capabilities=[AgentCapability.DATABASE_DESIGN],
            allowed_tools=["code_gen", "file_io"],
            version="1.0.0"
        )

    async def plan(self, task: AgentTask) -> Dict[str, Any]:
        self.set_state(AgentState.PLANNING)
        return {
            "agent_id": self.agent_id,
            "status": "DATABASE_PLANNING_COMPLETE",
            "target_database": "PostgreSQL 16",
            "normalization_level": "Third Normal Form (3NF)",
            "vector_extension": "pgvector (1536-dimensional HNSW index)"
        }

    async def execute(self, task: AgentTask, context: Dict[str, Any]) -> Dict[str, Any]:
        self.set_state(AgentState.EXECUTING)
        project_name = task.input_payload.get("project_name", "Nirman SaaS Core Platform")
        
        ddl_schema_sql = """-- ========================================================
-- NIRMAN AI PLATFORM — PRODUCTION 3NF POSTGRESQL 16 SCHEMA
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- 1. IDENTITY & AUTHENTICATION DOMAIN
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    refresh_token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ORGANIZATIONS & MULTI-TENANCY DOMAIN
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organization_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, user_id)
);

-- 3. PROJECTS DOMAIN
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    sdlc_phase INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS',
    health_score INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, slug)
);

-- 4. AI ENGINE & EXECUTION TRACKING DOMAIN
CREATE TABLE agent_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    agent_id VARCHAR(100) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED',
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    estimated_cost_usd NUMERIC(10, 6) DEFAULT 0.000000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE human_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    task_id VARCHAR(255) NOT NULL,
    author_agent_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. KNOWLEDGE BASE & PGVECTOR EMBEDDINGS
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chunks_embedding ON document_chunks USING hnsw (embedding vector_cosine_ops);
"""

        data_architecture_package = {
            "project_name": project_name,
            "dad_version": "v1.0",
            "executive_summary": "Production 3NF Database Architecture Document (DAD v1.0) synthesized from System Design #DSDD-001. Fully normalized for PostgreSQL 16.",
            "ddl_sql": ddl_schema_sql,
            "alembic_script": "alembic_v1_initial_schema.py",
            "multi_tenancy_strategy": {
                "isolation_model": "Shared Database, Shared Schema with Row-Level Security (RLS) and organization_id Foreign Keys",
                "rls_policy": "CREATE POLICY org_isolation ON projects FOR ALL USING (organization_id = current_setting('app.current_org_id')::uuid);"
            },
            "pgvector_strategy": {
                "dimensions": 1536,
                "index_type": "HNSW (Hierarchical Navigable Small World)",
                "distance_metric": "vector_cosine_ops"
            },
            "indexing_matrix": [
                {"table": "users", "index": "idx_users_email (B-Tree UNIQUE)", "purpose": "Fast login credential lookup"},
                {"table": "projects", "index": "idx_projects_org_slug (B-Tree UNIQUE)", "purpose": "Tenant-scoped slug routing"},
                {"table": "agent_executions", "index": "idx_executions_project_status (B-Tree Composite)", "purpose": "Fast execution queue filtering"},
                {"table": "document_chunks", "index": "idx_chunks_embedding (HNSW Cosine)", "purpose": "Sub-millisecond RAG vector search"}
            ],
            "data_dictionary": [
                {"table": "users", "columns_count": 8, "primary_key": "id (UUID)", "tenant_scoped": "No"},
                {"table": "organizations", "columns_count": 4, "primary_key": "id (UUID)", "tenant_scoped": "Tenant Root"},
                {"table": "projects", "columns_count": 9, "primary_key": "id (UUID)", "tenant_scoped": "Yes (organization_id)"},
                {"table": "agent_executions", "columns_count": 8, "primary_key": "id (UUID)", "tenant_scoped": "Yes (project_id)"},
                {"table": "document_chunks", "columns_count": 5, "primary_key": "id (UUID)", "tenant_scoped": "Yes (project_id)"}
            ],
            "created_at": datetime.datetime.utcnow().isoformat()
        }

        self.set_state(AgentState.WAITING_HUMAN_APPROVAL)
        return data_architecture_package

db_architect_agent_instance = DBArchitectAgent()
