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
  History,
  Sparkles,
  Loader2
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchWizard?: (initialPrompt?: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onLaunchWizard }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLaunchProject = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const projRes = await apiClient.post("/projects/", {
        name: query.slice(0, 32) || "New AI Project",
        description: query,
        status: "Running",
      });

      const projId = projRes.data?.id || `proj-${Date.now()}`;

      await apiClient.post("/pipeline/start", {
        project_id: String(projId),
        prompt: query,
      });

      setLoading(false);
      onClose();
      window.location.href = "/dashboard";
    } catch (err) {
      setLoading(false);
      onClose();
      window.location.href = "/dashboard";
    }
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      handleLaunchProject();
    }
  };

  const realRoutes = [
    { type: "route", title: "AI War Room", desc: "Collaborative multi-agent debate session", href: "/warroom", icon: Users },
    { type: "route", title: "Autonomous Workflow Engine", desc: "View active 9-stage pipeline execution", href: "/workflow", icon: Cpu },
    { type: "route", title: "Workspace Projects", desc: "View all active and completed projects", href: "/projects", icon: FolderKanban },
    { type: "route", title: "System Artifacts", desc: "PRDs, architecture blueprints, & code", href: "/artifacts", icon: FileCode2 },
  ];

  const filteredResults = query
    ? realRoutes.filter(
        (i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
      )
    : realRoutes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/80 backdrop-blur-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative text-left"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
            <Search className="w-4 h-4 text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownInput}
              placeholder="Type a requirement to launch AI project (e.g. 'Build SaaS analytics dashboard')..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List & Launch AI Project CTA */}
          <div className="p-3 max-h-96 overflow-y-auto space-y-2">
            
            {/* Dynamic Launch AI Project Card */}
            {query.trim() && (
              <div className="p-1">
                <button
                  onClick={handleLaunchProject}
                  disabled={loading}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border border-indigo-500/50 hover:border-indigo-400 transition-all group text-left shadow-lg shadow-indigo-600/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-cyan-300" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-cyan-300 transition-colors">
                        🚀 Launch New AI Project
                      </span>
                      <span className="text-[11px] font-mono text-slate-300 truncate max-w-md block">
                        "{query}"
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 group-hover:translate-x-1 transition-transform">
                    <span>Press Enter</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            )}

            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>{query ? "Quick Navigation" : "Workspace Destinations"}</span>
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
              <span>Press <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">Enter</kbd> to launch AI build</span>
              <span>Press <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono text-[9px] text-slate-300">ESC</kbd> to exit</span>
            </div>
            <span className="font-mono text-indigo-400">Nirman AI Launcher</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
