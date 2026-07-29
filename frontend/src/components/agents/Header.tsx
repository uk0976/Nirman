"use client";

import React from "react";
import { Users, Plus, Layers, BarChart3, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenAddAgent?: () => void;
  activeView: "grid" | "org" | "analytics";
  onViewChange: (view: "grid" | "org" | "analytics") => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddAgent,
  activeView,
  onViewChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-left">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            AI Employees
          </h1>
        </div>
        <p className="text-xs md:text-sm text-slate-400">
          Monitor and manage your autonomous AI workforce across 12 specialized roles.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* View Toggle */}
        <div className="flex p-1 rounded-xl bg-black/40 border border-white/[0.08]">
          <button
            onClick={() => onViewChange("grid")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "grid"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Grid View
          </button>
          <button
            onClick={() => onViewChange("org")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "org"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Org Chart
          </button>
          <button
            onClick={() => onViewChange("analytics")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === "analytics"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Analytics
          </button>
        </div>

        {/* Add Agent Action */}
        <button
          onClick={onOpenAddAgent}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add AI Agent</span>
        </button>
      </div>
    </div>
  );
};
