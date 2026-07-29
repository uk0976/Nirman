"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  Workflow,
  FileCode2,
  Cpu,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  unreadCount = 5,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: FolderKanban, badge: "3 Running" },
    { label: "AI Employees", href: "/agents", icon: Users, badge: "12 Online" },
    { label: "War Room", href: "/warroom", icon: MessageSquare, badge: "Live" },
    { label: "Workflow Engine", href: "/workflow", icon: Workflow },
    { label: "Artifacts", href: "/artifacts", icon: FileCode2 },
    { label: "Executions", href: "/executions", icon: Cpu },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Notifications", href: "/notifications", icon: Bell, badge: unreadCount ? `${unreadCount}` : undefined },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 bg-[#060608]/90 backdrop-blur-xl border-r border-white/[0.08] transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header & Branding */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.06]">
          {!collapsed ? (
            <a href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent truncate">
                निर्माण | Nirman
              </span>
            </a>
          ) : (
            <span className="mx-auto text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              नि
            </span>
          )}

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all relative group ${
                  isActive
                    ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"}`} />

                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      item.badge === "Live"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse"
                        : isActive
                        ? "bg-indigo-500/30 text-indigo-300"
                        : "bg-white/[0.06] text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Left Active Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeSideGlow"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_8px_#6366f1]"
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-white/[0.06] bg-black/30">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">{user?.full_name || "User Account"}</span>
                <span className="text-[10px] font-mono text-indigo-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-indigo-400 inline" />
                  {user?.role || "Developer"}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
