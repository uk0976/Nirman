"use client";

import React from "react";
import { Terminal, CheckCircle2, Clock } from "lucide-react";

export const ExecutionLogs: React.FC = () => {
  const logs = [
    { time: "18:42:01", agent: "Fiona (Backend)", msg: "Generated /api/v1/auth/login and /refresh FastAPI endpoints", duration: "1.8s", status: "Success", color: "text-emerald-400" },
    { time: "18:41:45", agent: "George (Database)", msg: "Committed PostgreSQL foreign key indices DDL script", duration: "2.4s", status: "Success", color: "text-emerald-400" },
    { time: "18:41:12", agent: "Ian (QA)", msg: "Executed 40 async endpoint assertions... 100% passed", duration: "3.1s", status: "Success", color: "text-emerald-400" },
    { time: "18:40:30", agent: "Jack (Security)", msg: "Sanitized Pydantic models against SQL injection vulnerabilities", duration: "1.2s", status: "Success", color: "text-emerald-400" },
    { time: "18:39:55", agent: "Charlie (Architect)", msg: "Approved multi-tier architecture design in War Room Session #12", duration: "0.9s", status: "Approved", color: "text-purple-400" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Real-time Execution Stream Logs</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Live Buffer Log</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] text-slate-500 uppercase">
              <th className="py-2.5 px-3">Timestamp</th>
              <th className="py-2.5 px-3">Agent</th>
              <th className="py-2.5 px-3">Message</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="py-2.5 px-3 text-slate-500">{log.time}</td>
                <td className="py-2.5 px-3 text-indigo-300 font-bold">{log.agent}</td>
                <td className="py-2.5 px-3 text-slate-300 max-w-md truncate">{log.msg}</td>
                <td className="py-2.5 px-3 text-slate-500">{log.duration}</td>
                <td className="py-2.5 px-3 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border border-current ${log.color}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
