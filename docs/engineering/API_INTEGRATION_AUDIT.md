# Nirman AI Platform — API Integration Audit & Contract Matrix

This document maps all frontend API callers against backend FastAPI routes and OpenAPI schemas.

| Frontend Caller | Backend Endpoint | Method | Auth Required | Request Schema | Response Schema | Status |
| --------------- | ---------------- | ------ | ------------- | -------------- | --------------- | ------ |
| `ApiClient.getHealth()` | `/api/v1/health` | `GET` | No | None | `{ status, services: { database, platform } }` | VERIFIED |
| `ApiClient.login()` | `/api/v1/auth/login` | `POST` | No | `{ email, password }` | `{ access_token, token_type, user }` | VERIFIED |
| `ApiClient.register()` | `/api/v1/auth/register` | `POST` | No | `{ email, password, full_name }` | `{ id, email, full_name, created_at }` | VERIFIED |
| `ApiClient.getProjects()` | `/api/v1/projects` | `GET` | Yes (JWT) | None | `Array<{ id, name, description, status }>` | VERIFIED |
| `ApiClient.createProject()` | `/api/v1/projects` | `POST` | Yes (JWT) | `{ name, description, raw_idea }` | `{ id, name, description, status }` | VERIFIED |
| `ApiClient.startDiscovery()` | `/api/v1/ceo/start-discovery` | `POST` | Yes (JWT) | `{ project_name, raw_idea }` | `{ status, agent, strategic_plan }` | VERIFIED |
| `ApiClient.generateSRS()` | `/api/v1/ba/generate-srs` | `POST` | Yes (JWT) | `{ project_name, vision_summary }` | `{ status, agent, srs_document }` | VERIFIED |
| `ApiClient.generateRoadmap()` | `/api/v1/pm/generate-roadmap` | `POST` | Yes (JWT) | `{ project_name, srs_summary }` | `{ status, agent, roadmap_package }` | VERIFIED |
| `ApiClient.synthesizeSAD()` | `/api/v1/architect/synthesize-sad` | `POST` | Yes (JWT) | `{ project_name, pm_roadmap_summary }` | `{ status, agent, solution_architecture }` | VERIFIED |
| `ApiClient.generateCleanArch()` | `/api/v1/system-architect/generate-clean-arch` | `POST` | Yes (JWT) | `{ project_name, sad_summary }` | `{ status, agent, system_architecture }` | VERIFIED |
| `ApiClient.synthesize3NF()` | `/api/v1/db-architect/synthesize-3nf` | `POST` | Yes (JWT) | `{ project_name, system_arch_summary }` | `{ status, agent, db_architecture }` | VERIFIED |
| `ApiClient.generateDesignTokens()` | `/api/v1/ux-designer/generate-tokens` | `POST` | Yes (JWT) | `{ project_name, product_goals }` | `{ status, agent, ux_design_system }` | VERIFIED |
| `ApiClient.buildFrontendArch()` | `/api/v1/frontend-agent/build-arch` | `POST` | Yes (JWT) | `{ project_name, ux_specs_summary }` | `{ status, agent, frontend_architecture }` | VERIFIED |
| `ApiClient.buildBackendArch()` | `/api/v1/backend-agent/build-arch` | `POST` | Yes (JWT) | `{ project_name, db_schema_summary }` | `{ status, agent, backend_architecture }` | VERIFIED |
| `ApiClient.synthesizeQAStrategy()` | `/api/v1/qa/strategy` | `POST` | Yes (JWT) | `{ project_name, backend_arch_summary }` | `{ status, agent, quality_strategy }` | VERIFIED |
| `ApiClient.synthesizeSecurityAudit()` | `/api/v1/security-agent/audit` | `POST` | Yes (JWT) | `{ project_name, qa_strategy_summary }` | `{ status, agent, security_architecture }` | VERIFIED |
| `ApiClient.synthesizeDevOps()` | `/api/v1/devops/deploy-spec` | `POST` | Yes (JWT) | `{ project_name, security_audit_summary }` | `{ status, agent, devops_infrastructure }` | VERIFIED |
| `ApiClient.compileDocs()` | `/api/v1/doc-agent/compile` | `POST` | Yes (JWT) | `{ project_name, infrastructure_summary }` | `{ status, agent, documentation_suite }` | VERIFIED |
| `ApiClient.startOrchestration()` | `/api/v1/orchestrator/start-workflow` | `POST` | Yes (JWT) | `{ project_name, raw_idea }` | `{ status, initial_step, telemetry }` | VERIFIED |
| `ApiClient.runValidationAudit()` | `/api/v1/validation/run-audit` | `POST` | Yes (JWT) | None | `{ status, report }` | VERIFIED |
