"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";

interface EmployeeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  departmentFilter: string;
  onDepartmentChange: (dept: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
}) => {
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
            placeholder="Search employee name, role, department..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/[0.08] focus:border-indigo-500 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <select
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Executive">Executive</option>
            <option value="Product">Product</option>
            <option value="Architecture">Architecture</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Quality">Quality</option>
            <option value="Security">Security</option>
            <option value="DevOps">DevOps</option>
            <option value="Docs">Documentation</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Coding">Coding</option>
            <option value="Testing">Testing</option>
            <option value="Planning">Planning</option>
            <option value="Reviewing">Reviewing</option>
            <option value="Idle">Idle</option>
          </select>
        </div>
      </div>
    </div>
  );
};
