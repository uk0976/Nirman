"use client";

import { LayoutGrid, List, Trello, Calendar, Search, Filter, Star, Sparkles, Plus } from "lucide-react";

export type ViewMode = "GRID" | "LIST" | "KANBAN" | "TIMELINE";
export type FilterTab = "ALL" | "RECENT" | "STARRED" | "ARCHIVED" | "TEMPLATES";

interface ProjectFiltersProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCreateClick: () => void;
}

export function ProjectFilters({
  viewMode,
  onViewModeChange,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onCreateClick
}: ProjectFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Software Projects Workspace</h1>
          <p className="text-xs text-gray-400 mt-1">Manage, orchestrate, and track AI-driven software engineering projects.</p>
        </div>

        <button
          onClick={onCreateClick}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-glow transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Filter Tabs & View Mode Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {[
            { id: "ALL", label: "All Projects" },
            { id: "RECENT", label: "Recent" },
            { id: "STARRED", label: "Starred ★" },
            { id: "ARCHIVED", label: "Archived" },
            { id: "TEMPLATES", label: "Templates 📑" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as FilterTab)}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === tab.id
                  ? "bg-indigo-600/20 text-white font-bold border border-indigo-500/40 shadow-sm"
                  : "bg-[#151824] text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, tech stack..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-[#151824] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 w-56"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#151824] border border-white/10 p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange("GRID")}
              title="Grid View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === "GRID" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => onViewModeChange("LIST")}
              title="List View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === "LIST" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => onViewModeChange("KANBAN")}
              title="Kanban Board View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === "KANBAN" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <Trello className="w-4 h-4" />
            </button>

            <button
              onClick={() => onViewModeChange("TIMELINE")}
              title="Timeline View"
              className={`p-1.5 rounded-lg transition ${
                viewMode === "TIMELINE" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
