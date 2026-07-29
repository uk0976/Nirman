"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Workflow,
  Activity,
  Award,
  Clock,
  HeartPulse,
  FolderKanban,
  Zap
} from "lucide-react";

export const OverviewCards: React.FC = () => {
  const cards = [
    { label: "Completion", value: "68%", sub: "Stage 5 / 11", icon: TrendingUp, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Current Stage", value: "Backend API", sub: "FastAPI Routing", icon: Workflow, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Workflow Status", value: "Active", sub: "Sequential Execution", icon: Activity, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Current Sprint", value: "Sprint 1", sub: "Core Endpoints", icon: Zap, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "AI Confidence", value: "96.4%", sub: "War Room Verified", icon: Award, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Est. Completion", value: "Tomorrow", sub: "4:00 PM EST", icon: Clock, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { label: "Project Health", value: "98 / 100", sub: "Optimal Execution", icon: HeartPulse, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.03 }}
            className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-white/15 transition-all text-left flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">{c.label}</span>
              <div className={`p-1.5 rounded-lg border ${c.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold text-white block tracking-tight">{c.value}</span>
              <span className="text-[10px] font-mono text-slate-500 block truncate">{c.sub}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
