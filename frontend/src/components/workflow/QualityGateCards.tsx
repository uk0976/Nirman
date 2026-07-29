"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export const QualityGateCards: React.FC = () => {
  const gates = [
    { title: "Architecture Gate", status: "Passed", confidence: "96%", author: "Charlie" },
    { title: "Testing Suite Gate", status: "Pending", confidence: "Est 95%", author: "Ian" },
    { title: "Security Audit Gate", status: "Pending", confidence: "Est 98%", author: "Jack" },
    { title: "Documentation Gate", status: "Pending", confidence: "Est 99%", author: "Leo" },
    { title: "Deployment Gate", status: "Pending", confidence: "Est 98%", author: "Kate" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-6 text-left space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quality &amp; Security Validation Gates</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {gates.map((g) => (
          <div
            key={g.title}
            className={`p-3 rounded-xl border space-y-1.5 ${
              g.status === "Passed"
                ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                : "bg-black/40 border-white/[0.06] text-slate-400"
            }`}
          >
            <span className="text-[10px] font-mono text-slate-400 block">{g.title}</span>
            <span className="text-xs font-bold block text-white">{g.status}</span>
            <div className="flex items-center justify-between text-[9px] font-mono pt-1">
              <span>{g.author}</span>
              <span className={g.status === "Passed" ? "text-emerald-400 font-bold" : "text-slate-500"}>{g.confidence}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
