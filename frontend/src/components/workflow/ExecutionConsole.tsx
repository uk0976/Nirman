"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Copy, Check, Download } from "lucide-react";

export const ExecutionConsole: React.FC = () => {
  const [logs, setLogs] = useState([
    "[18:39:10] [INFO] [WorkflowEngine] Initiating Stage 7: Backend Development...",
    "[18:39:12] [INFO] [Agent:Fiona] Parsing architecture spec Architecture.md...",
    "[18:39:15] [INFO] [CodexEngine] Prompting gpt-4o-code for /api/v1/auth router...",
    "[18:39:20] [SUCCESS] [Agent:Fiona] Generated /app/api/v1/auth_router.py (142 lines)",
    "[18:39:25] [INFO] [Agent:Fiona] Generating /app/api/v1/inventory_router.py...",
  ]);

  useEffect(() => {
    const stream = [
      "[18:39:30] [INFO] [Agent:Fiona] Validating Pydantic V2 schema dependencies...",
      "[18:39:35] [SUCCESS] [Agent:Fiona] Route /api/v1/inventory compiled successfully",
      "[18:39:40] [INFO] [WorkflowEngine] Transitioning to Stage 8: Database Design...",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < stream.length) {
        setLogs((prev) => [...prev, stream[idx]]);
        idx++;
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-6 text-left space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase font-sans tracking-wider">Autonomous Execution Terminal Console</h3>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Streaming Logs
        </span>
      </div>

      <div className="p-4 rounded-xl bg-[#040407] border border-white/10 text-slate-300 max-h-56 overflow-y-auto space-y-1.5">
        {logs.map((lg, i) => (
          <div key={i} className="hover:text-white transition-colors">
            {lg.includes("SUCCESS") ? (
              <span className="text-emerald-400 font-bold">{lg}</span>
            ) : lg.includes("Agent:Fiona") ? (
              <span className="text-indigo-300">{lg}</span>
            ) : (
              <span>{lg}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
