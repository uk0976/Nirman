"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { Header } from "@/components/settings/Header";
import { SettingsNav, SettingsTab } from "@/components/settings/SettingsNav";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AIProviderSettings } from "@/components/settings/AIProviderSettings";
import { EmployeeConfiguration } from "@/components/settings/EmployeeConfiguration";
import { APIKeyManager } from "@/components/settings/APIKeyManager";
import { IntegrationsPage } from "@/components/settings/IntegrationsPage";
import { BillingPage } from "@/components/settings/BillingPage";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("providers");

  // Fetch settings from Backend API
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/settings/");
        return res.data;
      } catch (err) {
        // Fallback
      }
      return { orgName: "Nirman Autonomous Software Inc." };
    },
  });

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 relative font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Top Navbar */}
      <TopNavbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenQuickCreate={() => setSearchOpen(true)}
      />

      {/* Notification Slide-out Panel */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* Global Search Dialog (Ctrl+K) */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Main Settings Area */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <Header onSave={() => {}} />

          {/* Tab Navigation & Active Content Layout */}
          <div className="flex items-start gap-8">
            
            {/* Left Nav */}
            <SettingsNav activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "providers" && <AIProviderSettings />}
              {activeTab === "employees" && <EmployeeConfiguration />}
              {activeTab === "apikeys" && <APIKeyManager />}
              {activeTab === "integrations" && <IntegrationsPage />}
              {activeTab === "billing" && <BillingPage />}
              {activeTab !== "profile" &&
                activeTab !== "providers" &&
                activeTab !== "employees" &&
                activeTab !== "apikeys" &&
                activeTab !== "integrations" &&
                activeTab !== "billing" && <AIProviderSettings />}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
