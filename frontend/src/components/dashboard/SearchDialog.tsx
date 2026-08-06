"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Command, X, FolderGit2, FileText, Bot, Terminal, Sliders, Layers } from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SEARCH_ITEMS = [
  { type: "PROJECT", title: "Nirman SaaS Core Platform", desc: "Enterprise AI Software Engineering Platform", href: "/projects/proj-1", icon: FolderGit2 },
  { type: "PROJECT", title: "Apex Trading Bot Engine", desc: "High-frequency algorithmic crypto trade executor", href: "/projects/proj-2", icon: FolderGit2 },
  { type: "DOCUMENT", title: "Product Requirement Document (PRD v1.0)", desc: "45 User stories & competitor breakdown", href: "/artifacts", icon: FileText },
  { type: "DOCUMENT", title: "3NF Database Schema Specification", desc: "PostgreSQL schema & Alembic migration scripts", href: "/artifacts", icon: Layers },
  { type: "AGENT", title: "Sarah Lin (Product Manager)", desc: "PRD & SRS specification synthesis", href: "/agents", icon: Bot },
  { type: "AGENT", title: "Elena Rostova (System Architect)", desc: "Clean Architecture & UML sequence diagrams", href: "/agents", icon: Bot },
  { type: "WORKSPACE", title: "AI War Room Live Stream", desc: "Real-time multi-agent debate console", href: "/warroom", icon: Terminal },
  { type: "SETTING", title: "Google Gemini API Key Config", desc: "Configure LLM provider API credentials", href: "/settings", icon: Sliders }
];

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = query.trim() === ""
    ? QUICK_SEARCH_ITEMS
    : QUICK_SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0B0D14]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search projects, PRDs, database schemas, AI agents, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "<span className="text-gray-300">{query}</span>"
            </div>
          ) : (
            filteredItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={onClose}
                  className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-indigo-500/30 flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 group-hover:text-white text-xs">{item.title}</h4>
                      <p className="text-[11px] text-gray-400 font-sans">{item.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10 uppercase">
                    {item.type}
                  </span>
                </Link>
              );
            })
          )}
        </div>

        {/* Dialog Footer */}
        <div className="p-3 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Enter</kbd></span>
          </div>
          <span>Close: <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
