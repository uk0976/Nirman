"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  FolderKanban,
  Users,
  FileCode2,
  Cpu,
  ArrowRight,
  History
} from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by topbar
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockIndex = [
    { type: "project", title: "Inventory Control API", desc: "Running • Stage 5 API Design", href: "/projects/1", icon: FolderKanban },
    { type: "project", title: "Mobile Warehouse Portal", desc: "Paused • War Room Gate", href: "/projects/2", icon: FolderKanban },
    { type: "agent", title: "Alice (CEO)", desc: "Operational • Executive Management", href: "/agents/alice", icon: Users },
    { type: "agent", title: "Charlie (Software Architect)", desc: "Operational • System Architecture", href: "/agents/charlie", icon: Users },
    { type: "artifact", title: "Architecture.md", desc: "Generated 10m ago by Charlie", href: "/artifacts/arch", icon: FileCode2 },
    { type: "artifact", title: "Database.sql", desc: "Generated 15m ago by George", href: "/artifacts/db", icon: FileCode2 },
    { type: "execution", title: "Execution Run #842", desc: "Running • Stage 5/14", href: "/executions/842", icon: Cpu },
  ];

  const filteredResults = query
    ? mockIndex.filter(
        (i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
      )
    : mockIndex.slice(0, 5);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
            <Search className="w-4 h-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, AI agents, generated artifacts..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="p-3 max-h-96 overflow-y-auto space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>{query ? "Search Results" : "Recent Searches"}</span>
              {!query && <History className="w-3 h-3 text-slate-500" />}
            </div>

            {filteredResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-semibold text-slate-200 block group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{item.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </a>
              );
            })}
          </div>

          {/* Search Footer info */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span>Press <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">ESC</kbd> to exit</span>
              <span>Use <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">↑</kbd> <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">↓</kbd> to navigate</span>
            </div>
            <span className="font-mono text-indigo-400">Nirman Global Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
