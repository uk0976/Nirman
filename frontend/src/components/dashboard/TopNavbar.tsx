"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  Activity,
  LogOut,
  User,
  Settings,
  Sparkles,
  Layers
} from "lucide-react";

interface TopNavbarProps {
  sidebarCollapsed: boolean;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenQuickCreate: () => void;
  unreadCount?: number;
  wsConnected?: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  sidebarCollapsed,
  onOpenSearch,
  onOpenNotifications,
  onOpenQuickCreate,
  unreadCount = 5,
  wsConnected = true,
}) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState("Production Headquarters");

  const workspaces = [
    "Production Headquarters",
    "Sprint 1 - Enterprise API",
    "Mobile Warehouse App",
    "Security Audit Sandbox"
  ];

  return (
    <header
      className={`fixed top-0 right-0 h-16 z-30 bg-[#040406]/80 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarCollapsed ? "left-20" : "left-64"
      }`}
    >
      {/* Left: Workspace Selector & Quick Actions */}
      <div className="flex items-center gap-4">
        {/* Workspace Dropdown */}
        <div className="relative">
          <button
            onClick={() => setWorkspaceOpen(!workspaceOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-xs font-semibold text-white transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>{selectedWorkspace}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {workspaceOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0e] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50">
              <div className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase tracking-wider">
                Select Workspace
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    setSelectedWorkspace(ws);
                    setWorkspaceOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedWorkspace === ws
                      ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                      : "text-slate-300 hover:bg-white/[0.06]"
                  }`}
                >
                  {ws}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] hover:border-indigo-500/40 text-xs text-slate-400 hover:text-slate-200 transition-all w-64 justify-between group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <span>Search project, agents, artifacts...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.08] text-slate-400 rounded border border-white/10">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: AI Status, Quick Create, Notifications, User Profile */}
      <div className="flex items-center gap-3">
        {/* Live AI Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{wsConnected ? "12 AI Agents Online" : "Connecting..."}</span>
        </div>

        {/* Quick Create Button */}
        <button
          onClick={onOpenQuickCreate}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Requirement</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-mono font-bold flex items-center justify-center border border-black">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Trigger */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-indigo-500/50 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-[#0a0a0e] border border-white/10 rounded-xl shadow-2xl p-1.5 z-50">
              <div className="px-3 py-2 border-b border-white/[0.06] mb-1">
                <p className="text-xs font-bold text-white truncate">{user?.full_name || "User Account"}</p>
                <p className="text-[10px] font-mono text-slate-400 truncate">{user?.email || "user@nirman.ai"}</p>
              </div>

              <a
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/[0.06] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Profile Settings
              </a>

              <a
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/[0.06] transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                Company Preferences
              </a>

              <button
                onClick={logout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors mt-1 border-t border-white/[0.06]"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
