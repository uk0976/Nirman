import { Activity, ShieldCheck, AlertCircle } from "lucide-react";

interface MetricItem {
  metric: string;
  tool: string;
  threshold: string;
  alert_channel: string;
}

interface DisasterRecovery {
  rpo: string;
  rto: string;
  backup_retention: string;
  rollback_procedure: string;
}

interface ObservabilityDashboardProps {
  metrics: MetricItem[];
  dr: DisasterRecovery;
}

export function ObservabilityDashboard({ metrics, dr }: ObservabilityDashboardProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 font-mono text-xs">
      {/* Metrics & Alert Rules */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white uppercase text-xs">Prometheus Metrics & Grafana Alert Rules</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Real-Time Telemetry
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#151824] text-gray-400 font-bold uppercase text-[10px]">
                <th className="p-3">Monitored Metric</th>
                <th className="p-3">Tooling</th>
                <th className="p-3">Alert Threshold</th>
                <th className="p-3">Notification Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition">
                  <td className="p-3 font-bold text-indigo-400">{m.metric}</td>
                  <td className="p-3 font-bold text-white text-xs">{m.tool}</td>
                  <td className="p-3 text-red-300 font-mono text-xs">{m.threshold}</td>
                  <td className="p-3 text-emerald-300 font-sans text-xs">{m.alert_channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup & Disaster Recovery */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white uppercase text-xs">Backup & Disaster Recovery (DR) Targets</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-indigo-300 text-xs">RECOVERY POINT OBJECTIVE (RPO)</span>
            <p className="text-[11px] text-gray-300 font-sans">{dr.rpo}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="font-bold text-emerald-300 text-xs">RECOVERY TIME OBJECTIVE (RTO)</span>
            <p className="text-[11px] text-gray-300 font-sans">{dr.rto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
