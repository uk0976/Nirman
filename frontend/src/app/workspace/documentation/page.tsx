"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { DocTreeViewer } from "@/components/doc-agent/DocTreeViewer";
import { DeveloperGuideViewer } from "@/components/doc-agent/DeveloperGuideViewer";
import { AgentSpecsRoster } from "@/components/doc-agent/AgentSpecsRoster";
import { FolderTree, FileCode2, Users, Check, ArrowRight, ShieldCheck, Award } from "lucide-react";

export default function DocStudioPage() {
  const [activeTab, setActiveTab] = useState("hierarchy");
  const [approved, setApproved] = useState(false);

  const docData = {
    developer_guide_md: `# NIRMAN AI PLATFORM — DEVELOPER ONBOARDING GUIDE\n\nWelcome to the **Nirman AI Platform** codebase! This guide covers setup, architecture, and workflow for new engineers.\n\n## Prerequisites\n- Node.js 20+ and npm 10+\n- Python 3.11+\n- PostgreSQL 16\n- Redis 7\n- Docker & Docker Compose\n\n## Quick Start\n\`\`\`bash\n# 1. Clone repository\ngit clone https://github.com/uk0976/Nirman.git\ncd Nirman\n\n# 2. Setup Frontend\ncd frontend\nnpm install\nnpm run dev\n\n# 3. Setup Backend (in another terminal)\ncd backend\npython -m venv venv\nsource venv/bin/activate # or venv\\\\Scripts\\\\activate on Windows\npip install -r requirements.txt\nuvicorn app.main:app --reload\n\`\`\`\n\n## Architecture Summary\n- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, TanStack Query.\n- **Backend**: FastAPI async Python backend, Pydantic v2, Async SQLAlchemy 2.0.\n- **AI Infrastructure**: 14 Autonomous SDLC Agents with LangGraph DAG orchestration.`,
    hierarchy: [
      "1. Product Domain (Vision, PRD, SRS, Roadmap, Release Notes)",
      "2. Architecture Domain (Solution SAD v1.0, System DSDD v1.0, ADR-001..005)",
      "3. Engineering Domain (Frontend FAD v1.0, Backend BAD v1.0, 3NF DAD v1.0)",
      "4. AI Framework Domain (14 Agent Specs, Workflow DAGs, AI Eval Scorecards)",
      "5. Operations Domain (DevOps IAD v1.0, Docker Compose, Terraform IaC, DR Runbook)",
      "6. Security Domain (SEC-SAD v1.0, STRIDE Threat Matrix, OWASP Audits)",
      "7. User & Developer Domain (Developer Onboarding Guide, User Manual, FAQ)"
    ],
    agent_roster: [
      { role: "CEO Agent (Evelyn Vance)", focus: "Strategic Planning & Client Discovery" },
      { role: "Business Analyst Agent (Marcus Brody)", focus: "Requirements Engineering & SRS" },
      { role: "Product Manager Agent (Sarah Lin)", focus: "MoSCoW Prioritization & Roadmap" },
      { role: "Solution Architect Agent (Elena Rostova)", focus: "High-Level Architecture & ADRs" },
      { role: "System Architect Agent (Elena Rostova)", focus: "Clean Architecture 4-Layer Design" },
      { role: "Database Architect Agent (David Chen)", focus: "3NF PostgreSQL & pgvector Schema" },
      { role: "UI/UX Designer Agent (Sophia Martinez)", focus: "Design Tokens & User Journeys" },
      { role: "Frontend Engineer Agent (Lucas Meyer)", focus: "Next.js 15 & Typed ApiClient" },
      { role: "Backend Engineer Agent (Ethan Vance)", focus: "FastAPI REST APIs & Repositories" },
      { role: "QA Engineer Agent (Rachel Adams)", focus: "Test Traceability & AI Evaluations" },
      { role: "Security Engineer Agent (Devon Vance)", focus: "STRIDE Threat Modeling & Security" },
      { role: "DevOps Engineer Agent (Marcus Vance)", focus: "Docker Compose & Terraform IaC" },
      { role: "Technical Writer Agent (Amara Okafor)", focus: "Single Source of Truth Documentation" },
      { role: "Lead SDLC Orchestrator", focus: "Multi-Agent Workflow Execution" }
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
                <span className="text-2xl">📚</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Technical Writer Master Documentation Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Amara Okafor (Principal Doc Architect)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Single Source of Truth Documentation, 14 SDLC AI Agent Specifications, and Developer Onboarding Guides.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "hierarchy", label: "Documentation Hierarchy", icon: FolderTree },
              { id: "guide", label: "Developer Onboarding Guide", icon: FileCode2 },
              { id: "roster", label: "14-Agent Specifications", icon: Users }
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
          {activeTab === "hierarchy" && <DocTreeViewer hierarchy={docData.hierarchy} />}
          {activeTab === "guide" && <DeveloperGuideViewer mdContent={docData.developer_guide_md} />}
          {activeTab === "roster" && <AgentSpecsRoster roster={docData.agent_roster} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Master Documentation Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this documentation suite freezes all SDLC specifications and establishes Nirman&apos;s authoritative single source of truth!
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>✓ Master Documentation Suite Approved & Frozen! Single Source of Truth Established!</span>
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Documentation & Freeze Platform Specs</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
