"use client";

import React, { useState, useEffect } from "react";
import { Activity, Terminal, Shield, CheckCircle, Code, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState([
    { id: 1, agent: "Alice (CEO)", action: "Approved Sprint 1 deliverables roadmap", project: "Inventory Control API", time: "Just now", icon: CheckCircle, color: "text-emerald-400" },
    { id: 2, agent: "Charlie (Architect)", action: "Generated system structural layout specs", project: "Inventory Control API", time: "2m ago", icon: FileText, color: "text-purple-400" },
    { id: 3, agent: "Fiona (Backend)", action: "Committed /api/v1/auth controller routers", project: "Mobile Warehouse Portal", time: "4m ago", icon: Code, color: "text-indigo-400" },
    { id: 4, agent: "Ian (QA)", action: "Ran backend test suite... 40 tests passed", project: "Inventory Control API", time: "6m ago", icon: CheckCircle, color: "text-teal-400" },
    { id: 5, agent: "Jack (Security)", action: "Verified OWASP input sanitization constraints", project: "Mobile Warehouse Portal", time: "9m ago", icon: Shield, color: "text-amber-400" },
  ]);

  useEffect(() => {
    const newEvents = [
      { agent: "Bob (PM)", action: "Refined PRD feature specifications", project: "Mobile Warehouse Portal", icon: FileText, color: "text-indigo-400" },
      { agent: "George (DB)", action: "Updated PostgreSQL foreign key constraints", project: "Inventory Control API", icon: Code, color: "text-cyan-400" },
      { agent: "Kate (DevOps)", action: "Pushed container image to staging registry", project: "Mobile Warehouse Portal", icon: CheckCircle, color: "text-emerald-400" },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      const event = newEvents[idx % newEvents.length];
      setActivities((prev) => [
        { id: Date.now(), ...event, time: "Just now" },
        ...prev.slice(0, 7),
      ]);
      idx++;
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] text-left flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Activity Feed</h3>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="space-y-3 overflow-hidden">
          <AnimatePresence>
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-black/40 border border-white/[0.04] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <Icon className={`w-4 h-4 ${act.color} shrink-0 mt-0.5`} />
                    <div>
                      <span className="font-semibold text-slate-200 block">{act.agent}</span>
                      <span className="text-[11px] text-slate-400 leading-tight block">{act.action}</span>
                      <span className="text-[10px] font-mono text-indigo-400 mt-1 block">{act.project}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.time}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
