"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  techFilter: string;
  onTechFilterChange: (tech: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  techFilter,
  onTechFilterChange,
}) => {
  const statuses = [
    { id: "all", label: "All Projects" },
    { id: "Running", label: "Running" },
    { id: "Paused", label: "Paused (Gates)" },
    { id: "Completed", label: "Completed" },
  ];

  return (
    <div className="glass-panel p-4 border border-white/[0.08] mb-8 space-y-4 text-left">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, requirements, tags..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st.id}
              onClick={() => onStatusFilterChange(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                statusFilter === st.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08]"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Dropdown Selectors */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {/* Priority Select */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Tech Select */}
          <select
            value={techFilter}
            onChange={(e) => onTechFilterChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Technologies</option>
            <option value="Next.js">Next.js</option>
            <option value="FastAPI">FastAPI</option>
            <option value="PostgreSQL">PostgreSQL</option>
            <option value="Docker">Docker</option>
          </select>
        </div>
      </div>
    </div>
  );
};
