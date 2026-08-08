import { ShieldAlert, ShieldCheck } from "lucide-react";

interface STRIDEItem {
  category: string;
  asset: string;
  vulnerability: string;
  mitigation: string;
}

interface STRIDEThreatTableProps {
  threats: STRIDEItem[];
}

export function STRIDEThreatTable({ threats }: STRIDEThreatTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">STRIDE Threat Model & Mitigations Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          6 STRIDE Categories Mitigated
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">STRIDE Category</th>
              <th className="p-3.5">Target Asset</th>
              <th className="p-3.5">Identified Vulnerability</th>
              <th className="p-3.5">Architectural Mitigation Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {threats.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{item.category}</td>
                <td className="p-3.5 font-bold text-white text-xs">{item.asset}</td>
                <td className="p-3.5 text-red-300 font-sans text-xs">{item.vulnerability}</td>
                <td className="p-3.5 text-emerald-300 font-sans text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item.mitigation}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
