"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Clock,
  Users,
  MoreVertical,
  ArrowUpRight,
  Edit,
  Copy,
  Archive,
  Trash2,
  Share2,
  Download,
  Code
} from "lucide-react";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Running" | "Paused" | "Completed" | "Planning";
  currentPhase: string;
  progress: number;
  workflowStage: string;
  techStack: string[];
  assignedAgents: { name: string; avatar: string; role: string }[];
  estCompletion: string;
  updatedAt: string;
  owner: string;
}

interface ProjectCardProps {
  project: ProjectData;
  onOpen: (id: string) => void;
  onAction?: (action: string, id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen, onAction }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getPriorityStyle = (priority: ProjectData["priority"]) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "High":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Medium":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "Low":
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStatusStyle = (status: ProjectData["status"]) => {
    switch (status) {
      case "Running":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Paused":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20 animate-pulse";
      case "Planning":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border border-white/[0.06] hover:border-indigo-500/40 transition-all flex flex-col justify-between text-left relative group"
    >
      <div>
        {/* Card Top Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                {project.name}
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Owner: {project.owner}</span>
            </div>
          </div>

          {/* Quick Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute top-full right-0 mt-1 w-44 bg-[#0a0a0e] border border-white/10 rounded-xl shadow-2xl p-1.5 z-30 text-xs">
                {[
                  { id: "open", label: "Open Workspace", icon: ArrowUpRight },
                  { id: "edit", label: "Edit Project", icon: Edit },
                  { id: "duplicate", label: "Duplicate", icon: Copy },
                  { id: "export", label: "Export Specs", icon: Download },
                  { id: "share", label: "Share Access", icon: Share2 },
                  { id: "archive", label: "Archive", icon: Archive },
                  { id: "delete", label: "Delete", icon: Trash2, danger: true },
                ].map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.id}
                      onClick={() => {
                        setMenuOpen(false);
                        if (act.id === "open") onOpen(project.id);
                        else onAction?.(act.id, project.id);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                        act.danger
                          ? "text-rose-400 hover:bg-rose-500/10"
                          : "text-slate-300 hover:bg-white/[0.06]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{act.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Priority & Status Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityStyle(project.priority)}`}>
            {project.priority}
          </span>
          <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Current Phase & Progress Bar */}
        <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-black/30 border border-white/[0.04]">
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span className="text-slate-400 truncate">{project.currentPhase}</span>
            <span className="text-indigo-400 font-bold ml-2">{project.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Assigned Agents & Open Button */}
      <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center -space-x-2">
          {project.assignedAgents.map((ag, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs shadow-md"
              title={`${ag.name} (${ag.role})`}
            >
              {ag.avatar}
            </div>
          ))}
        </div>

        <button
          onClick={() => onOpen(project.id)}
          className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Open <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
