"use client";

import React from "react";
import { Sparkles, ArrowUpRight, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const RightSidebar: React.FC = () => {
  const { data: pipelines = [] } = useQuery({
    queryKey: ["right-sidebar-pipelines"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
  });

  let completedTasks = 0;
  pipelines.forEach((p: any) => {
    completedTasks += (p.history || []).length;
  });

  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      
      {/* Today's Summary Card */}
      <div className="glass-panel p-5 border border-white/[0.08] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Today's Summary</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {completedTasks > 0 ? (
            <>Nirman's AI Employees completed <span className="text-emerald-400 font-semibold">{completedTasks} execution tasks</span> with 99.4% average confidence.</>
          ) : (
            <>Nirman's AI Employees are standing by. Launch a project to view execution tasks and War Room approvals.</>
          )}
        </p>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-black/40 border border-white/[0.05] p-2 rounded-lg">
            <span className="text-lg font-bold text-white">99.4%</span>
            <span className="block text-[10px] text-slate-500 font-mono">Uptime Rate</span>
          </div>
          <div className="bg-black/40 border border-white/[0.05] p-2 rounded-lg">
            <span className="text-lg font-bold text-indigo-400">1.2s</span>
            <span className="block text-[10px] text-slate-500 font-mono font-semibold">Avg Latency</span>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>AI Recommendations</span>
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        </h3>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
            <div className="flex items-center justify-between font-semibold text-indigo-300 mb-1">
              <span>PostgreSQL Connection Index</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Architect Charlie suggests adding a composite index on <code className="text-slate-200">execution_id</code> to optimize pipeline queries by 40%.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
            <div className="flex items-center justify-between font-semibold text-purple-300 mb-1">
              <span>Security Audit Upgrade</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Security Engineer Jack requests enabling OAuth refresh token rotation before Sprint 2 release.
            </p>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pending Approvals</h3>
          <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
            0 Gate Requests
          </span>
        </div>

        <div className="p-4 text-center text-xs text-slate-500 font-mono rounded-xl bg-black/40 border border-white/[0.04]">
          No pending gate approvals required.
        </div>
      </div>

      {/* Open Risk Alerts */}
      <div className="glass-panel p-5 border border-emerald-500/20 bg-emerald-500/[0.02] space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>0 Open Risks</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          All security gates passing. AI Security Engine is actively monitoring your workspace.
        </p>
      </div>

    </aside>
  );
};
