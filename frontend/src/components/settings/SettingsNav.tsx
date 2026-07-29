"use client";

import React from "react";
import {
  User,
  Building,
  Cpu,
  Users,
  Workflow,
  FolderGit2,
  Bell,
  ShieldCheck,
  Key,
  Layers,
  CreditCard,
  Palette,
  Sliders
} from "lucide-react";

export type SettingsTab =
  | "profile"
  | "org"
  | "providers"
  | "employees"
  | "workflows"
  | "projects"
  | "notifications"
  | "security"
  | "apikeys"
  | "integrations"
  | "billing"
  | "appearance"
  | "advanced";

interface SettingsNavProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsNav: React.FC<SettingsNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: SettingsTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "profile", label: "User Profile", icon: User },
    { id: "org", label: "Organization", icon: Building },
    { id: "providers", label: "AI Providers & Models", icon: Cpu },
    { id: "employees", label: "AI Employees Hub", icon: Users },
    { id: "workflows", label: "Workflow Defaults", icon: Workflow },
    { id: "projects", label: "Project Defaults", icon: FolderGit2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Access", icon: ShieldCheck },
    { id: "apikeys", label: "API Credentials", icon: Key },
    { id: "integrations", label: "Integrations", icon: Layers },
    { id: "billing", label: "Billing & Subscriptions", icon: CreditCard },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "advanced", label: "Advanced", icon: Sliders },
  ];

  return (
    <nav className="w-64 shrink-0 glass-panel p-3 border border-white/[0.08] hidden md:block text-left space-y-1">
      {tabs.map((tb) => {
        const Icon = tb.icon;
        const active = activeTab === tb.id;
        return (
          <button
            key={tb.id}
            onClick={() => onTabChange(tb.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              active
                ? "bg-indigo-600/20 text-white border border-indigo-500/40 shadow-md shadow-indigo-600/10 font-bold"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Icon className={`w-4 h-4 ${active ? "text-indigo-400" : "text-slate-500"}`} />
            <span>{tb.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
