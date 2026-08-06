"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Bot,
  Terminal,
  Workflow,
  FileCode2,
  Sliders,
  BarChart3,
  Sparkles,
  Users,
  CreditCard,
  Bell,
  Cpu,
  BookOpen,
  FolderArchive,
  ChevronDown,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderGit2,
    subitems: [
      { label: "Active Software", href: "/projects" },
      { label: "Archived Builds", href: "/projects?filter=archived" }
    ]
  },
  { label: "AI War Room", href: "/warroom", icon: Terminal, badge: "Live" },
  { label: "AI Employees", href: "/agents", icon: Bot, count: "14" },
  { label: "Documents & PRDs", href: "/artifacts", icon: FileCode2 },
  { label: "Knowledge Base", href: "/artifacts?tab=kb", icon: BookOpen },
  { label: "SDLC Workflows", href: "/workflow", icon: Workflow },
  { label: "Files & Schemas", href: "/artifacts?tab=files", icon: FolderArchive },
  { label: "Team Members", href: "/team", icon: Users },
  { label: "Integrations", href: "/integrations", icon: Cpu },
  { label: "Billing & Plans", href: "/billing", icon: CreditCard },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Settings", href: "/settings", icon: Sliders },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("Projects");

  return (
    <aside className="w-64 border-r border-white/10 bg-[#0B0D14]/90 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="h-16 border-b border-white/10 px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-glow">
            <div className="w-full h-full bg-[#0D0F17] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              NIRMAN <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI PLATFORM</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Autonomous Company</span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          const Icon = item.icon;
          const hasSubmenu = item.subitems && item.subitems.length > 0;
          const isSubmenuOpen = openSubmenu === item.label;

          return (
            <div key={item.label}>
              <div
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 flex-1"
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>

                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold animate-pulse">
                    {item.badge}
                  </span>
                )}

                {item.count && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-gray-400">
                    {item.count}
                  </span>
                )}

                {hasSubmenu && (
                  <button
                    onClick={() => setOpenSubmenu(isSubmenuOpen ? null : item.label)}
                    className="p-1 hover:text-white"
                  >
                    {isSubmenuOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {/* Nested Submenu */}
              {hasSubmenu && isSubmenuOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  {item.subitems.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block py-1.5 px-2 rounded-lg text-[11px] text-gray-400 hover:text-white hover:bg-white/5 transition"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Badge */}
      <div className="p-3 border-t border-white/10 m-3 rounded-xl bg-[#0F121C] border border-white/5 flex items-center gap-2 text-[11px] text-gray-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <div className="truncate">
          <p className="font-semibold text-gray-300">SOC2 & ISO 27001</p>
          <p className="text-[10px] text-gray-500">Enterprise Verified</p>
        </div>
      </div>
    </aside>
  );
}
