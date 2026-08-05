import { Bot, CheckCircle, Activity, BrainCircuit } from "lucide-react";

const AGENT_ROLES = [
  { role: "CEO", name: "Evelyn Vance", status: "THINKING", task: "Product Vision Alignment", avatar: "👔" },
  { role: "Business Analyst", name: "Marcus Brody", status: "IDLE", task: "Competitor Matrix Complete", avatar: "📊" },
  { role: "Product Manager", name: "Sarah Lin", status: "EXECUTING", task: "Synthesizing SRS Specifications", avatar: "📋" },
  { role: "Solution Architect", name: "Vikram Patel", status: "IDLE", task: "Tech Stack Matrix Finalized", avatar: "🏗️" },
  { role: "System Architect", name: "Elena Rostova", status: "THINKING", task: "Clean Architecture Design", avatar: "📐" },
  { role: "Database Architect", name: "David Chen", status: "EXECUTING", task: "3NF Normalization & ER Graph", avatar: "🗄️" },
  { role: "UI/UX Designer", name: "Chloe Dubois", status: "IDLE", task: "Glassmorphic Theme Tokens", avatar: "🎨" },
  { role: "Frontend Engineer", name: "Lucas Meyer", status: "WAITING", task: "Next.js App Router Component Specs", avatar: "⚛️" },
  { role: "Backend Engineer", name: "Aria Takahashi", status: "WAITING", task: "FastAPI Endpoint Schemas", avatar: "⚙️" },
  { role: "API Engineer", name: "Omar Al-Mansoor", status: "IDLE", task: "OpenAPI 3.1 Contract Review", avatar: "🔌" },
  { role: "AI Engineer", name: "Dr. Sophia Sterling", status: "THINKING", task: "LangGraph State Machine Router", avatar: "🤖" },
  { role: "Security Engineer", name: "Alex Mercer", status: "IDLE", task: "OWASP Top 10 Audit", avatar: "🛡️" },
  { role: "QA Engineer", name: "Devon Hayes", status: "IDLE", task: "PyTest Suite Specs", avatar: "🧪" },
  { role: "DevOps Engineer", name: "Kaito Tanaka", status: "IDLE", task: "Docker Compose Configuration", avatar: "🐳" },
];

export function LiveAICompanyGrid() {
  return (
    <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">AI Organization — 14 Employee Roster</h2>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          All Systems Nominal
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {AGENT_ROLES.map((agent, i) => {
          const isWorking = agent.status === "EXECUTING" || agent.status === "THINKING";
          return (
            <div key={i} className="p-3 rounded-lg bg-[#151824] border border-white/5 hover:border-indigo-500/30 transition flex flex-col justify-between space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{agent.avatar}</span>
                  <div>
                    <h3 className="font-semibold text-gray-200 text-xs leading-tight">{agent.name}</h3>
                    <p className="text-[10px] text-gray-400 font-mono">{agent.role}</p>
                  </div>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    agent.status === "EXECUTING"
                      ? "bg-emerald-400 animate-ping"
                      : agent.status === "THINKING"
                      ? "bg-indigo-400 animate-pulse"
                      : "bg-gray-500"
                  }`}
                />
              </div>
              <p className="text-[11px] text-gray-400 truncate bg-white/5 p-1.5 rounded font-mono">
                {agent.task}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
