"use client";

import React from "react";
import { FolderKanban, Clock, Users, ArrowUpRight } from "lucide-react";

export const RunningProjects: React.FC = () => {
  const projects = [
    {
      id: "1",
      name: "Inventory Control API",
      phase: "Stage 5: API Development",
      progress: 68,
      priority: "High",
      assigned: ["Alice", "Bob", "Charlie", "Fiona", "Ian"],
      estCompletion: "Tomorrow, 4:00 PM",
      status: "Running",
    },
    {
      id: "2",
      name: "Mobile Warehouse Portal",
      phase: "Stage 4: Architecture Gate Review",
      progress: 42,
      priority: "Critical",
      assigned: ["Charlie", "George", "Diana", "Jack"],
      estCompletion: "2 days left",
      status: "Paused (War Room Gate)",
    },
    {
      id: "3",
      name: "Security OAuth Microservice",
      phase: "Stage 9: Security Audit",
      progress: 88,
      priority: "Medium",
      assigned: ["Jack", "Fiona", "Kate", "Leo"],
      estCompletion: "Today, 6:30 PM",
      status: "Running",
    },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Running Software Projects</h3>
          </div>
          <a href="/projects" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            View All
          </a>
        </div>

        <div className="space-y-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-indigo-500/30 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {proj.name}
                    <span
                      className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        proj.priority === "Critical"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      }`}
                    >
                      {proj.priority} Priority
                    </span>
                  </h4>
                  <span className="text-xs font-mono text-slate-400 block mt-0.5">{proj.phase}</span>
                </div>

                <a
                  href={`/projects/${proj.id}`}
                  className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
                  title="Open Project Workspace"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Progress</span>
                  <span className="text-indigo-400 font-bold">{proj.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  {proj.assigned.length} AI Employees Assigned
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {proj.estCompletion}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
