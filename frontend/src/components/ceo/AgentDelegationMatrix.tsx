import { Bot, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const DELEGATIONS = [
  { agent: "Business Analyst (Marcus Brody)", role: "Market Analysis", task: "Synthesize Target Personas & Competitor Matrix", status: "READY" },
  { agent: "Product Manager (Sarah Lin)", role: "Product Planning", task: "Draft PRD & SRS Specs with 45 User Stories", status: "READY" },
  { agent: "System Architect (Elena Rostova)", role: "System Topology", task: "Design Clean Architecture Modular Monolith Diagram", status: "QUEUED" },
  { agent: "Database Architect (David Chen)", role: "Data Modeling", task: "Model PostgreSQL 3NF Schema & Alembic Migrations", status: "QUEUED" },
  { agent: "Security Auditor (Alex Mercer)", role: "Security Audit", task: "Conduct OWASP Top 10 Audit & Security Guidelines", status: "QUEUED" }
];

export function AgentDelegationMatrix() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Downstream AI Agent Delegation Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          5 Agents Delegated
        </span>
      </div>

      <div className="space-y-2.5">
        {DELEGATIONS.map((d, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{d.agent}</span>
                <span className="text-[10px] text-indigo-400">({d.role})</span>
              </div>
              <p className="text-[11px] text-gray-300 font-sans">{d.task}</p>
            </div>

            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                d.status === "READY"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
