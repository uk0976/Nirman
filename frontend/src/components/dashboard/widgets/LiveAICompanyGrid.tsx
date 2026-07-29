"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Activity, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface AgentStatus {
  name: string;
  role: string;
  dept: string;
  status: "Idle" | "Planning" | "Coding" | "Testing" | "Reviewing" | "Deploying" | "Offline";
  task: string;
  confidence: number;
  workload: number;
  avatar: string;
  lastActive: string;
}

export const LiveAICompanyGrid: React.FC = () => {
  const [agents] = useState<AgentStatus[]>([
    { name: "Alice", role: "CEO", dept: "Management", status: "Reviewing", task: "Sprint 1 Deliverable Approval", confidence: 96, workload: 40, avatar: "👩‍💼", lastActive: "Just now" },
    { name: "Bob", role: "Product Manager", dept: "Product", status: "Planning", task: "PRD Requirements Sizing", confidence: 94, workload: 65, avatar: "👨‍💻", lastActive: "2m ago" },
    { name: "Charlie", role: "Software Architect", dept: "Architecture", status: "Reviewing", task: "FastAPI Layered Layout Blueprint", confidence: 92, workload: 80, avatar: "👨‍🔬", lastActive: "1m ago" },
    { name: "Diana", role: "UI/UX Designer", dept: "Design", status: "Idle", task: "Tailwind UI Tokens Spec", confidence: 98, workload: 20, avatar: "👩‍🎨", lastActive: "10m ago" },
    { name: "Evan", role: "Frontend Engineer", dept: "Frontend", status: "Coding", task: "Next.js Dashboard Components", confidence: 95, workload: 90, avatar: "👨‍💻", lastActive: "Active now" },
    { name: "Fiona", role: "Backend Engineer", dept: "Backend", status: "Coding", task: "SQLAlchemy Async Routers", confidence: 93, workload: 85, avatar: "👩‍💻", lastActive: "Active now" },
    { name: "George", role: "Database Engineer", dept: "Database", status: "Coding", task: "PostgreSQL Migration DDLs", confidence: 96, workload: 70, avatar: "👨‍🔧", lastActive: "3m ago" },
    { name: "Hope", role: "AI Engineer", dept: "AI", status: "Planning", task: "Prompt Chain Optimization", confidence: 91, workload: 50, avatar: "🤖", lastActive: "5m ago" },
    { name: "Ian", role: "QA Engineer", dept: "Quality", status: "Testing", task: "Running Pytest Endpoint Suite", confidence: 97, workload: 75, avatar: "🕵️‍♂️", lastActive: "Active now" },
    { name: "Jack", role: "Security Engineer", dept: "Security", status: "Reviewing", task: "OWASP Vulnerability Audit", confidence: 95, workload: 60, avatar: "🛡️", lastActive: "4m ago" },
    { name: "Kate", role: "DevOps Engineer", dept: "DevOps", status: "Deploying", task: "Packaging Docker Containers", confidence: 98, workload: 55, avatar: "🚀", lastActive: "1m ago" },
    { name: "Leo", role: "Documentation", dept: "Docs", status: "Idle", task: "Swagger OpenAPI Specification", confidence: 99, workload: 15, avatar: "📝", lastActive: "12m ago" },
  ]);

  const getStatusBadge = (status: AgentStatus["status"]) => {
    switch (status) {
      case "Coding":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "Testing":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Planning":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Reviewing":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Deploying":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "Idle":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live AI Company Employees</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">12 / 12 Operational</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent, i) => {
          const isThinking = agent.status === "Coding" || agent.status === "Testing" || agent.status === "Planning";
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{agent.avatar}</span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(agent.status)}`}>
                    {isThinking && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping inline-block mr-1" />}
                    {agent.status}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                  <span className="text-[11px] font-mono text-indigo-400 block">{agent.role}</span>
                </div>

                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04] mb-3 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Active Task</span>
                  <p className="text-[11px] text-slate-300 font-medium truncate">{agent.task}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Confidence: <strong className="text-emerald-400">{agent.confidence}%</strong></span>
                  <span>Workload: <strong className="text-slate-200">{agent.workload}%</strong></span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${agent.workload}%` }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
