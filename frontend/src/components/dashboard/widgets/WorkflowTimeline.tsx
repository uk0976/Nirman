"use client";

import React from "react";
import { CheckCircle2, Activity, Clock, Workflow } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const WorkflowTimeline: React.FC = () => {
  const { data: pipelineList = [] } = useQuery({
    queryKey: ["active-pipelines-timeline"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
    refetchInterval: 3000,
  });

  const activePipeline = pipelineList.length > 0 ? pipelineList[pipelineList.length - 1] : null;
  
  const defaultStages = [
    { title: "Requirements", agent: "Bob (PM)", status: "PENDING" },
    { title: "Planning", agent: "Bob (PM)", status: "PENDING" },
    { title: "Architecture", agent: "Charlie (Architect)", status: "PENDING" },
    { title: "Frontend", agent: "Evan (Frontend)", status: "PENDING" },
    { title: "Backend", agent: "Fiona (Backend)", status: "PENDING" },
    { title: "Database", agent: "George (Database)", status: "PENDING" },
    { title: "Testing", agent: "Ian (QA)", status: "PENDING" },
    { title: "Documentation", agent: "Leo (Docs)", status: "PENDING" },
    { title: "Deployment", agent: "Kate (DevOps)", status: "PENDING" },
  ];

  const stages = activePipeline?.stages || defaultStages;
  const activeStageIdx = activePipeline ? activePipeline.current_stage_idx : -1;

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Autonomous Execution Pipeline</h3>
        </div>
        <span className="text-xs font-mono text-indigo-400">
          {activePipeline ? `Active: Project ${activePipeline.project_id}` : "Idle Pipeline Engine"}
        </span>
      </div>

      {!activePipeline ? (
        <div className="py-8 text-center text-xs text-slate-500 font-mono">
          No active workflow running. Click <span className="text-indigo-400 font-semibold">+ New Requirement</span> to launch the 9-stage AI build engine.
        </div>
      ) : (
        <div className="relative overflow-x-auto pb-4">
          <div className="absolute top-[28px] inset-x-8 h-1 bg-white/[0.05] -z-10" />
          <div
            className="absolute top-[28px] left-8 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -z-10 transition-all duration-700"
            style={{ width: `${Math.max(0, (activeStageIdx / (stages.length - 1)) * 90)}%` }}
          />

          <div className="flex justify-between items-start min-w-[800px] px-4 gap-4">
            {stages.map((stg: any, i: number) => {
              const isDone = stg.status === "COMPLETED" || i < activeStageIdx;
              const isCurrent = i === activeStageIdx && stg.status !== "COMPLETED";

              return (
                <div
                  key={stg.name || stg.title}
                  className="flex flex-col items-center flex-1 group text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isDone
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : isCurrent
                        ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110"
                        : "border-white/10 bg-black/40 text-slate-600"
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
                    className={`text-[11px] font-bold mt-2.5 block transition-colors ${
                      isCurrent ? "text-white" : isDone ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {stg.name || stg.title}
                  </span>

                  <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
                    {stg.assigned_agent || stg.agent}
                  </span>

                  <span
                    className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full mt-1.5 inline-block ${
                      isDone
                        ? "bg-emerald-500/10 text-emerald-400"
                        : isCurrent
                        ? "bg-indigo-500/20 text-indigo-300 animate-pulse"
                        : "bg-white/[0.04] text-slate-600"
                    }`}
                  >
                    {stg.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
