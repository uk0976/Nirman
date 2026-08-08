import { Activity, ShieldCheck, Database, Zap } from "lucide-react";

export function HardeningTelemetryCards() {
  const metrics = [
    { title: "P99 API Latency", val: "118 ms", subtitle: "< 150ms SLA target", icon: Zap, color: "text-amber-400" },
    { title: "Multi-Tenant RLS Score", val: "100.0%", subtitle: "0 cross-tenant leaks", icon: ShieldCheck, color: "text-emerald-400" },
    { title: "OWASP SAST/DAST Audit", val: "0 Findings", subtitle: "Clean Semgrep/ZAP scan", icon: Activity, color: "text-indigo-400" },
    { title: "Disaster Recovery Target", val: "RPO < 5m", subtitle: "RTO < 15m PITR Active", icon: Database, color: "text-cyan-400" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase">{m.title}</span>
              <Icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <p className="text-xl font-bold text-white">{m.val}</p>
            <p className="text-[10px] text-gray-400 font-sans">{m.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
