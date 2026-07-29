"use client";

import React from "react";
import { Pin, Star, Sparkles, FileText, Download } from "lucide-react";

export const ArtifactSidebar: React.FC = () => {
  return (
    <aside className="w-80 shrink-0 space-y-6 hidden xl:block text-left">
      {/* Pinned Documents */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Pin className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pinned Deliverables</h3>
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white block">Architecture.md</span>
              <span className="text-[10px] font-mono text-indigo-300">v2.1 • Charlie</span>
            </div>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white block">OpenAPI.yaml</span>
              <span className="text-[10px] font-mono text-indigo-300">v1.4 • Fiona</span>
            </div>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Recommended Output */}
      <div className="glass-panel p-5 border border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Latest AI Outputs</h3>
        </div>

        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-1">
          <span className="font-bold block">Dockerfile Packaging</span>
          <p className="text-[11px] text-slate-400 leading-tight">
            DevOps Engineer Kate generated multi-stage container files 45m ago.
          </p>
        </div>
      </div>
    </aside>
  );
};
