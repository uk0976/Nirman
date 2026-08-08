import { Users, Sparkles } from "lucide-react";

interface AgentRoleItem {
  role: string;
  focus: string;
}

interface AgentSpecsRosterProps {
  roster: AgentRoleItem[];
}

export function AgentSpecsRoster({ roster }: AgentSpecsRosterProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Complete 14 Autonomous SDLC AI Agent Specifications</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          14 Agents Documented
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">Specialized SDLC Agent Role</th>
              <th className="p-3.5">Core Focus & System Responsibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {roster.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{item.role}</span>
                </td>
                <td className="p-3.5 text-gray-200 font-sans text-xs">{item.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
