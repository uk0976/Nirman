"use client";

import React, { useState } from "react";
import { CheckCircle2, Activity, Clock, Workflow } from "lucide-react";

export const Timeline: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(4); // Backend stage

  const stages = [
    { title: "Requirement", agent: "Bob (PM)", status: "Done" },
    { title: "Planning", agent: "Alice (CEO)", status: "Done" },
    { title: "Architecture", agent: "Charlie", status: "Done" },
    { title: "Frontend", agent: "Evan", status: "Done" },
    { title: "Backend", agent: "Fiona", status: "Active" },
    { title: "Database", agent: "George", status: "Pending" },
    { title: "Testing", agent: "Ian (QA)", status: "Pending" },
    { title: "Security", agent: "Jack", status: "Pending" },
    { title: "Docs", agent: "Leo", status: "Pending" },
    { title: "Deployment", agent: "Kate", status: "Pending" },
    { title: "Completed", agent: "System", status: "Pending" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">11-Stage Software Engineering Pipeline</h3>
        </div>
        <span className="text-xs font-mono text-indigo-400">Current Stage: 5 - Backend API</span>
      </div>

      <div className="relative overflow-x-auto pb-4">
        {/* Track Line */}
        <div className="absolute top-[24px] inset-x-6 h-1 bg-white/[0.05] -z-10" />
        <div
          className="absolute top-[24px] left-6 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 -z-10 transition-all duration-700"
          style={{ width: `${(activeStageIdx / (stages.length - 1)) * 92}%` }}
        />

        <div className="flex justify-between items-start min-w-[900px] px-2 gap-2">
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
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isDone
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : isCurrent
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110"
                      : "border-white/10 bg-black/40 text-slate-600 group-hover:border-white/20"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Activity className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                <span
                  className={`text-[11px] font-bold mt-2.5 block truncate max-w-[70px] ${
                    isCurrent ? "text-white" : isDone ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {stg.title}
                </span>

                <span className="text-[9px] font-mono text-slate-500 block truncate max-w-[70px]">{stg.agent}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
