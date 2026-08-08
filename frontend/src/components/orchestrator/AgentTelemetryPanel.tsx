import { Cpu, DollarSign, Activity, ScrollText } from "lucide-react";

interface TelemetryProps {
  tokens: number;
  costUsd: number;
  logs: Array<{ timestamp: string; agent_name?: string; role?: string; status?: string; event?: string }>;
}

export function AgentTelemetryPanel({ tokens, costUsd, logs }: TelemetryProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* Telemetry Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Accumulated Tokens</span>
              <p className="text-base font-bold text-white">{tokens.toLocaleString()} Tokens</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Estimated AI Cost</span>
              <p className="text-base font-bold text-emerald-300">${costUsd.toFixed(4)} USD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Log Stream */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <ScrollText className="w-4 h-4 text-gray-400" />
          <h3 className="font-bold text-white uppercase text-xs">Real-Time Orchestrator Log Stream</h3>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 space-y-2 max-h-48 overflow-y-auto font-mono text-[11px]">
          {logs.length === 0 ? (
            <p className="text-gray-500 italic">No events logged yet. Click &quot;Execute Next Step&quot; to begin.</p>
          ) : (
            logs.map((l, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-white/5 pb-1">
                <span className="text-gray-400">{l.timestamp?.substring(11, 19)}</span>
                <span className="text-indigo-300 font-bold">{l.agent_name || l.event}</span>
                <span className="text-emerald-400 font-bold">{l.status || "EVENT"}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
