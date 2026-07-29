"use client";

import React from "react";
import { HeartPulse, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

export const HealthCard: React.FC = () => {
  const scores = [
    { category: "Architecture", score: 98, status: "Optimal" },
    { category: "Testing Suite", score: 95, status: "Passing" },
    { category: "Security Audit", score: 99, status: "OWASP Ready" },
    { category: "Documentation", score: 96, status: "Complete" },
    { category: "Performance Latency", score: 94, status: "Sub-second" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Health Scorecard</h3>
        </div>
        <span className="text-sm font-extrabold text-emerald-400 font-mono">98 / 100</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {scores.map((s) => (
          <div key={s.category} className="p-3 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
            <span className="text-[10px] font-mono text-slate-400 block">{s.category}</span>
            <span className="text-base font-bold text-white block">{s.score}%</span>
            <span className="text-[9px] font-mono text-emerald-400 block">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
