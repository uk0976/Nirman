"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Activity, Sparkles, CheckCircle2, ArrowUpRight, MoreVertical, ShieldCheck } from "lucide-react";

export interface EmployeeData {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: "Planning" | "Coding" | "Testing" | "Reviewing" | "Deploying" | "Thinking" | "Meeting" | "Idle" | "Offline";
  task: string;
  project: string;
  confidence: number;
  workload: number;
  avatar: string;
  model: string;
  responseTime: string;
  tasksCompleted: number;
  successRate: number;
}

interface EmployeeCardProps {
  employee: EmployeeData;
  onOpenProfile: (emp: EmployeeData) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onOpenProfile }) => {
  const getStatusBadge = (status: EmployeeData["status"]) => {
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
      case "Thinking":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case "Idle":
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-5 rounded-2xl border border-white/[0.06] hover:border-indigo-500/40 transition-all flex flex-col justify-between text-left group"
    >
      <div>
        {/* Top Avatar & Status Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black border border-white/20 flex items-center justify-center text-2xl shadow-lg shrink-0">
              {employee.avatar}
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                {employee.name}
              </h3>
              <span className="text-xs font-mono text-indigo-400 block">{employee.role}</span>
            </div>
          </div>

          <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(employee.status)}`}>
            {employee.status}
          </span>
        </div>

        {/* Current Task Box */}
        <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] mb-3 space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span className="uppercase tracking-wider">Current Task</span>
            <span className="text-indigo-400 truncate max-w-[120px]">{employee.project}</span>
          </div>
          <p className="text-xs text-slate-200 font-medium truncate">{employee.task}</p>
        </div>

        {/* Confidence & Workload */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Workload Capacity</span>
            <span className="text-slate-200 font-bold">{employee.workload}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${employee.workload}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer: Specs & Profile Button */}
      <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <div className="text-[10px] font-mono text-slate-400">
          <span>Confidence: <strong className="text-emerald-400">{employee.confidence}%</strong></span>
        </div>

        <button
          onClick={() => onOpenProfile(employee)}
          className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View Profile <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
