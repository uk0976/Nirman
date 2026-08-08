import { Cpu, Lock, CheckCircle2, AlertTriangle } from "lucide-react";

interface SandboxingItem {
  agent: string;
  allowed_tools: string[];
  human_approval_required: boolean;
}

interface AIToolSandboxingMatrixProps {
  sandboxing: SandboxingItem[];
}

export function AIToolSandboxingMatrix({ sandboxing }: AIToolSandboxingMatrixProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      <div className="p-4 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">AI Agent Least-Privilege Tool Sandboxing Matrix</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Least-Privilege Enforced
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
              <th className="p-3.5">SDLC Agent Role</th>
              <th className="p-3.5">Whitelisted Execution Tools</th>
              <th className="p-3.5">Human Approval Gate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sandboxing.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition">
                <td className="p-3.5 font-bold text-white text-xs">{item.agent}</td>
                <td className="p-3.5">
                  <div className="flex flex-wrap gap-1">
                    {item.allowed_tools.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3.5">
                  {item.human_approval_required ? (
                    <span className="px-2.5 py-1 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1 w-fit">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span>MANDATORY APPROVAL</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>AUTONOMOUS PERMITTED</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
