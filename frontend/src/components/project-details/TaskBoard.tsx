import { CheckCircle2, Clock, Bot, User, Play } from "lucide-react";

const STAGE_TASKS = [
  { id: "t-1", phase: "Phase 1: Product Discovery", title: "Market Research & Persona Synthesis", agent: "Marcus Brody (BA)", status: "COMPLETED", duration: "1.2m" },
  { id: "t-2", phase: "Phase 2: Requirement Gathering", title: "PRD & SRS Specification Synthesis", agent: "Sarah Lin (PM)", status: "COMPLETED", duration: "2.4m" },
  { id: "t-3", phase: "Phase 6: PRD & SRS Specs", title: "User Story Backlog Generation", agent: "Sarah Lin (PM)", status: "IN_PROGRESS", duration: "Running..." },
  { id: "t-4", phase: "Phase 7: System Architecture", title: "Clean Architecture Modular Topology", agent: "Elena Rostova (System Architect)", status: "PENDING", duration: "Queued" },
  { id: "t-5", phase: "Phase 8: Database 3NF", title: "PostgreSQL 3NF Schema & Migrations", agent: "David Chen (DB Architect)", status: "PENDING", duration: "Queued" }
];

export function TaskBoard() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="font-bold text-white uppercase text-xs">SDLC Phase Tasks & Agent Executions</h3>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          5 Tasks Active
        </span>
      </div>

      <div className="space-y-2.5">
        {STAGE_TASKS.map((t) => (
          <div key={t.id} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{t.title}</span>
                <span className="text-[10px] text-indigo-400">({t.phase})</span>
              </div>
              <p className="text-[11px] text-gray-400 font-sans">Assigned Agent: {t.agent}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500">{t.duration}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  t.status === "COMPLETED"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : t.status === "IN_PROGRESS"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                    : "bg-white/5 text-gray-400"
                }`}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
