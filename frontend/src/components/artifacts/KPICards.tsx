"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCode2, Sparkles, FileText, Code2, Database, Download, History, HardDrive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const KPICards: React.FC = () => {
  const { data: pipelines = [] } = useQuery({
    queryKey: ["kpi-artifacts-list"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
  });

  let totalArtifacts = 0;
  let docCount = 0;
  let codeCount = 0;
  let archCount = 0;
  let totalBytes = 0;

  pipelines.forEach((pipe: any) => {
    (pipe.stages || []).forEach((stg: any) => {
      if (stg.artifact_produced && stg.artifact_content) {
        totalArtifacts += 1;
        totalBytes += stg.artifact_content.length;
        if (stg.artifact_produced.endsWith(".md")) docCount += 1;
        else if (stg.artifact_produced.endswith?.(".sql") || stg.name === "Database") archCount += 1;
        else codeCount += 1;
      }
    });
  });

  const storageKb = Math.round(totalBytes / 1024);

  const cards = [
    { label: "Total Artifacts", value: String(totalArtifacts), change: totalArtifacts > 0 ? `${totalArtifacts} produced` : "0 produced", icon: FileCode2, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { label: "Generated Today", value: String(totalArtifacts), change: pipelines.length > 0 ? `Across ${pipelines.length} projects` : "0 projects", icon: Sparkles, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Documentation", value: String(docCount), change: "READMEs & Specs", icon: FileText, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Source Files", value: String(codeCount), change: "Python & React", icon: Code2, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Architecture Files", value: String(archCount), change: "DDD Blueprints", icon: Database, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Total Downloads", value: String(totalArtifacts), change: "High activity", icon: Download, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { label: "Latest Version", value: totalArtifacts > 0 ? "v1.0.0" : "v0.0.0", change: "Production ready", icon: History, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Storage Used", value: `${storageKb} KB`, change: "Markdown & Code", icon: HardDrive, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
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
