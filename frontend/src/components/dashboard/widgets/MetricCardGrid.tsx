"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Workflow,
  Users,
  CheckCircle2,
  Cpu,
  FileCode2,
  Award,
  Zap,
  Clock
} from "lucide-react";

export const MetricCardGrid: React.FC = () => {
  const metrics = [
    { label: "Active Projects", value: "3", change: "+1 this week", icon: FolderKanban, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Running Workflows", value: "4", change: "2 in progress", icon: Workflow, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "AI Employees Online", value: "12 / 12", change: "100% capacity", icon: Users, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Tasks Completed Today", value: "48", change: "+18% vs yesterday", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "AI Executions", value: "1,420", change: "99.8% success rate", icon: Cpu, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Artifacts Generated", value: "89", change: "14 schema DDLs", icon: FileCode2, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { label: "Average Confidence", value: "94.8%", change: "War Room verified", icon: Award, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { label: "Estimated Token Usage", value: "1.4M", change: "850K Codex tokens", icon: Zap, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Average Response Time", value: "1.2s", change: "OpenAI Responses API", icon: Clock, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-8">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="glass-card p-5 rounded-2xl flex flex-col justify-between border border-white/[0.06] hover:border-white/15 transition-all text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400">{m.label}</span>
              <div className={`p-2 rounded-xl border ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight block mb-1">
                {m.value}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{m.change}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
