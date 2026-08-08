import { Server, ShieldCheck, Zap } from "lucide-react";

interface RouteItem {
  method: string;
  path: string;
  dto: string;
  rate_limit: string;
}

interface RouteRegistryTableProps {
  routes: RouteItem[];
}

export function RouteRegistryTable({ routes }: RouteRegistryTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">FastAPI Versioned REST Route Registry (/api/v1)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          OpenAPI 3.1 Spec Sync
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">HTTP Method</th>
              <th className="p-3.5">Endpoint Path</th>
              <th className="p-3.5">Pydantic DTO Model</th>
              <th className="p-3.5">Rate Limit Policy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {routes.map((r, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.method === "GET"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    }`}
                  >
                    {r.method}
                  </span>
                </td>
                <td className="p-3.5 font-bold text-white text-xs">{r.path}</td>
                <td className="p-3.5 font-mono text-indigo-300 text-xs">{r.dto}</td>
                <td className="p-3.5 text-gray-300 font-sans text-xs">{r.rate_limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
