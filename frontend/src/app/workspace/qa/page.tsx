"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { TraceabilityMatrixTable } from "@/components/qa/TraceabilityMatrixTable";
import { AIEvalScorecard } from "@/components/qa/AIEvalScorecard";
import { PipelineQualityGates } from "@/components/qa/PipelineQualityGates";
import { FileText, Sparkles, Terminal, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function QAStudioPage() {
  const [activeTab, setActiveTab] = useState("matrix");
  const [approved, setApproved] = useState(false);

  const qaData = {
    cicd_yaml: `# .github/workflows/ci.yml\nname: Nirman Enterprise CI/CD Pipeline\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  lint-and-typecheck:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Setup Node.js & Python\n        uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci && npm run lint && npx tsc --noEmit\n\n  backend-tests:\n    runs-on: ubuntu-latest\n    services:\n      postgres:\n        image: postgres:16\n        env: { POSTGRES_DB: nirman_test, POSTGRES_PASSWORD: secret }\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r backend/requirements.txt && pytest backend/tests/\n\n  e2e-and-ai-eval:\n    needs: [lint-and-typecheck, backend-tests]\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npx playwright test && python backend/evals/evaluate_agents.py`,
    matrix: [
      { req_id: "REQ-AUTH-001", test_id: "TEST-AUTH-001", feature: "JWT Auth & SSO", type: "Integration", status: "PASSED" },
      { req_id: "REQ-CEO-001", test_id: "TEST-CEO-001", feature: "Strategic Workshop Synthesis", type: "AI Eval", status: "PASSED" },
      { req_id: "REQ-BA-001", test_id: "TEST-BA-001", feature: "FRD & Agile User Story Generation", type: "AI Eval", status: "PASSED" },
      { req_id: "REQ-PM-001", test_id: "TEST-PM-001", feature: "MoSCoW & 4-Phase Roadmap", type: "AI Eval", status: "PASSED" },
      { req_id: "REQ-DB-001", test_id: "TEST-DB-001", feature: "PostgreSQL 3NF Tenant Isolation", type: "Security", status: "PASSED" }
    ],
    evals: [
      { agent: "CEO Agent (Evelyn Vance)", schema_compliance: "100%", prompt_injection_defense: "100%", overall_score: 98.5 },
      { agent: "Business Analyst Agent (Marcus Brody)", schema_compliance: "100%", prompt_injection_defense: "99.0%", overall_score: 97.8 },
      { agent: "Product Manager Agent (Sarah Lin)", schema_compliance: "98.0%", prompt_injection_defense: "100%", overall_score: 96.5 },
      { agent: "Solution Architect Agent (Elena Rostova)", schema_compliance: "100%", prompt_injection_defense: "100%", overall_score: 99.0 },
      { agent: "Database Architect Agent (David Chen)", schema_compliance: "100%", prompt_injection_defense: "100%", overall_score: 99.2 }
    ],
    gates: [
      "1. Zero Critical or High severity security vulnerabilities (OWASP ZAP Clean Audit)",
      "2. 100% Playwright E2E test suite pass rate across login, onboarding, and project creation",
      "3. AI Agent evaluation score ≥ 95.0% across all 14 specialized SDLC agents",
      "4. All PostgreSQL Alembic migration scripts tested against rollback capabilities"
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
                <span className="text-2xl">🧪</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">QA Quality Engineering & AI Evaluation Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Rachel Adams (Principal QA Lead)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Requirement-to-Test Traceability Matrix, AI Agent Evaluation Scorecards, and CI/CD Release Quality Gates.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "matrix", label: "Traceability Matrix", icon: FileText },
              { id: "evals", label: "AI Agent Evaluation Scorecards", icon: Sparkles },
              { id: "pipeline", label: "CI/CD Pipeline & Quality Gates", icon: Terminal }
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
          {activeTab === "matrix" && <TraceabilityMatrixTable matrix={qaData.matrix} />}
          {activeTab === "evals" && <AIEvalScorecard evals={qaData.evals} />}
          {activeTab === "pipeline" && <PipelineQualityGates yamlContent={qaData.cicd_yaml} gates={qaData.gates} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Quality Engineering Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this quality strategy hands off execution to Security & DevOps Engineer Agent (Devon Vance) for production deployment.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Quality Strategy Approved! Handoff sent to Security & DevOps Engineer Devon Vance...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Quality & Handoff to Security/DevOps</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
