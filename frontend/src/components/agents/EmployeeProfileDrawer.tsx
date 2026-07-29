"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmployeeData } from "./EmployeeCard";
import { X, Sparkles, ShieldCheck, CheckCircle2, Cpu, FileText, Brain, Award, Clock } from "lucide-react";

interface EmployeeProfileDrawerProps {
  employee: EmployeeData | null;
  onClose: () => void;
}

export const EmployeeProfileDrawer: React.FC<EmployeeProfileDrawerProps> = ({
  employee,
  onClose,
}) => {
  if (!employee) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-xl h-full bg-[#08080c] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-left relative"
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-black border border-white/20 flex items-center justify-center text-3xl shadow-xl">
                  {employee.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                    {employee.name}
                  </h2>
                  <span className="text-xs font-mono text-indigo-400 block">{employee.role} ({employee.dept})</span>
                  <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                    Model: {employee.model} • {employee.status}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Tasks Done</span>
                <span className="text-lg font-bold text-white block">{employee.tasksCompleted}</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Success Rate</span>
                <span className="text-lg font-bold text-emerald-400 block">{employee.successRate}%</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Avg Latency</span>
                <span className="text-lg font-bold text-indigo-400 block">{employee.responseTime}</span>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-6 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Agent Mission Statement</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Autonomous specialist engineered to execute high-precision software engineering workflows within Nirman's multi-agent matrix.
              </p>
            </div>

            {/* Skills & Technologies */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Expertise &amp; Capabilities</h3>
              <div className="flex flex-wrap gap-1.5">
                {["FastAPI", "Python", "Pydantic", "PostgreSQL", "Docker", "Pytest", "OWASP Security"].map((sk) => (
                  <span
                    key={sk}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Memory & Context */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Active Memory Summary</h3>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Recent Decision</span>
                  <p className="text-slate-300">Approved multi-tier layered router design pattern for Inventory Control API.</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Active Context</span>
                  <p className="text-indigo-300 font-mono">Sprint 1 • FastAPI OAuth Router Module</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors">
              Assign New Task
            </button>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-300 font-medium">
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
