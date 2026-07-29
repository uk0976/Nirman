"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  MessageSquare,
  Workflow,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "warroom" | "workflows" | "alerts">("all");

  const notifications = [
    {
      id: "1",
      type: "warroom",
      title: "War Room Session Triggered",
      message: "CEO Alice initiated a session for 'Architecture Gate Review' on Project Inventory API.",
      time: "2 mins ago",
      icon: MessageSquare,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      id: "2",
      type: "workflows",
      title: "Stage 5 API Development Complete",
      message: "Fiona (Backend Engineer) completed async FastAPI routing modules.",
      time: "12 mins ago",
      icon: Workflow,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: "3",
      type: "alerts",
      title: "QA Test Suite Passed",
      message: "Ian (QA Specialist) verified 40 tests with 100% assertion pass rates.",
      time: "35 mins ago",
      icon: CheckCircle,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "4",
      type: "alerts",
      title: "Security Token Check Required",
      message: "Jack (Security Engineer) flagged 1 configuration warning in auth refresh headers.",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  const filtered = notifications.filter((n) => activeFilter === "all" || n.type === activeFilter);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full bg-[#08080c] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl relative"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Notifications</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 text-xs overflow-x-auto pb-1">
              {[
                { id: "all", label: "All" },
                { id: "warroom", label: "War Room" },
                { id: "workflows", label: "Workflows" },
                { id: "alerts", label: "Alerts" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                    activeFilter === filter.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/15 transition-all text-left space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg border ${item.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-7">{item.message}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Mark all as read
            </button>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-300 font-medium">
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
