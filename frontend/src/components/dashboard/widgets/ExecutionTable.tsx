"use client";

import React from "react";
import { Cpu, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export const ExecutionTable: React.FC = () => {
  const executions = [
    { id: "EXEC-842", agent: "Fiona (Backend)", task: "Generate FastAPI SQLAlchemy Models", model: "gpt-4o-code (Codex)", duration: "2.4s", confidence: "96.4%", status: "Completed", tokens: "42,800", cost: "$0.08" },
    { id: "EXEC-841", agent: "Charlie (Architect)", task: "Formulate Schema Architecture Blueprint", model: "gpt-4o", duration: "1.8s", confidence: "94.2%", status: "Completed", tokens: "28,400", cost: "$0.05" },
    { id: "EXEC-840", agent: "Ian (QA)", task: "Execute Async Pytest Endpoint Suite", model: "gpt-4o-mini", duration: "3.1s", confidence: "98.0%", status: "Completed", tokens: "18,200", cost: "$0.01" },
    { id: "EXEC-839", agent: "Jack (Security)", task: "Sanitize SQL Parameters & Headers", model: "gpt-4o", duration: "1.5s", confidence: "95.1%", status: "Completed", tokens: "15,600", cost: "$0.03" },
    { id: "EXEC-838", agent: "Bob (PM)", task: "PRD Requirements Analysis Sizing", model: "gpt-4o", duration: "2.0s", confidence: "91.8%", status: "Completed", tokens: "31,000", cost: "$0.06" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent AI Execution Logs</h3>
        </div>
        <a href="/executions" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          View All Logs
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3">Run ID</th>
              <th className="py-3 px-3">Agent</th>
              <th className="py-3 px-3">Task Description</th>
              <th className="py-3 px-3">Model</th>
              <th className="py-3 px-3">Duration</th>
              <th className="py-3 px-3">Confidence</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Tokens</th>
              <th className="py-3 px-3 text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs">
            {executions.map((e) => (
              <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3 font-mono text-indigo-400 font-bold">{e.id}</td>
                <td className="py-3 px-3 font-semibold text-slate-200">{e.agent}</td>
                <td className="py-3 px-3 text-slate-400 max-w-xs truncate">{e.task}</td>
                <td className="py-3 px-3 font-mono text-slate-300">{e.model}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{e.duration}</td>
                <td className="py-3 px-3 font-mono font-bold text-emerald-400">{e.confidence}</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {e.status}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-slate-400">{e.tokens}</td>
                <td className="py-3 px-3 font-mono text-slate-200 text-right font-bold">{e.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
