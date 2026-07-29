"use client";

import React from "react";
import { ProjectData } from "./ProjectCard";
import { ArrowUpRight, FolderKanban, MoreHorizontal } from "lucide-react";

interface ProjectListProps {
  projects: ProjectData[];
  onOpenProject: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onOpenProject }) => {
  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.06] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <th className="py-3 px-3">Project</th>
            <th className="py-3 px-3">Owner</th>
            <th className="py-3 px-3">Priority</th>
            <th className="py-3 px-3">Status</th>
            <th className="py-3 px-3">Progress</th>
            <th className="py-3 px-3">Current Stage</th>
            <th className="py-3 px-3">AI Employees</th>
            <th className="py-3 px-3">Updated</th>
            <th className="py-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04] text-xs">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3.5 px-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block hover:text-indigo-300 transition-colors cursor-pointer" onClick={() => onOpenProject(p.id)}>
                      {p.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 max-w-xs truncate block">{p.description}</span>
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-3 text-slate-300 font-mono">{p.owner}</td>
              <td className="py-3.5 px-3">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {p.priority}
                </span>
              </td>
              <td className="py-3.5 px-3">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {p.status}
                </span>
              </td>
              <td className="py-3.5 px-3">
                <div className="w-24">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </td>
              <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px] max-w-xs truncate">{p.currentPhase}</td>
              <td className="py-3.5 px-3">
                <div className="flex items-center -space-x-1.5">
                  {p.assignedAgents.map((ag, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px]" title={ag.name}>
                      {ag.avatar}
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-3.5 px-3 font-mono text-slate-500 text-[10px]">{p.updatedAt}</td>
              <td className="py-3.5 px-3 text-right">
                <button
                  onClick={() => onOpenProject(p.id)}
                  className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
