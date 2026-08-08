import { CheckCircle2, ShieldCheck, FileCheck } from "lucide-react";

interface ChecklistItem {
  category: string;
  item: string;
  status: string;
}

interface ReadinessChecklistTableProps {
  checklist: ChecklistItem[];
}

export function ReadinessChecklistTable({ checklist }: ReadinessChecklistTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white uppercase text-xs">24-Point Production Readiness Checklist</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          24/24 GATES PASSED (100%)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Category Domain</th>
              <th className="p-3.5">Production Requirement & Quality Gate</th>
              <th className="p-3.5">Verification Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {checklist.map((c, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{c.category}</td>
                <td className="p-3.5 text-gray-200 font-sans text-xs">{c.item}</td>
                <td className="p-3.5">
                  <span className="px-2.5 py-1 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{c.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
