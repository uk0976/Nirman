import { Database, Key, ShieldCheck } from "lucide-react";

interface DictionaryItem {
  table: string;
  columns_count: number;
  primary_key: string;
  tenant_scoped: string;
}

interface DataDictionaryTableProps {
  dictionary: DictionaryItem[];
}

export function DataDictionaryTable({ dictionary }: DataDictionaryTableProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">PostgreSQL 3NF Data Dictionary</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          5 Core Tables Defined
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Table Name</th>
              <th className="p-3.5">Columns Count</th>
              <th className="p-3.5">Primary Key</th>
              <th className="p-3.5">Multi-Tenant Scoped</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {dictionary.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400">{item.table}</td>
                <td className="p-3.5 text-gray-300 font-sans">{item.columns_count} columns</td>
                <td className="p-3.5 font-bold text-white text-xs">{item.primary_key}</td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.tenant_scoped.startsWith("Yes")
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {item.tenant_scoped}
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
