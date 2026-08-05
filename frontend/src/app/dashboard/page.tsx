import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MetricCardGrid } from "@/components/dashboard/widgets/MetricCardGrid";
import { LiveAICompanyGrid } from "@/components/dashboard/widgets/LiveAICompanyGrid";
import {
  FolderGit2,
  Terminal,
  FileCode2,
  Workflow,
  Sparkles,
  ArrowRight,
  Plus,
  Activity,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">Enterprise Engineering Dashboard</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SDLC v1.0
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Autonomous Software Engineering Company operating across 20 SDLC phases with 14 specialized AI roles.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/warroom"
                className="bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 font-medium text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enter AI War Room</span>
              </Link>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-glow transition flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                <span>New Project Idea</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <MetricCardGrid />

          {/* AI Company Roster */}
          <LiveAICompanyGrid />

          {/* Projects & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Projects */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white">Active Software Projects</h2>
                </div>
                <Link href="/projects" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View all projects <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Nirman SaaS Core",
                    desc: "Enterprise AI Software Engineering Platform",
                    phase: "Phase 6: PRD & SRS Specifications",
                    progress: 30,
                    status: "IN_PROGRESS",
                    stack: "Next.js 15, FastAPI, Async SQLAlchemy, Docker"
                  },
                  {
                    name: "Apex Trading Bot Engine",
                    desc: "High-frequency algorithmic crypto trade executor",
                    phase: "Phase 18: Docker & Deployment",
                    progress: 90,
                    status: "COMPLETED",
                    stack: "Python, Redis, WebSockets, Grafana"
                  },
                  {
                    name: "MedPulse Health Portal",
                    desc: "HIPAA compliant patient telemetry analytics SaaS",
                    phase: "Phase 12: AI Infrastructure",
                    progress: 60,
                    status: "IN_PROGRESS",
                    stack: "React, Tailwind, PostgreSQL, LangChain"
                  }
                ].map((project, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 hover:border-indigo-500/30 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-gray-100">{project.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{project.desc}</p>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] font-mono text-emerald-400">{project.phase}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{project.stack}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Live SDLC Activity Feed</h2>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { agent: "Evelyn Vance (CEO)", action: "Approved PRD Specification Document v1.0", time: "2m ago" },
                  { agent: "Sarah Lin (PM)", action: "Finalized 24 User Stories for Auth & Billing", time: "5m ago" },
                  { agent: "David Chen (DB Architect)", action: "Generated 3NF Schema & Alembic Migration script", time: "12m ago" },
                  { agent: "Kaito Tanaka (DevOps)", action: "Synthesized Docker Compose & Nginx Proxy", time: "25m ago" }
                ].map((act, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#151824] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-indigo-300 font-semibold">{act.agent}</span>
                      <span className="text-gray-500 text-[10px]">{act.time}</span>
                    </div>
                    <p className="text-gray-300 text-[11px] leading-tight">{act.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
