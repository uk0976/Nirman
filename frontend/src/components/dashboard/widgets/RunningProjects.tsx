import Link from "next/link";
import { FolderGit2, ArrowRight, MoreVertical, Play, CheckCircle2 } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: "proj-1",
    name: "Nirman SaaS Core Platform",
    desc: "Enterprise-grade AI software company platform operating across 20 SDLC phases.",
    phase: "Phase 6: PRD & SRS Specs",
    progress: 30,
    status: "IN_PROGRESS",
    updated: "10m ago",
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "Docker"]
  },
  {
    id: "proj-2",
    name: "Apex Algorithmic Trading Bot",
    desc: "High-frequency crypto trade execution engine with real-time WebSocket telemetry.",
    phase: "Phase 18: Docker & Deployment",
    progress: 90,
    status: "COMPLETED",
    updated: "2h ago",
    stack: ["Python", "Redis", "Grafana", "WebSockets"]
  },
  {
    id: "proj-3",
    name: "MedPulse Telehealth Analytics",
    desc: "HIPAA compliant patient telemetry analytics SaaS with RAG clinical assistant.",
    phase: "Phase 12: AI Infrastructure",
    progress: 60,
    status: "IN_PROGRESS",
    updated: "Yesterday",
    stack: ["React", "Tailwind", "LangChain", "FastAPI"]
  }
];

export function RunningProjects() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">Active Software Projects</h2>
        </div>

        <Link href="/projects" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono">
          <span>View all projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {PROJECTS_DATA.map((proj) => (
          <div key={proj.id} className="p-4 rounded-xl bg-[#151824] border border-white/5 hover:border-indigo-500/30 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs font-mono">
                  {proj.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white leading-tight">{proj.name}</h3>
                  <p className="text-[11px] text-gray-400 truncate max-w-sm">{proj.desc}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                {proj.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 font-mono">
              <span className="text-[11px] text-emerald-400">{proj.phase}</span>
              <span className="text-[10px] text-gray-500">{proj.updated}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" style={{ width: `${proj.progress}%` }} />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                {proj.stack.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects/${proj.id}`}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 font-medium"
              >
                <span>Open Hub</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
