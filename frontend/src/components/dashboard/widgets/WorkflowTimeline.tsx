"use client";

import React, { useState } from "react";
import { CheckCircle2, Activity, Clock, Workflow } from "lucide-react";

export const WorkflowTimeline: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(3); // Development stage

  const stages = [
    { title: "Requirement", agent: "Bob (PM)", status: "Completed" },
    { title: "Planning", agent: "Alice (CEO)", status: "Completed" },
    { title: "Architecture", agent: "Charlie (Architect)", status: "Completed" },
    { title: "Development", agent: "Fiona & Evan", status: "In Progress" },
    { title: "Testing", agent: "Ian (QA)", status: "Pending" },
    { title: "Deployment", agent: "Kate (DevOps)", status: "Pending" },
    { title: "Completed", agent: "Leo (Docs)", status: "Pending" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Autonomous Execution Pipeline Stage</h3>
        </div>
        <span className="text-xs font-mono text-indigo-400">Active Workflow: Sprint 1 Build</span>
      </div>

      <div className="relative overflow-x-auto pb-4">
        {/* Track Line */}
        <div className="absolute top-[28px] inset-x-8 h-1 bg-white/[0.05] -z-10" />
        <div
          className="absolute top-[28px] left-8 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -z-10 transition-all duration-700"
          style={{ width: `${(activeStageIdx / (stages.length - 1)) * 90}%` }}
        />

        <div className="flex justify-between items-start min-w-[700px] px-4 gap-4">
          {stages.map((stg, i) => {
            const isDone = i < activeStageIdx;
            const isCurrent = i === activeStageIdx;

            return (
              <button
                key={stg.title}
                onClick={() => setActiveStageIdx(i)}
                className="flex flex-col items-center flex-1 group text-center focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isDone
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : isCurrent
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110"
                      : "border-white/10 bg-black/40 text-slate-600 group-hover:border-white/20"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isCurrent ? (
                    <Activity className="w-6 h-6 animate-pulse" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>

                <span
                  className={`text-xs font-bold mt-3 block transition-colors ${
                    isCurrent ? "text-white" : isDone ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {stg.title}
                </span>

                <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">{stg.agent}</span>

                <span
                  className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${
                    isDone
                      ? "bg-emerald-500/10 text-emerald-400"
                      : isCurrent
                      ? "bg-indigo-500/20 text-indigo-300 animate-pulse"
                      : "bg-white/[0.04] text-slate-600"
                  }`}
                >
                  {stg.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
