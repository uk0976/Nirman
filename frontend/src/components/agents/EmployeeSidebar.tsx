"use client";

import React from "react";
import { Award, Sparkles, CheckCircle2, Star, ArrowUpRight } from "lucide-react";

export const EmployeeSidebar: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Top Performer Card */}
      <div className="glass-panel p-5 border border-white/[0.08] relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Top Performer Today</h3>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.06] mb-3">
          <span className="text-3xl">👩‍💻</span>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1">
              Fiona <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            </h4>
            <span className="text-[10px] font-mono text-indigo-400">Backend Engineer</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Completed <strong className="text-emerald-400">18 execution tasks</strong> with 96.4% confidence rating across FastAPI backend routers.
        </p>
      </div>

      {/* AI Recommendations */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Workforce Recommendations</h3>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs">
            <span className="font-bold text-indigo-300 block mb-1">Reassign QA Tasks</span>
            <p className="text-[11px] text-slate-400 leading-tight">
              Ian (QA) is at 75% workload capacity. Reassigning Pytest assertions to Hope (AI Engineer) will balance throughput.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
