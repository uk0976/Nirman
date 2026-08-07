import { ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface MoSCoWData {
  must_have: string[];
  should_have: string[];
  could_have: string[];
  wont_have_current: string[];
}

interface MoSCoWMatrixProps {
  data: MoSCoWData;
}

export function MoSCoWMatrix({ data }: MoSCoWMatrixProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">MoSCoW Feature Prioritization Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          RICE Scored
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Must Have */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
          <span className="font-bold text-emerald-300 text-xs">MUST HAVE (Non-Negotiable MVP)</span>
          <ul className="text-xs text-gray-300 font-sans space-y-1.5 list-disc pl-4">
            {data.must_have.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Should Have */}
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
          <span className="font-bold text-indigo-300 text-xs">SHOULD HAVE (High Value Release 1)</span>
          <ul className="text-xs text-gray-300 font-sans space-y-1.5 list-disc pl-4">
            {data.should_have.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Could Have */}
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
          <span className="font-bold text-purple-300 text-xs">COULD HAVE (Nice to Have Phase 2)</span>
          <ul className="text-xs text-gray-300 font-sans space-y-1.5 list-disc pl-4">
            {data.could_have.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Won't Have */}
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
          <span className="font-bold text-red-300 text-xs">WON'T HAVE (Current Release Out of Scope)</span>
          <ul className="text-xs text-gray-300 font-sans space-y-1.5 list-disc pl-4">
            {data.wont_have_current.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
