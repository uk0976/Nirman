"use client";

import React from "react";
import { Users, Activity, Sparkles, Cpu } from "lucide-react";

export const AIEmployeePanel: React.FC = () => {
  const assigned = [
    { name: "Alice", role: "CEO", dept: "Executive", avatar: "👩‍💼", status: "Reviewing", task: "Sprint 1 Gateway Approval", confidence: 96, model: "gpt-4o", tokens: "45K" },
    { name: "Bob", role: "Product Manager", dept: "Product", avatar: "👨‍💻", status: "Planning", task: "PRD Scope Sizing", confidence: 94, model: "gpt-4o", tokens: "32K" },
    { name: "Charlie", role: "Architect", dept: "Architecture", avatar: "👨‍🔬", status: "Idle", task: "FastAPI Blueprint Completed", confidence: 92, model: "gpt-4o", tokens: "88K" },
    { name: "Fiona", role: "Backend Engineer", dept: "Backend", avatar: "👩‍💻", status: "Coding", task: "FastAPI Router Endpoints", confidence: 95, model: "gpt-4o-code (Codex)", tokens: "142K" },
    { name: "Ian", role: "QA Engineer", dept: "Quality", avatar: "🕵️‍♂️", status: "Testing", task: "Running Pytest Suite", confidence: 98, model: "gpt-4o-mini", tokens: "28K" },
    { name: "Jack", role: "Security Engineer", dept: "Security", avatar: "🛡️", status: "Reviewing", task: "Sanitizing Headers", confidence: 95, model: "gpt-4o", tokens: "19K" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Assigned AI Employees</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">6 Agents Collaborating</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assigned.map((agent) => (
          <div
            key={agent.name}
            className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{agent.avatar}</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {agent.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{agent.name}</h4>
              <span className="text-[11px] font-mono text-indigo-400 block mb-3">{agent.role}</span>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] mb-3 space-y-0.5">
                <span className="text-[9px] font-mono text-slate-500 uppercase block">Current Task</span>
                <p className="text-xs text-slate-300 font-medium truncate">{agent.task}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>Model: <strong className="text-slate-200">{agent.model}</strong></span>
              <span>Tokens: <strong className="text-indigo-400">{agent.tokens}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
