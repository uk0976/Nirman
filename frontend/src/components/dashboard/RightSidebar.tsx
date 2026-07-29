"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  FileCheck,
  ChevronRight
} from "lucide-react";

export const RightSidebar: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block">
      
      {/* Today's Summary Card */}
      <div className="glass-panel p-5 border border-white/[0.08] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Today's Summary</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Nirman's AI Employees completed <span className="text-emerald-400 font-semibold">14 execution tasks</span> and passed <span className="text-indigo-400 font-semibold">3 War Room approvals</span> with 92% avg confidence.
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
            2 Gate Requests
          </span>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/20 transition-all flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white block">Architecture Gate Review</span>
              <span className="text-[10px] text-slate-500 font-mono">Mobile Warehouse API</span>
            </div>
            <button className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
              Approve
            </button>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/20 transition-all flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white block">Security Scan Release</span>
              <span className="text-[10px] text-slate-500 font-mono font-semibold">Inventory Service</span>
            </div>
            <button className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* Open Risk Alerts */}
      <div className="glass-panel p-5 border border-rose-500/20 bg-rose-500/[0.02] space-y-2">
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Open Risks</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          1 test timeout recorded in QA suite execution #842. QA Engineer Ian is re-running the Pytest suite.
        </p>
      </div>

    </aside>
  );
};
