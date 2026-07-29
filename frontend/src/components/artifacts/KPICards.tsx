"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCode2, Sparkles, FileText, Code2, Database, Download, History, HardDrive } from "lucide-react";

export const KPICards: React.FC = () => {
  const cards = [
    { label: "Total Artifacts", value: "89", change: "+14 this week", icon: FileCode2, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Generated Today", value: "14", change: "Across 3 projects", icon: Sparkles, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Documentation", value: "24", change: "READMEs & Specs", icon: FileText, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Source Files", value: "38", change: "Python & React", icon: Code2, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Architecture Files", value: "12", change: "DDD Blueprints", icon: Database, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Total Downloads", value: "310", change: "High activity", icon: Download, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { label: "Latest Version", value: "v2.4.0", change: "Production ready", icon: History, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Storage Used", value: "48.2 MB", change: "Lightweight Markdown & Code", icon: HardDrive, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
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
              <span className="text-[9px] font-mono text-slate-500 block truncate">{c.change}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
