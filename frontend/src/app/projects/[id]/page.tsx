"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Terminal,
  FileCode2,
  Layers,
  Database,
  ShieldCheck,
  Cpu,
  Play,
  Code2,
  FileText,
  Plug,
  TestTube,
  Globe
} from "lucide-react";

const WORKSPACE_TABS = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "requirements", label: "Requirements", icon: FileText },
  { id: "prd", label: "PRD Spec", icon: FileCode2 },
  { id: "srs", label: "SRS Spec", icon: FileCode2 },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "database", label: "Database 3NF", icon: Database },
  { id: "apis", label: "REST APIs", icon: Plug },
  { id: "frontend", label: "Frontend", icon: Globe },
  { id: "backend", label: "Backend", icon: Cpu },
  { id: "testing", label: "Testing & QA", icon: TestTube },
  { id: "deployment", label: "Deployment", icon: Terminal },
  { id: "documentation", label: "Documentation", icon: FileText },
];

export default function ProjectDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Project Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white tracking-tight">Nirman SaaS Core Platform</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  IN_PROGRESS
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Enterprise AI Software Engineering Platform — Current phase: <span className="text-emerald-400 font-mono">Phase 6 (PRD & SRS Specifications)</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded-xl shadow-glow transition flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Next SDLC Phase</span>
              </button>
            </div>
          </div>

          {/* 20-Phase SDLC Stepper */}
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-300 font-bold uppercase">SDLC Execution Stepper (20 Phases)</span>
              <span className="text-emerald-400 font-semibold">Phase 6 of 20 (30% Complete)</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-1">
              {Array.from({ length: 20 }).map((_, idx) => {
                const phaseNum = idx + 1;
                const isDone = phaseNum < 6;
                const isCurrent = phaseNum === 6;
                return (
                  <div
                    key={idx}
                    title={`Phase ${phaseNum}`}
                    className={`h-2.5 rounded-full transition ${
                      isDone
                        ? "bg-emerald-400"
                        : isCurrent
                        ? "bg-indigo-500 animate-pulse ring-2 ring-indigo-400/50"
                        : "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* 12 Specialized Workspace Tabs Bar */}
          <div className="flex border-b border-white/10 gap-2 overflow-x-auto text-xs font-medium pb-1">
            {WORKSPACE_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
                    activeTab === tab.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-bold shadow-sm"
                      : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Workspace Panel */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 min-h-[420px]">
            {activeTab === "overview" && (
              <div className="space-y-6 text-xs">
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Project Engineering Matrix</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1">
                    <span className="text-gray-400 font-mono text-[10px]">ARCHITECTURE STYLE</span>
                    <p className="font-semibold text-white">Clean Architecture Modular Monolith</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1">
                    <span className="text-gray-400 font-mono text-[10px]">TECH STACK</span>
                    <p className="font-semibold text-white">Next.js 15, FastAPI, Async SQLAlchemy, Docker</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-1">
                    <span className="text-gray-400 font-mono text-[10px]">SECURITY AUDIT</span>
                    <p className="font-semibold text-emerald-400">100% Passed (JWT + RBAC + OWASP)</p>
                  </div>
                </div>

                <div className="space-y-3 font-mono">
                  <h4 className="text-xs font-bold text-gray-300 uppercase">Recent Synthesized Artifacts</h4>
                  {[
                    { doc: "Product Requirement Document (PRD v1.0)", author: "Sarah Lin (PM)" },
                    { doc: "Software Requirement Specification (SRS v1.0)", author: "Sarah Lin (PM)" },
                    { doc: "3NF Database Schema & ER Graph", author: "David Chen (DB Architect)" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
                      <span className="text-gray-200">{item.doc}</span>
                      <span className="text-indigo-400 text-[10px]">{item.author}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== "overview" && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-xs space-y-2">
                <FileCode2 className="w-8 h-8 text-indigo-400" />
                <p className="font-mono text-sm font-bold text-white uppercase">
                  {WORKSPACE_TABS.find((t) => t.id === activeTab)?.label} Workspace
                </p>
                <p className="text-gray-400">Deterministic artifact view for Nirman SaaS Core Platform.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
