"use client";

import { useState } from "react";
import { Bell, X, CheckCircle2, ShieldCheck, AlertCircle, Bot, Workflow, Trash2 } from "lucide-react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTIFICATIONS = [
  { id: "1", type: "AI_TASK", title: "PRD Specification Finalized", desc: "Sarah Lin (PM) approved Product Requirement Document v1.0 with 45 User Stories.", time: "2 mins ago", read: false },
  { id: "2", type: "SECURITY", title: "OWASP Security Audit Passed", desc: "Alex Mercer (Security Engineer) completed zero-vulnerability check for auth endpoints.", time: "15 mins ago", read: false },
  { id: "3", type: "SDLC", title: "3NF Database Schema Compiled", desc: "David Chen (DB Architect) synthesized PostgreSQL 3NF migration scripts.", time: "1 hour ago", read: true },
  { id: "4", type: "SYSTEM", title: "Nirman Engine v1.0 Active", desc: "All 14 specialized AI agents deployed and operating nominally.", time: "3 hours ago", read: true }
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [items, setItems] = useState(NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#0B0D14] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">Notifications Center</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {items.filter(n => !n.read).length} New
            </span>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
          {items.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-sans">
              No notifications right now.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition ${
                  item.read ? "bg-[#151824] border-white/5 opacity-70" : "bg-indigo-950/30 border-indigo-500/30 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-gray-200 text-xs">{item.title}</span>
                  <span className="text-[10px] text-gray-500">{item.time}</span>
                </div>
                <p className="text-gray-300 font-sans text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <button onClick={markAllRead} className="text-indigo-400 hover:text-indigo-300">
            Mark all as read
          </button>
          <button onClick={clearAll} className="text-gray-500 hover:text-red-400 flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}
