"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, Zap, Clock, AlertOctagon, Award, Cpu, Workflow } from "lucide-react";

export const OverviewCards: React.FC = () => {
  const cards = [
    { label: "Overall Progress", value: "68%", sub: "Stage 7 / 13 Active", icon: TrendingUp, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Completed Stages", value: "6", sub: "Architecture Approved", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Running Tasks", value: "3", change: "FastAPI Routing", icon: Zap, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Pending Tasks", value: "4", sub: "Pytest & Docker", icon: Clock, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Blocked Tasks", value: "0", sub: "No Pipeline Bottlenecks", icon: AlertOctagon, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { label: "Avg Confidence", value: "96.2%", sub: "War Room Verified", icon: Award, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Total Executions", value: "1,420", sub: "Codex Code Generator", icon: Cpu, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Est. Completion", value: "12 mins", sub: "Container Packaging", icon: Workflow, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}
            className="glass-card p-3.5 rounded-xl border border-white/[0.06] hover:border-white/15 transition-all text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-400 truncate">{c.label}</span>
              <div className={`p-1 rounded-lg border ${c.color}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold text-white block tracking-tight">{c.value}</span>
              <span className="text-[9px] font-mono text-slate-500 block truncate">{c.sub}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
