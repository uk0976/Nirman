"use client";

import React from "react";
import { Pin, Star, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export const ArtifactSidebar: React.FC = () => {
  const { data: pipelines = [] } = useQuery({
    queryKey: ["artifact-sidebar-pipelines"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/pipeline/list");
        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        return [];
      }
    },
  });

  const generatedList: any[] = [];
  pipelines.forEach((pipe: any) => {
    (pipe.stages || []).forEach((stg: any) => {
      if (stg.artifact_produced) {
        generatedList.push({
          name: stg.artifact_produced,
          agent: stg.assigned_agent || "AI Agent",
          stage: stg.name,
          time: stg.completed_at ? new Date(stg.completed_at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
        });
      }
    });
  });

  const latestArtifacts = generatedList.reverse().slice(0, 2);

  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Pinned Documents */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Pin className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pinned Deliverables</h3>
        </div>

        {latestArtifacts.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-500 font-mono rounded-xl bg-black/40 border border-white/[0.04]">
            No pinned deliverables. Generated artifacts will appear here.
          </div>
        ) : (
          <div className="space-y-2">
            {latestArtifacts.map((art, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{art.name}</span>
                  <span className="text-[10px] font-mono text-indigo-300">v1.0 • {art.agent}</span>
                </div>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Output */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Latest AI Outputs</h3>
        </div>

        {latestArtifacts.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-500 font-mono rounded-xl bg-black/40 border border-white/[0.04]">
            No AI outputs recorded yet.
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1">
            <span className="font-bold block">{latestArtifacts[0].name} Packaging</span>
            <p className="text-[11px] text-slate-400 leading-tight">
              {latestArtifacts[0].agent} generated production files at {latestArtifacts[0].time}.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
