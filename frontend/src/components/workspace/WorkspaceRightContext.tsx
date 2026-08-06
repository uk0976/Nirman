"use client";

import { useState } from "react";
import { Bot, ShieldCheck, Terminal, AlertCircle, CheckCircle2, Play, Pause } from "lucide-react";
import { HumanApprovalModal } from "@/components/workspace/HumanApprovalModal";
import { ExecutionLogsDrawer } from "@/components/workspace/ExecutionLogsDrawer";

export function WorkspaceRightContext() {
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  return (
    <div className="w-80 border-l border-white/10 bg-[#0B0D14] p-4 flex flex-col justify-between h-full select-none space-y-4">
      {/* Running Agents & Context Header */}
      <div className="space-y-4 overflow-y-auto">
        {/* Human Approval Alert Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-bold text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Human Approval Required</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <p className="text-[11px] text-gray-300 leading-tight font-sans">
            David Chen (DB Architect) requested approval for 3NF PostgreSQL schema migration script.
          </p>
          <button
            onClick={() => setIsApprovalOpen(true)}
            className="w-full mt-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-1.5 rounded-lg transition shadow-sm"
          >
            Review & Approve Schema
          </button>
        </div>

        {/* Active Agents Roster */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white uppercase">Active Agent Roster</span>
            <span className="text-emerald-400 font-bold text-[10px]">14 Running</span>
          </div>

          <div className="space-y-2">
            {[
              { role: "CEO", name: "Evelyn Vance", avatar: "👔", state: "THINKING", task: "Product Vision Alignment" },
              { role: "Product Manager", name: "Sarah Lin", avatar: "📋", state: "EXECUTING", task: "PRD & SRS Specifications" },
              { role: "System Architect", name: "Elena Rostova", avatar: "📐", state: "EXECUTING", task: "Clean Architecture Design" },
              { role: "DB Architect", name: "David Chen", avatar: "🗄️", state: "WAITING", task: "3NF Database Schema" },
              { role: "Security Auditor", name: "Alex Mercer", avatar: "🛡️", state: "IDLE", task: "OWASP Top 10 Audit" }
            ].map((ag, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#151824] border border-white/5 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{ag.avatar}</span>
                    <div>
                      <h4 className="font-bold text-gray-200 text-xs leading-tight">{ag.name}</h4>
                      <p className="text-[9px] text-gray-400 font-mono">{ag.role}</p>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      ag.state === "EXECUTING"
                        ? "bg-emerald-400 animate-ping"
                        : ag.state === "THINKING"
                        ? "bg-indigo-400 animate-pulse"
                        : ag.state === "WAITING"
                        ? "bg-amber-400 animate-pulse"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-mono truncate bg-white/5 p-1 rounded">
                  {ag.task}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls: Live Execution Logs Drawer Trigger */}
      <div className="pt-3 border-t border-white/10">
        <button
          onClick={() => setIsLogsOpen(true)}
          className="w-full bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-200 font-mono text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>Open Execution Logs Console</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <HumanApprovalModal isOpen={isApprovalOpen} onClose={() => setIsApprovalOpen(false)} />
      <ExecutionLogsDrawer isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} />
    </div>
  );
}
