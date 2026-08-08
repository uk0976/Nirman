import { ShieldCheck, CheckCircle2, FileText } from "lucide-react";

interface MatrixItem {
  req_id: string;
  test_id: string;
  feature: string;
  type: string;
  status: string;
}

interface TraceabilityMatrixTableProps {
  matrix: MatrixItem[];
}

export function TraceabilityMatrixTable({ matrix }: TraceabilityMatrixTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Requirement-to-Test Case Traceability Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          100% Traceability Covered
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Requirement ID</th>
              <th className="p-3.5">Test Case ID</th>
              <th className="p-3.5">Feature Specification</th>
              <th className="p-3.5">Test Type</th>
              <th className="p-3.5">Execution Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {matrix.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{item.req_id}</td>
                <td className="p-3.5 font-mono text-emerald-300 font-bold">{item.test_id}</td>
                <td className="p-3.5 font-bold text-white text-xs">{item.feature}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-200 border border-purple-500/30 font-bold">
                    {item.type}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{item.status}</span>
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
