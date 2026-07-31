"use client";

import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ArrowRight, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const WelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.full_name || user?.email?.split("@")[0] || "User";

  const { data: projects = [] } = useQuery({
    queryKey: ["welcome-header-projects"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/projects/");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
  });

  const { data: pipelines = [] } = useQuery({
    queryKey: ["welcome-header-pipelines"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
  });

  const activeCount = projects.length || pipelines.length;

  return (
    <div className="glass-panel p-8 border border-white/[0.08] relative overflow-hidden text-left mb-8">
      {/* Glow lines */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>AI Company Headquarters Active</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">{userName}</span>
          </h1>

          <p className="text-sm text-slate-400 font-normal max-w-xl">
            {activeCount > 0 ? (
              <>Your Autonomous AI Software Company is actively collaborating across <strong className="text-slate-200 font-semibold">{activeCount} running projects</strong> and <strong className="text-slate-200 font-semibold">12 online specialists</strong>.</>
            ) : (
              <>Your Autonomous AI Software Company is ready. Click <strong className="text-indigo-300 font-semibold">+ New Requirement</strong> to launch your first AI software project.</>
            )}
          </p>
        </div>

        {/* Action badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-center">
            <span className="block text-xs font-mono font-bold text-emerald-400">STATUS</span>
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Operational
            </span>
          </div>

          <a
            href="/warroom"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 group"
          >
            Enter War Room <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
