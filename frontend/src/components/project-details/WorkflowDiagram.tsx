"use client";

import React from "react";
import { Workflow, CheckCircle2, ArrowRight, Activity } from "lucide-react";

export const WorkflowDiagram: React.FC = () => {
  const steps = [
    { title: "Requirement", state: "Completed" },
    { title: "Planning", state: "Completed" },
    { title: "Architecture", state: "Completed" },
    { title: "Development", state: "Active" },
    { title: "Testing", state: "Pending" },
    { title: "Deployment", state: "Pending" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Multi-Agent Workflow State Diagram</h3>
        </div>
        <span className="text-xs font-mono text-emerald-400">Sequential Execution Engine</span>
      </div>

      <div className="flex items-center justify-between overflow-x-auto pb-4 gap-3">
        {steps.map((st, i) => (
          <React.Fragment key={st.title}>
            <div
              className={`p-3 rounded-xl border text-center shrink-0 w-32 ${
                st.state === "Completed"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : st.state === "Active"
                  ? "bg-indigo-500/20 border-indigo-500/40 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse"
                  : "bg-black/40 border-white/[0.06] text-slate-500"
              }`}
            >
              <span className="text-xs font-bold block">{st.title}</span>
              <span className="text-[9px] font-mono block mt-0.5">{st.state}</span>
            </div>

            {i < steps.length - 1 && (
              <ArrowRight className={`w-4 h-4 shrink-0 ${st.state === "Completed" ? "text-emerald-400" : "text-slate-600"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
