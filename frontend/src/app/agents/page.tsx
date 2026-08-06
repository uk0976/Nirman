import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Bot, Cpu, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const AGENTS = [
  { id: "ceo", name: "Evelyn Vance", role: "Chief Executive Officer", avatar: "👔", state: "THINKING", task: "Product Vision Alignment", tokens: "142.5k", cost: "$0.28" },
  { id: "ba", name: "Marcus Brody", role: "Business Analyst", avatar: "📊", state: "READY", task: "Market Research & Competitor Matrix", tokens: "98.2k", cost: "$0.19" },
  { id: "pm", name: "Sarah Lin", role: "Product Manager", avatar: "📋", state: "EXECUTING", task: "PRD & SRS Specifications", tokens: "210.4k", cost: "$0.42" },
  { id: "arch", name: "Elena Rostova", role: "System Architect", avatar: "📐", state: "EXECUTING", task: "Clean Architecture Topology", tokens: "180.1k", cost: "$0.36" },
  { id: "db", name: "David Chen", role: "Database Architect", avatar: "🗄️", state: "WAITING_HUMAN_APPROVAL", task: "PostgreSQL 3NF Schema", tokens: "154.6k", cost: "$0.31" },
  { id: "api", name: "Omar Al-Mansoor", role: "API Engineer", avatar: "🔌", state: "READY", task: "OpenAPI 3.1 REST Specifications", tokens: "88.0k", cost: "$0.17" },
  { id: "fe", name: "Lucas Meyer", role: "Frontend Engineer", avatar: "🌐", state: "READY", task: "Next.js 15 App Router Components", tokens: "165.2k", cost: "$0.33" },
  { id: "be", name: "Aria Takahashi", role: "Backend Engineer", avatar: "⚙️", state: "READY", task: "FastAPI Async Services & SQLAlchemy", tokens: "178.9k", cost: "$0.35" },
  { id: "ai", name: "Dr. Aris Thorne", role: "AI Engineer", avatar: "🧠", state: "READY", task: "LiteLLM Router & Vector Store RAG", tokens: "112.4k", cost: "$0.22" },
  { id: "sec", name: "Alex Mercer", role: "Security Engineer", avatar: "🛡️", state: "READY", task: "OWASP Audit & JWT RBAC", tokens: "105.7k", cost: "$0.21" },
  { id: "qa", name: "Devon Hayes", role: "QA Engineer", avatar: "🧪", state: "READY", task: "PyTest Async Test Suites", tokens: "94.3k", cost: "$0.18" },
  { id: "ops", name: "Kaito Tanaka", role: "DevOps Engineer", avatar: "🐳", state: "READY", task: "Docker Compose & Nginx Proxy", tokens: "130.8k", cost: "$0.26" },
  { id: "writer", name: "Clara Sterling", role: "Technical Writer", avatar: "📝", state: "READY", task: "API Documentation & User Guides", tokens: "76.1k", cost: "$0.15" },
  { id: "deploy", name: "Vikram Patel", role: "Deployment Engineer", avatar: "🚀", state: "READY", task: "Kubernetes & Production Rollout", tokens: "89.4k", cost: "$0.18" }
];

export default function AgentsPage() {
  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AI Employee Directory (14 Specialized Roles)</h1>
              <p className="text-xs text-gray-400 mt-1">
                Autonomous AI software engineering company roster operating on Nirman BaseAgent infrastructure.
              </p>
            </div>

            <Link
              href="/agents/framework"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-glow transition flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Inspect Agent Framework & Metrics</span>
            </Link>
          </div>

          {/* Roster Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGENTS.map((agent) => (
              <div key={agent.id} className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.avatar}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                      <p className="text-[11px] text-gray-400 font-mono">{agent.role}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      agent.state === "EXECUTING"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse"
                        : agent.state === "THINKING"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                        : agent.state === "WAITING_HUMAN_APPROVAL"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {agent.state}
                  </span>
                </div>

                <p className="text-xs text-gray-300 bg-[#151824] p-2.5 rounded-xl border border-white/5 font-mono truncate">
                  {agent.task}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1 border-t border-white/5">
                  <span>Tokens: {agent.tokens}</span>
                  <span className="text-emerald-400">{agent.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
