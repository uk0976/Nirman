"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface ArtifactFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
}

export const ArtifactFilters: React.FC<ArtifactFiltersProps> = ({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
}) => {
  const types = [
    { id: "all", label: "All Deliverables" },
    { id: "Architecture", label: "Architecture" },
    { id: "SQL", label: "Database SQL" },
    { id: "API", label: "API Specs" },
    { id: "Code", label: "Source Code" },
  ];

  return (
    <div className="glass-panel p-4 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search artifacts, READMEs, SQL, API specs..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => onTypeChange(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                typeFilter === t.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
