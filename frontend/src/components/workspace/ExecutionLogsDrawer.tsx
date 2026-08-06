"use client";

import { useState } from "react";
import { Terminal, X, Search, Filter, Download } from "lucide-react";

interface ExecutionLogsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOGS_DATA = [
  { timestamp: "10:42:01", agent: "CEO (Evelyn Vance)", level: "INFO", task: "Project Directive", message: "Initiating 20-phase SDLC pipeline for 'Nirman SaaS Core Platform'." },
  { timestamp: "10:42:15", agent: "Product Manager (Sarah Lin)", level: "INFO", task: "PRD Synthesis", message: "Synthesized 45 User Stories and competitor matrix." },
  { timestamp: "10:43:00", agent: "System Architect (Elena Rostova)", level: "INFO", task: "Clean Architecture", message: "Specified Modular Monolith topology with FastAPI and Next.js 15." },
  { timestamp: "10:43:45", agent: "DB Architect (David Chen)", level: "WARN", task: "3NF Normalization", message: "Human approval requested for 3NF PostgreSQL schema migration script." },
  { timestamp: "10:44:10", agent: "Security Engineer (Alex Mercer)", level: "SUCCESS", task: "OWASP Audit", message: "Passed JWT auth and RBAC input sanitization checks." }
];

export function ExecutionLogsDrawer({ isOpen, onClose }: ExecutionLogsDrawerProps) {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");

  if (!isOpen) return null;

  const filteredLogs = LOGS_DATA.filter((log) => {
    if (levelFilter !== "ALL" && log.level !== levelFilter) return false;
    if (query.trim() !== "") {
      return (
        log.message.toLowerCase().includes(query.toLowerCase()) ||
        log.agent.toLowerCase().includes(query.toLowerCase()) ||
        log.task.toLowerCase().includes(query.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in font-mono text-xs">
      <div className="w-full max-w-2xl bg-[#0B0D14] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">AI Agent Execution Logs Console</h2>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-white/10 bg-[#151824] flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search execution logs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#0D0F17] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1">
            {["ALL", "INFO", "WARN", "SUCCESS"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  levelFilter === lvl
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Output List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#05070A] font-mono text-xs">
          {filteredLogs.map((log, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#0D0F17] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500">{log.timestamp}</span>
                <span className="text-indigo-300 font-bold">{log.agent}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    log.level === "SUCCESS"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : log.level === "WARN"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  }`}
                >
                  {log.level}
                </span>
              </div>
              <p className="text-gray-200 text-xs font-sans">{log.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between text-xs">
          <span className="text-gray-500">{filteredLogs.length} Log entries</span>
          <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span>Export Log File</span>
          </button>
        </div>
      </div>
    </div>
  );
}
