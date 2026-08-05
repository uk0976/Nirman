"use client";

import { useState } from "react";
import { Search, Bell, Plus, User, Sparkles, Command } from "lucide-react";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 border-b border-white/10 bg-[#0B0D14]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, PRDs, architecture, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151824] border border-white/10 rounded-lg pl-9 pr-8 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Quick New Requirement / Project Button */}
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg shadow-sm border border-indigo-400/30 transition-all">
          <Plus className="w-3.5 h-3.5" />
          <span>New Requirement</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0B0D14]" />
        </button>

        {/* User Profile avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
            <div className="w-full h-full bg-[#0D0F17] rounded-full flex items-center justify-center text-xs font-bold text-white">
              UK
            </div>
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-gray-200 leading-tight">Umer Khan</span>
            <span className="text-[10px] text-gray-400 font-mono">Lead Engineer</span>
          </div>
        </div>
      </div>
    </header>
  );
}
