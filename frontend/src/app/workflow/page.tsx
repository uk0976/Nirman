import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Workflow, CheckCircle2, Clock, Play, Layers } from "lucide-react";

const SDLC_20_PHASES = [
  { phase: 1, name: "Product Discovery", agent: "Business Analyst", status: "COMPLETED" },
  { phase: 2, name: "Requirement Gathering", agent: "Product Manager", status: "COMPLETED" },
  { phase: 3, name: "Product Vision", agent: "CEO Agent", status: "COMPLETED" },
  { phase: 4, name: "Competitor Analysis", agent: "Business Analyst", status: "COMPLETED" },
  { phase: 5, name: "User Personas", agent: "Business Analyst", status: "COMPLETED" },
  { phase: 6, name: "Functional & Non-Functional Requirements", agent: "Product Manager", status: "IN_PROGRESS" },
  { phase: 7, name: "System Architecture", agent: "System Architect", status: "PENDING" },
  { phase: 8, name: "Database Design", agent: "Database Architect", status: "PENDING" },
  { phase: 9, name: "API Design", agent: "API Engineer", status: "PENDING" },
  { phase: 10, name: "Project Foundation", agent: "Solution Architect", status: "PENDING" },
  { phase: 11, name: "Authentication & Security", agent: "Security Engineer", status: "PENDING" },
  { phase: 12, name: "AI Infrastructure", agent: "AI Engineer", status: "PENDING" },
  { phase: 13, name: "AI Agent Development", agent: "AI Engineer", status: "PENDING" },
  { phase: 14, name: "Independent Testing of Each Agent", agent: "QA Engineer", status: "PENDING" },
  { phase: 15, name: "Multi-Agent Orchestration", agent: "System Architect", status: "PENDING" },
  { phase: 16, name: "System Integration Testing", agent: "QA Engineer", status: "PENDING" },
  { phase: 17, name: "Performance Optimization", agent: "Backend Engineer", status: "PENDING" },
  { phase: 18, name: "Deployment", agent: "DevOps Engineer", status: "PENDING" },
  { phase: 19, name: "Monitoring & Logging", agent: "DevOps Engineer", status: "PENDING" },
  { phase: 20, name: "Documentation & Maintenance", agent: "Technical Writer", status: "PENDING" },
];

export default function WorkflowPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400" />
                <h1 className="text-2xl font-bold text-white tracking-tight">SDLC 20-Phase State Engine</h1>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Visualizing state progression across all 20 phases of software development.
              </p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-glow transition flex items-center gap-2">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Step Engine</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SDLC_20_PHASES.map((p) => (
              <div
                key={p.phase}
                className={`p-4 rounded-xl border transition ${
                  p.status === "COMPLETED"
                    ? "bg-[#151824] border-emerald-500/30"
                    : p.status === "IN_PROGRESS"
                    ? "bg-indigo-950/40 border-indigo-500/40 shadow-glow"
                    : "bg-[#0D0F17] border-white/5 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-gray-400">PHASE {p.phase} OF 20</span>
                  {p.status === "COMPLETED" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {p.status === "IN_PROGRESS" && <Clock className="w-4 h-4 text-indigo-400 animate-spin" />}
                </div>

                <h3 className="font-bold text-xs text-white tracking-tight mb-1">{p.name}</h3>
                <p className="text-[10px] font-mono text-indigo-300">Lead Role: {p.agent}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
