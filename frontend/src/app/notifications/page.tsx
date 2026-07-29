"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { Bell, CheckCheck, Filter, ShieldCheck, AlertCircle, Info, MessageSquare } from "lucide-react";

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const notifications = [
    {
      id: "1",
      title: "Consensus Approved for Architecture Gate",
      desc: "CEO Alice and Software Architect Charlie reached 92% consensus on the inventory router specification.",
      time: "5 minutes ago",
      type: "success",
      icon: ShieldCheck,
    },
    {
      id: "2",
      title: "Security Audit Warning Triggered",
      desc: "Jack (Security Engineer) highlighted unencrypted bearer tokens in sandbox testing environment.",
      time: "18 minutes ago",
      type: "warning",
      icon: AlertCircle,
    },
    {
      id: "3",
      title: "Pytest Suite Completed",
      desc: "Ian (QA Engineer) generated 14 unit test fixtures for the user registration endpoint. 100% passed.",
      time: "42 minutes ago",
      type: "info",
      icon: Info,
    },
    {
      id: "4",
      title: "War Room Session Initialized",
      desc: "New discussion thread created for Sprint 2 tech stack selection.",
      time: "1 hour ago",
      type: "message",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 relative font-sans selection:bg-indigo-500/30">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopNavbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenQuickCreate={() => setSearchOpen(true)}
      />

      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1200px] mx-auto space-y-8">
          
          {/* Header */}
          <div className="glass-panel p-8 border border-white/[0.08] relative overflow-hidden text-left">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-3">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Activity & System Notifications</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2">
                  Notification Center
                </h1>
                <p className="text-xs text-slate-400">
                  Real-time alerts, agent consensus updates, security warnings, and build completion logs.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("All notifications marked as read.")}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all flex items-center gap-2"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark All as Read
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="glass-panel p-6 border border-white/[0.08] text-left space-y-4">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-indigo-500/30 transition-all flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{n.title}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
}
