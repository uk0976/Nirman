"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { WorkspaceLeftSidebar } from "@/components/workspace/WorkspaceLeftSidebar";
import { WorkspaceRightContext } from "@/components/workspace/WorkspaceRightContext";
import { ConversationTimeline } from "@/components/workspace/ConversationTimeline";
import { WorkflowCanvas } from "@/components/workspace/WorkflowCanvas";
import { TaskQueuePanel } from "@/components/workspace/TaskQueuePanel";

export default function AIWorkspacePage() {
  const [activeView, setActiveView] = useState("timeline");

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      {/* Platform Navigation Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />

        {/* 3-Pane AI Workspace Shell */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Pane 1: Left Workspace Navigation */}
          <WorkspaceLeftSidebar activeView={activeView} onViewChange={setActiveView} />

          {/* Pane 2: Center Main Working Area */}
          <main className="flex-1 p-6 overflow-y-auto min-w-0 space-y-6">
            {activeView === "timeline" && <ConversationTimeline />}
            {activeView === "canvas" && <WorkflowCanvas />}
            {activeView === "tasks" && <TaskQueuePanel />}
            {activeView === "agents" && <WorkflowCanvas />}
            {activeView === "artifacts" && <ConversationTimeline />}
            {activeView === "kb" && <WorkflowCanvas />}
          </main>

          {/* Pane 3: Right Contextual & Approval Sidebar */}
          <WorkspaceRightContext />
        </div>
      </div>
    </div>
  );
}
