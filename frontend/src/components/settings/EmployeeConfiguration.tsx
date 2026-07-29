"use client";

import React, { useState } from "react";
import { Users, Shield, Cpu, Sliders, CheckCircle2 } from "lucide-react";

export const EmployeeConfiguration: React.FC = () => {
  const [agents] = useState([
    { name: "Alice", role: "CEO", model: "gpt-4o", autonomy: "Full Autonomy", approval: false },
    { name: "Bob", role: "Product Manager", model: "claude-3-5-sonnet", autonomy: "High Autonomy", approval: false },
    { name: "Charlie", role: "Software Architect", model: "o1-preview", autonomy: "High Autonomy", approval: true },
    { name: "Evan", role: "Frontend Engineer", model: "gpt-4o", autonomy: "Full Autonomy", approval: false },
    { name: "Fiona", role: "Backend Engineer", model: "gpt-4o-code", autonomy: "Full Autonomy", approval: false },
    { name: "Jack", role: "Security Engineer", model: "claude-3-5-sonnet", autonomy: "Strict Gatekeeper", approval: true },
  ]);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">AI Employee Workforce Configuration</h2>
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((ag) => (
          <div
            key={ag.name}
            className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs font-mono"
          >
            <div>
              <span className="font-bold text-white font-sans text-sm block">{ag.name} ({ag.role})</span>
              <span className="text-slate-400">Assigned Model: <strong className="text-indigo-300">{ag.model}</strong></span>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
                {ag.autonomy}
              </span>
              <button className="px-3 py-1 rounded bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.06]">
                Configure Rules
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
