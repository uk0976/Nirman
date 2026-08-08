# Nirman AI Platform — Defect Inventory & Failure Matrix

| ID | Area | Problem | Severity | Root Cause | Fix | Status |
| -- | ---- | ------- | -------- | ---------- | --- | ------ |
| FM-001 | Health Check | `/health` route returns static JSON without probing Database session | P1 | `app/api/v1/health.py` only returned static dictionary without testing `async_session` DB query | Updated `/health` to execute `SELECT 1` DB probe and return service statuses | FIXED |
| FM-002 | Agent Capability Enum | `QAAgent` initialized with non-existent `AgentCapability.TESTING_QA` | P0 | Attribute mismatch in `qa_agent.py` constructor against `AgentCapability` enum | Updated `qa_agent.py` to use `AgentCapability.QA_TESTING` | FIXED |
| FM-003 | Environment Configuration | Missing root `.env.example` template for development setup | P2 | No unified `.env.example` file in repository root | Created root `.env.example` with clear variable grouping | FIXED |
| FM-004 | DB Connection Handling | SQLite async engine lacks timeout configuration under heavy concurrency | P2 | Default SQLite connection pool config had no busy_timeout | Added `connect_args={"timeout": 30}` to SQLite engine configuration | FIXED |
| FM-005 | API Integration Audit | Unverified frontend/backend REST contracts across 42 endpoints | P1 | Frontend components relied on default state fallbacks when backend was offline | Created `API_INTEGRATION_AUDIT.md` and verified all endpoints against Pydantic schemas | FIXED |
