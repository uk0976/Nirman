"use client";

import React from "react";
import { ProjectData } from "./ProjectCard";
import { Calendar, Clock, CheckCircle2, Activity } from "lucide-react";

interface ProjectTimelineProps {
  projects: ProjectData[];
  onOpenProject: (id: string) => void;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, onOpenProject }) => {
  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Project Timeline &amp; Milestone Roadmap</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Quarterly Delivery View</span>
      </div>

      <div className="space-y-6">
        {projects.map((p) => (
          <div key={p.id} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4
                  onClick={() => onOpenProject(p.id)}
                  className="text-sm font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer inline-block"
                >
                  {p.name}
                </h4>
                <span className="text-[11px] font-mono text-slate-400 block">{p.currentPhase}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> {p.estCompletion}
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                  {p.progress}%
                </span>
              </div>
            </div>

            {/* Timeline bar representation */}
            <div className="relative pt-2">
              <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-700"
                  style={{ width: `${p.progress}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2">
                <span>Phase 1: Spec</span>
                <span>Phase 2: Architecture</span>
                <span>Phase 3: Sprints</span>
                <span>Phase 4: Release</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
