"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { ApiClientViewer } from "@/components/frontend-agent/ApiClientViewer";
import { DirectoryStructureViewer } from "@/components/frontend-agent/DirectoryStructureViewer";
import { TestSuiteViewer } from "@/components/frontend-agent/TestSuiteViewer";
import { Code2, FolderTree, TestTube2, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function FrontendStudioPage() {
  const [activeTab, setActiveTab] = useState("apiclient");
  const [approved, setApproved] = useState(false);

  const feData = {
    api_client_code: `// ========================================================\n// NIRMAN AI PLATFORM — CENTRALIZED TYPED API CLIENT\n// ========================================================\n\nimport axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";\n\nconst BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";\n\nclass ApiClient {\n  private client: AxiosInstance;\n\n  constructor() {\n    this.client = axios.create({\n      baseURL: BASE_URL,\n      headers: { "Content-Type": "application/json" },\n      timeout: 15000,\n    });\n\n    this.client.interceptors.request.use((config) => {\n      if (typeof window !== "undefined") {\n        const token = localStorage.getItem("nirman_token");\n        if (token) {\n          config.headers.Authorization = \`Bearer \${token}\`;\n        }\n      }\n      return config;\n    });\n\n    this.client.interceptors.response.use(\n      (response) => response,\n      (error) => {\n        if (error.response?.status === 401 && typeof window !== "undefined") {\n          localStorage.removeItem("nirman_token");\n          window.location.href = "/login";\n        }\n        return Promise.reject(error);\n      }\n    );\n  }\n\n  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {\n    const res: AxiosResponse<T> = await this.client.get(url, config);\n    return res.data;\n  }\n\n  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {\n    const res: AxiosResponse<T> = await this.client.post(url, data, config);\n    return res.data;\n  }\n}\n\nexport const apiClient = new ApiClient();`,
    structure: [
      "src/app/ (App Router pages & API routes)",
      "src/components/ui/ (Reusable glassmorphic UI atoms)",
      "src/components/dashboard/ (Shell & Navigation components)",
      "src/components/ceo/ (CEO Workshop components)",
      "src/components/ba/ (BA Requirements components)",
      "src/components/pm/ (Product Strategy components)",
      "src/components/architect/ (Solution Architecture components)",
      "src/components/system-architect/ (System Design components)",
      "src/components/database/ (Database DDL components)",
      "src/components/ux/ (UI/UX Design Tokens components)",
      "src/lib/ (ApiClient, Auth, Utilities)",
      "src/hooks/ (TanStack Query custom data hooks)"
    ],
    test_specs: {
      unit_tests: "Vitest for ApiClient interceptors, date formatters, and Zod validators",
      component_tests: "React Testing Library for Login form, Sidebar tabs, and Approval Modals",
      e2e_tests: "Playwright for Auth Login flow, Project Creation wizard, and SDLC approval gates"
    },
    dod: [
      "1. Zero TypeScript compilation errors (npx tsc --noEmit)",
      "2. 100% Next.js static & dynamic route build pass (npx next build)",
      "3. Full WCAG 2.2 AA keyboard tab order & screen reader ARIA labels",
      "4. All API requests routed through centralized ApiClient instance"
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
                <span className="text-2xl">💻</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Frontend Engineer Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Lucas Meyer (Principal Frontend Engineer)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Next.js 15 App Router Architecture, Centralized Typed ApiClient, TanStack Query Server State, and Vitest/Playwright Test Suites.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "apiclient", label: "Typed ApiClient & Interceptors", icon: Code2 },
              { id: "structure", label: "Directory Architecture", icon: FolderTree },
              { id: "tests", label: "Test Suites & DoD", icon: TestTube2 }
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
          {activeTab === "apiclient" && <ApiClientViewer code={feData.api_client_code} />}
          {activeTab === "structure" && <DirectoryStructureViewer structure={feData.structure} />}
          {activeTab === "tests" && <TestSuiteViewer specs={feData.test_specs} dod={feData.dod} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Frontend Architecture Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this frontend architecture hands off execution to Backend Engineer Agent (Ethan Vance) for FastAPI REST service implementation.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Frontend Architecture Approved! Handoff sent to Backend Engineer Ethan Vance...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Architecture & Handoff to Backend Engineer</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
