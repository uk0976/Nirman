"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Activity,
  CheckCircle2,
  PauseCircle,
  Cpu,
  TrendingUp,
  Workflow,
  Clock
} from "lucide-react";

export const ProjectMetrics: React.FC = () => {
  const metrics = [
    { label: "Total Projects", value: "18", change: "+4 this month", icon: FolderKanban, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Running Projects", value: "6", change: "Active pipelines", icon: Activity, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Completed Projects", value: "10", change: "100% production ready", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Paused Projects", value: "2", change: "War Room gates pending", icon: PauseCircle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "AI Executions", value: "4,820", change: "99.2% success rate", icon: Cpu, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Average Progress", value: "76.4%", change: "Across all active sprints", icon: TrendingUp, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { label: "Active Workflows", value: "8", change: "Sequential timing gates", icon: Workflow, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Avg Completion Time", value: "18 mins", change: "From spec to container", icon: Clock, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-white/15 transition-all text-left flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">{m.label}</span>
              <span className="text-xl font-extrabold text-white tracking-tight block my-0.5">
                {m.value}
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">{m.change}</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${m.color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
