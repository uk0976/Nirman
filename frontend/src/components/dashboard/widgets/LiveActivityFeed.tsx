"use client";

import React, { useState, useEffect } from "react";
import { Activity, Terminal, Shield, CheckCircle, Code, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const LiveActivityFeed: React.FC = () => {
  const { data: pipelineData } = useQuery({
    queryKey: ["pipeline-activity"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        if (Array.isArray(res.data) && res.data.length > 0) {
          const mapped: any[] = [];
          res.data.forEach((pipe: any) => {
            (pipe.history || []).forEach((item: any, idx: number) => {
              mapped.push({
                id: `${pipe.pipeline_id}-${idx}`,
                agent: `${item.stage || "Pipeline"} Stage`,
                action: `${item.event || "EVENT"} - Duration: ${item.duration_sec || 0}s`,
                project: `Project ${pipe.project_id || "Active"}`,
                time: item.timestamp ? new Date(item.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
                icon: CheckCircle,
                color: "text-indigo-400",
              });
            });
          });
          return mapped.reverse();
        }
      } catch (err) {
        // Fallback
      }
      return [];
    },
    refetchInterval: 1000,
  });

  const activities = pipelineData || [];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Activity Feed</h3>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="space-y-3 overflow-hidden">
          {activities.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No live execution events yet. Launch a project to view real agent activity streams.
            </div>
          ) : (
            <AnimatePresence>
              {activities.map((act) => {
              const Icon = act.icon;
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-black/40 border border-white/[0.04] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <Icon className={`w-4 h-4 ${act.color} shrink-0 mt-0.5`} />
                    <div>
                      <span className="font-semibold text-slate-200 block">{act.agent}</span>
                      <span className="text-[11px] text-slate-400 leading-tight block">{act.action}</span>
                      <span className="text-[10px] font-mono text-indigo-400 mt-1 block">{act.project}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        </div>
      </div>
    </div>
  );
};
