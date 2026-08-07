import { ArrowRight, Terminal } from "lucide-react";

interface StepItem {
  step: number;
  from: string;
  to: string;
  action: string;
}

interface SequenceDiagramViewerProps {
  steps: StepItem[];
}

export function SequenceDiagramViewer({ steps }: SequenceDiagramViewerProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Service Interaction Sequence Diagram</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Request Execution Flow
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="p-3.5 rounded-xl bg-[#151824] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-indigo-400">Step {s.step}</span>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-gray-400 font-bold">{s.from}</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-emerald-300 font-bold">{s.to}</span>
              </div>
            </div>
            <p className="text-gray-200 text-xs font-sans mt-1 bg-[#0D0F17] p-2 rounded border border-white/5">
              {s.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
