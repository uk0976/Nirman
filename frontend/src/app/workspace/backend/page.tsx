"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { RouteRegistryTable } from "@/components/backend-agent/RouteRegistryTable";
import { AsyncRepositoryViewer } from "@/components/backend-agent/AsyncRepositoryViewer";
import { BackendTestSuiteViewer } from "@/components/backend-agent/BackendTestSuiteViewer";
import { Server, Database, Terminal, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function BackendStudioPage() {
  const [activeTab, setActiveTab] = useState("routes");
  const [approved, setApproved] = useState(false);

  const beData = {
    async_repo_code: `# ========================================================\n# NIRMAN AI PLATFORM — ASYNC SQLALCHEMY 2.0 REPOSITORY\n# ========================================================\n\nfrom typing import List, Optional\nfrom uuid import UUID\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom sqlalchemy.future import select\nfrom app.models.project import ProjectModel\nfrom app.schemas.project import ProjectCreateDTO, ProjectUpdateDTO\n\nclass AsyncProjectRepository:\n    def __init__(self, session: AsyncSession):\n        self.session = session\n\n    async def get_by_id(self, project_id: UUID, org_id: UUID) -> Optional[ProjectModel]:\n        query = select(ProjectModel).where(\n            ProjectModel.id == project_id,\n            ProjectModel.organization_id == org_id\n        )\n        result = await self.session.execute(query)\n        return result.scalars().first()\n\n    async def create(self, org_id: UUID, dto: ProjectCreateDTO) -> ProjectModel:\n        project = ProjectModel(\n            organization_id=org_id,\n            name=dto.name,\n            slug=dto.slug,\n            description=dto.description\n        )\n        self.session.add(project)\n        await self.session.commit()\n        await self.session.refresh(project)\n        return project\n\n    async def list_by_org(self, org_id: UUID, limit: int = 50, offset: int = 0) -> List[ProjectModel]:\n        query = (\n            select(ProjectModel)\n            .where(ProjectModel.organization_id == org_id)\n            .limit(limit)\n            .offset(offset)\n        )\n        result = await self.session.execute(query)\n        return result.scalars().all()`,
    routes: [
      { method: "GET", path: "/api/v1/health", dto: "HealthCheckDTO", rate_limit: "60/min" },
      { method: "POST", path: "/api/v1/auth/login", dto: "LoginRequestDTO", rate_limit: "5/min" },
      { method: "GET", path: "/api/v1/projects", dto: "ListProjectsDTO", rate_limit: "120/min" },
      { method: "POST", path: "/api/v1/projects", dto: "ProjectCreateDTO", rate_limit: "30/min" },
      { method: "POST", path: "/api/v1/ceo/discovery", dto: "DiscoveryWorkshopDTO", rate_limit: "20/min" },
      { method: "POST", path: "/api/v1/ba/requirements", dto: "RequirementsRequestDTO", rate_limit: "20/min" }
    ],
    pytest_specs: {
      unit_tests: "Pytest for Pydantic validators, JWT issuance, and Argon2id password hashing",
      repository_tests: "Async SQLAlchemy integration tests running against PostgreSQL test database",
      api_security_tests: "HTTPX test client verifying RBAC tenant isolation and expired JWT tokens"
    },
    dod: [
      "1. 100% Pytest test suite pass rate across unit and integration tests",
      "2. Automatic OpenAPI schema generated at /docs without missing DTO models",
      "3. All database queries scoped to current tenant (organization_id)",
      "4. Redis rate limiters active on public and authentication endpoints"
    ]
  };

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Backend Engineer REST Architecture Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Ethan Vance (Principal Backend Engineer)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                FastAPI Versioned REST APIs (/api/v1), Async SQLAlchemy 2.0 Repositories, Redis Session Cache, and Pytest Test Pipelines.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "routes", label: "FastAPI REST Route Registry", icon: Server },
              { id: "repo", label: "Async Repositories & ORM", icon: Database },
              { id: "tests", label: "Pytest Suites & DoD", icon: Terminal }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 border ${
                    activeTab === tab.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active View Render */}
          {activeTab === "routes" && <RouteRegistryTable routes={beData.routes} />}
          {activeTab === "repo" && <AsyncRepositoryViewer code={beData.async_repo_code} />}
          {activeTab === "tests" && <BackendTestSuiteViewer specs={beData.pytest_specs} dod={beData.dod} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Backend Architecture Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this backend architecture hands off execution to QA & Testing Engineer Agent (Rachel Adams) for end-to-end test execution.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Backend Architecture Approved! Handoff sent to QA & Testing Agent Rachel Adams...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Architecture & Handoff to QA Engineer</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
