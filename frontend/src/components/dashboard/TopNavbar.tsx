"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Plus, User, Command, ChevronDown, Sparkles, LogOut, Shield, Settings } from "lucide-react";
import { SearchDialog } from "@/components/dashboard/SearchDialog";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { CreateProjectWizard } from "@/components/projects/CreateProjectWizard";

export function TopNavbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-[#0B0D14]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Workspace Switcher & Search Bar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-white/10 pr-4">
            <div className="w-6 h-6 rounded-md bg-indigo-600 p-[1px] flex items-center justify-center shadow-glow">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-xs text-white">Acme Labs</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3 bg-[#151824] border border-white/10 hover:border-indigo-500/40 rounded-xl px-3.5 py-1.5 text-xs text-gray-400 hover:text-white transition w-72 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Search workspace...</span>
            </div>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </span>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-3">
          {/* Create Project Button */}
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-xl shadow-glow transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Requirement</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0B0D14]" />
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 pl-2 border-l border-white/10 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-[#0D0F17] rounded-full flex items-center justify-center text-xs font-bold text-white">
                  UK
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl border border-white/10 shadow-2xl p-2 text-xs font-mono z-50 space-y-1">
                <div className="p-2.5 border-b border-white/10 space-y-0.5">
                  <p className="font-bold text-white">Umer Khan</p>
                  <p className="text-[10px] text-gray-400 font-sans">umer@acmelabs.com</p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition"
                >
                  <Settings className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Platform Settings</span>
                </Link>

                <Link
                  href="/security"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Security & 2FA</span>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <CreateProjectWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
    </>
  );
}
