"use client";

import React from "react";
import { Cpu, ShieldCheck, Code, FileText, Workflow, CheckCircle2 } from "lucide-react";

export const CapabilitiesGrid: React.FC = () => {
  const caps = [
    { title: "Autonomous Planning", desc: "Scope sizing and feature breakdown by CEO & PM agents.", icon: Workflow },
    { title: "Layered System Architecture", desc: "Multi-tier design pattern enforcement by Architect Charlie.", icon: FileText },
    { title: "Full-Stack Code Generation", desc: "FastAPI & Next.js codegen powered by Codex engine.", icon: Code },
    { title: "Automated QA Test Suites", desc: "Endpoint assertion generation and Pytest execution.", icon: ShieldCheck },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Autonomous Engineering Capabilities</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {caps.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
              <Icon className="w-5 h-5 text-indigo-400" />
              <h4 className="text-xs font-bold text-white">{c.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
