"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { TaskBoard } from "@/components/project-details/TaskBoard";
import { DecisionPanel } from "@/components/project-details/DecisionPanel";
import { FileExplorer } from "@/components/project-details/FileExplorer";
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
  FileText,
  Plug,
  TestTube,
  Globe,
  Users,
  Compass
} from "lucide-react";

const WORKSPACE_18_TABS = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "requirements", label: "Requirements", icon: FileText },
  { id: "vision", label: "Product Vision", icon: Compass },
  { id: "prd", label: "PRD Spec", icon: FileCode2 },
  { id: "srs", label: "SRS Spec", icon: FileCode2 },
  { id: "roadmap", label: "Roadmap", icon: Clock },
  { id: "personas", label: "User Personas", icon: Users },
  { id: "competitors", label: "Competitor Matrix", icon: Globe },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "database", label: "Database 3NF", icon: Database },
  { id: "apis", label: "REST APIs", icon: Plug },
  { id: "uiux", label: "UI/UX Spec", icon: Globe },
  { id: "frontend", label: "Frontend Studio", icon: Globe },
  { id: "backend", label: "Backend Services", icon: Cpu },
  { id: "agents", label: "AI Agents Roster", icon: Cpu },
  { id: "testing", label: "QA & Testing", icon: TestTube },
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

          {/* 20-Phase SDLC Progress Bar */}
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

          {/* 18 Specialized Engineering Tabs */}
          <div className="flex border-b border-white/10 gap-1.5 overflow-x-auto text-xs font-medium pb-2">
            {WORKSPACE_18_TABS.map((tab) => {
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

          {/* Workspace Tab Panels */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <TaskBoard />
              <FileExplorer />
              <DecisionPanel />
            </div>
          )}

          {activeTab !== "overview" && (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[380px] text-xs font-mono space-y-3">
              <FileCode2 className="w-10 h-10 text-indigo-400" />
              <h3 className="text-base font-bold text-white uppercase">
                {WORKSPACE_18_TABS.find((t) => t.id === activeTab)?.label} Workspace
              </h3>
              <p className="text-gray-400 max-w-md text-center">
                Deterministic artifact specification view for Nirman SaaS Core Platform. Populated automatically by assigned AI agents.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
