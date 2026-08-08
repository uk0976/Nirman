import { Sparkles, CheckCircle2 } from "lucide-react";

interface AISpecItem {
  component: string;
  spec: string;
}

interface AIComponentSpecsProps {
  specs: AISpecItem[];
}

export function AIComponentSpecs({ specs }: AIComponentSpecsProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">AI-Native Component UX Specifications</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Component Specs Ready
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">AI Component</th>
              <th className="p-3.5">UX & Interaction Specification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {specs.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{item.component}</td>
                <td className="p-3.5 text-gray-300 font-sans text-xs">{item.spec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
