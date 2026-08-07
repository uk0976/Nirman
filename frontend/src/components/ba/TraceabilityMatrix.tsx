import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";

interface MatrixItem {
  business_goal: string;
  func_req: string;
  user_story: string;
  use_case: string;
  test_case: string;
}

interface TraceabilityMatrixProps {
  matrix: MatrixItem[];
}

export function TraceabilityMatrix({ matrix }: TraceabilityMatrixProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Requirement Traceability Matrix (RTM)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          100% Traceability
        </span>
      </div>

      <div className="space-y-3">
        {matrix.map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#151824] border border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase">Goal:</span>
              <span className="font-bold text-white text-xs">{item.business_goal}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{item.func_req}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">{item.user_story}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{item.test_case}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
