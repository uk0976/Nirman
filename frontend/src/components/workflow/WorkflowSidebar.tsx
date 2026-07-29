"use client";

import React from "react";
import { Sparkles, AlertTriangle, CheckCircle2, Workflow, ArrowUpRight } from "lucide-react";

export const WorkflowSidebar: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Execution Summary */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pipeline Execution Summary</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Nirman's Workflow Engine is executing Stage 7 (Backend API Development). 6 previous stages passed with 96.2% avg confidence.
        </p>
      </div>

      {/* Optimization Suggestions */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Pipeline Suggestions</h3>
        </div>
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1">
          <span className="font-bold block">Parallelize Stage 8 &amp; 9</span>
          <p className="text-[11px] text-slate-400">
            Database DDL and QA test fixtures can run concurrently to reduce pipeline latency by 3.5 minutes.
          </p>
        </div>
      </div>
    </aside>
  );
};
