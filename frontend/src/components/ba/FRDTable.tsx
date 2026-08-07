import { FileCode2, CheckCircle2, AlertCircle } from "lucide-react";

interface FRDItem {
  req_id: string;
  title: string;
  description: string;
  priority: string;
  business_value: string;
  acceptance_criteria: string;
  status: string;
}

interface FRDTableProps {
  requirements: FRDItem[];
}

export function FRDTable({ requirements }: FRDTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Functional Requirements Document (FRD v1.0)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          {requirements.length} Requirements Verified
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Req ID</th>
              <th className="p-3.5">Requirement Title</th>
              <th className="p-3.5">Priority</th>
              <th className="p-3.5">Acceptance Criteria</th>
              <th className="p-3.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {requirements.map((req) => (
              <tr key={req.req_id} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{req.req_id}</td>
                <td className="p-3.5 space-y-0.5">
                  <p className="font-bold text-white text-xs">{req.title}</p>
                  <p className="text-[11px] text-gray-400 font-sans">{req.description}</p>
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      req.priority === "CRITICAL"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    }`}
                  >
                    {req.priority}
                  </span>
                </td>
                <td className="p-3.5 text-gray-300 font-sans text-xs max-w-xs">{req.acceptance_criteria}</td>
                <td className="p-3.5 text-right text-emerald-400 font-bold">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
