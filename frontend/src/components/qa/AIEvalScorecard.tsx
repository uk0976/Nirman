import { Sparkles, ShieldAlert, CheckCircle2 } from "lucide-react";

interface AgentEvalItem {
  agent: string;
  schema_compliance: string;
  prompt_injection_defense: string;
  overall_score: number;
}

interface AIEvalScorecardProps {
  evals: AgentEvalItem[];
}

export function AIEvalScorecard({ evals }: AIEvalScorecardProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">AI Agent Non-Deterministic Evaluation Scorecards</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          98.2% Platform Avg Score
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {evals.map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
            <span className="font-bold text-white text-xs">{item.agent}</span>
            <div className="space-y-1 text-[11px] font-sans text-gray-300">
              <div className="flex justify-between">
                <span>Schema Compliance:</span>
                <strong className="text-emerald-400 font-mono">{item.schema_compliance}</strong>
              </div>
              <div className="flex justify-between">
                <span>Prompt Injection Defense:</span>
                <strong className="text-indigo-300 font-mono">{item.prompt_injection_defense}</strong>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between border-t border-white/5 text-xs font-mono">
              <span className="text-gray-400">Eval Rating:</span>
              <span className="text-emerald-300 font-bold">{item.overall_score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
