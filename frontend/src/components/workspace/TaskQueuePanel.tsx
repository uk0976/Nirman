import { CheckSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const TASK_QUEUE = [
  { id: "1", title: "Product Discovery & Market Research", phase: "Phase 1", agent: "Business Analyst", priority: "HIGH", status: "COMPLETED", progress: 100, duration: "1.2m" },
  { id: "2", title: "PRD & SRS Specifications Synthesis", phase: "Phase 6", agent: "Product Manager", priority: "CRITICAL", status: "COMPLETED", progress: 100, duration: "2.4m" },
  { id: "3", title: "Clean Architecture Modular Topology", phase: "Phase 7", agent: "System Architect", priority: "CRITICAL", status: "IN_PROGRESS", progress: 65, duration: "Running..." },
  { id: "4", title: "PostgreSQL 3NF Schema & Migrations", phase: "Phase 8", agent: "Database Architect", priority: "HIGH", status: "WAITING_APPROVAL", progress: 90, duration: "Paused" },
  { id: "5", title: "FastAPI Async Services & Endpoints", phase: "Phase 9", agent: "Backend Engineer", priority: "HIGH", status: "QUEUED", progress: 0, duration: "Queued" },
  { id: "6", title: "PyTest Async Unit Suites", phase: "Phase 16", agent: "QA Engineer", priority: "MEDIUM", status: "QUEUED", progress: 0, duration: "Queued" }
];

export function TaskQueuePanel() {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Live SDLC Task Execution Queue</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          6 Tasks Queued
        </span>
      </div>

      <div className="space-y-3">
        {TASK_QUEUE.map((task) => (
          <div key={task.id} className="p-4 rounded-2xl bg-[#151824] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{task.title}</span>
                <span className="text-[10px] text-indigo-400">({task.phase})</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                  task.priority === "CRITICAL"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                    : task.priority === "HIGH"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-white/5 text-gray-400"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans">
              <span>Assigned Agent: <strong className="text-gray-200 font-mono">{task.agent}</strong></span>
              <span className="font-mono text-[10px]">{task.duration}</span>
            </div>

            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  task.status === "COMPLETED"
                    ? "bg-emerald-400"
                    : task.status === "IN_PROGRESS"
                    ? "bg-indigo-500 animate-pulse"
                    : task.status === "WAITING_APPROVAL"
                    ? "bg-amber-400"
                    : "bg-gray-600"
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
