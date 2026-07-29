"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Activity, CheckCircle2, Award, Zap, FolderKanban, Cpu, Clock } from "lucide-react";

export const KPISection: React.FC = () => {
  const kpis = [
    { label: "Total AI Employees", value: "12", change: "12 / 12 Operational", icon: Users, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Online Status", value: "100%", change: "All agents connected", icon: Activity, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Working Agents", value: "8", change: "4 Coding • 2 Testing", icon: Zap, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Idle Agents", value: "4", change: "Available for tasks", icon: Clock, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Avg Confidence", value: "95.6%", change: "War Room validated", icon: Award, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Avg Workload", value: "62.5%", change: "Balanced capacity", icon: Cpu, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Tasks Completed Today", value: "64", change: "+22% vs yesterday", icon: CheckCircle2, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { label: "Active Projects", value: "3", change: "Across 3 workspaces", icon: FolderKanban, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {kpis.map((k, idx) => {
        const Icon = k.icon;
        return (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-white/15 transition-all text-left flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">{k.label}</span>
              <span className="text-xl font-extrabold text-white tracking-tight block my-0.5">{k.value}</span>
              <span className="text-[10px] font-mono text-slate-500 block">{k.change}</span>
            </div>
            <div className={`p-2.5 rounded-xl border ${k.color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
