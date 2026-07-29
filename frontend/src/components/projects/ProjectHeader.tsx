"use client";

import React from "react";
import {
  Plus,
  Upload,
  LayoutGrid,
  List,
  Kanban,
  Calendar,
  SlidersHorizontal,
  ArrowUpDown,
  FolderKanban
} from "lucide-react";

export type ViewMode = "grid" | "list" | "kanban" | "timeline";

interface ProjectHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenNewProject: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  viewMode,
  onViewModeChange,
  onOpenNewProject,
  sortBy,
  onSortChange,
}) => {
  const views: { id: ViewMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "grid", label: "Grid", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
    { id: "kanban", label: "Kanban", icon: Kanban },
    { id: "timeline", label: "Timeline", icon: Calendar },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-left">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FolderKanban className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Projects
          </h1>
        </div>
        <p className="text-xs md:text-sm text-slate-400">
          Manage and monitor software products built autonomously by your AI Company.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* View Mode Toggle */}
        <div className="flex p-1 rounded-xl bg-black/40 border border-white/[0.08]">
          {views.map((v) => {
            const Icon = v.icon;
            const active = viewMode === v.id;
            return (
              <button
                key={v.id}
                onClick={() => onViewModeChange(v.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
                title={`${v.label} View`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-semibold text-slate-300 hover:border-white/20 focus:outline-none cursor-pointer appearance-none pr-8"
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="progress">Progress %</option>
            <option value="priority">Priority</option>
          </select>
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Import Action */}
        <button
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-slate-200 text-xs font-semibold transition-all"
        >
          <Upload className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Import</span>
        </button>

        {/* New Project CTA */}
        <button
          onClick={onOpenNewProject}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>
    </div>
  );
};
