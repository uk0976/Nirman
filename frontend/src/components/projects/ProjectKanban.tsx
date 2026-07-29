"use client";

import React from "react";
import { ProjectData } from "./ProjectCard";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderKanban } from "lucide-react";

interface ProjectKanbanProps {
  projects: ProjectData[];
  onOpenProject: (id: string) => void;
}

export const ProjectKanban: React.FC<ProjectKanbanProps> = ({ projects, onOpenProject }) => {
  const columns = [
    { id: "Planning", label: "Planning" },
    { id: "Architecture", label: "Architecture" },
    { id: "Development", label: "Development" },
    { id: "Testing", label: "Testing" },
    { id: "Review", label: "Review" },
    { id: "Deployment", label: "Deployment" },
    { id: "Completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 mb-8 text-left min-h-[500px]">
      {columns.map((col) => {
        // Group projects by current phase or workflow stage matching
        const colProjects = projects.filter(
          (p) => p.currentPhase.toLowerCase().includes(col.id.toLowerCase()) || (col.id === "Development" && p.currentPhase.includes("API"))
        );

        return (
          <div
            key={col.id}
            className="w-72 shrink-0 glass-panel p-4 border border-white/[0.08] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{col.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 font-bold">
                  {colProjects.length}
                </span>
              </div>

              <div className="space-y-3">
                {colProjects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-indigo-500/40 transition-all space-y-3 cursor-pointer"
                    onClick={() => onOpenProject(proj.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white block">{proj.name}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {proj.priority}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">{proj.description}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Progress</span>
                        <span className="text-indigo-400 font-bold">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <div className="flex items-center -space-x-1">
                        {proj.assignedAgents.map((ag, i) => (
                          <span key={i} className="text-[10px]">{ag.avatar}</span>
                        ))}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400" />
                    </div>
                  </motion.div>
                ))}

                {colProjects.length === 0 && (
                  <div className="p-6 border border-dashed border-white/[0.06] rounded-xl text-center text-slate-600 text-xs font-mono">
                    No active cards
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
