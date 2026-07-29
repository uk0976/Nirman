"use client";

import React, { useState } from "react";
import { Workflow, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export const ExecutionGraph: React.FC = () => {
  const nodes = [
    { id: "1", label: "Spec Sizing", agent: "Bob", status: "Done" },
    { id: "2", label: "Architecture Blueprint", agent: "Charlie", status: "Done" },
    { id: "3", label: "FastAPI Routing", agent: "Fiona", status: "Running" },
    { id: "4", label: "PostgreSQL DDL", agent: "George", status: "Pending" },
    { id: "5", label: "Pytest Suite", agent: "Ian", status: "Pending" },
    { id: "6", label: "Docker Build", agent: "Kate", status: "Pending" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-6 text-left space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Workflow Task Dependency Graph</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Parallel Execution Graph</span>
      </div>

      <div className="p-6 rounded-xl bg-[#050508] border border-white/10 overflow-x-auto flex items-center justify-between min-w-[750px] gap-3">
        {nodes.map((nd, i) => (
          <React.Fragment key={nd.id}>
            <div
              className={`p-3 rounded-xl border text-center shrink-0 w-32 ${
                nd.status === "Done"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : nd.status === "Running"
                  ? "bg-indigo-600/20 border-indigo-500/40 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse"
                  : "bg-black/40 border-white/[0.06] text-slate-500"
              }`}
            >
              <span className="text-xs font-bold block">{nd.label}</span>
              <span className="text-[9px] font-mono block mt-0.5">{nd.agent} • {nd.status}</span>
            </div>

            {i < nodes.length - 1 && (
              <ArrowRight className={`w-4 h-4 shrink-0 ${nd.status === "Done" ? "text-emerald-400" : "text-slate-600"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
