import { Cpu, ArrowRight, CheckCircle2 } from "lucide-react";

const STATES = [
  "REGISTERED",
  "INITIALIZED",
  "READY",
  "ASSIGNED_TASK",
  "PLANNING",
  "EXECUTING",
  "WAITING_DEPENDENCIES",
  "WAITING_HUMAN_APPROVAL",
  "COMPLETED"
];

export function LifecycleStateVisualizer() {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Agent Lifecycle State Machine</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Deterministic Transitions
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {STATES.map((st, i) => (
          <div key={st} className="flex items-center gap-1.5 shrink-0">
            <div className="p-2.5 rounded-xl bg-[#151824] border border-indigo-500/30 text-center space-y-1">
              <span className="text-[9px] text-indigo-400 font-bold">Step {i + 1}</span>
              <p className="font-bold text-white text-[10px]">{st}</p>
            </div>
            {i < STATES.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
