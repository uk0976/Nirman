"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { SearchDialog } from "@/components/dashboard/SearchDialog";

import { Header } from "@/components/warroom/Header";
import { ParticipantPanel, Participant } from "@/components/warroom/ParticipantPanel";
import { DiscussionPanel, MessageData } from "@/components/warroom/DiscussionPanel";
import { ConsensusCard } from "@/components/warroom/ConsensusCard";
import { ArchitectureBoard } from "@/components/warroom/ArchitectureBoard";
import { InsightsPanel } from "@/components/warroom/InsightsPanel";
import { Composer } from "@/components/warroom/Composer";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export default function WarRoomPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // War Room Participants State
  const [participants] = useState<Participant[]>([
    { name: "Alice", role: "CEO", avatar: "👩‍💼", isSpeaking: false, isThinking: false, confidence: 96, task: "Executive Oversight", voteStatus: "Approve" },
    { name: "Bob", role: "Product Manager", avatar: "👨‍💻", isSpeaking: false, isThinking: false, confidence: 94, task: "Scope Validation", voteStatus: "Approve" },
    { name: "Charlie", role: "Software Architect", avatar: "👨‍🔬", isSpeaking: true, isThinking: false, confidence: 92, task: "Architecture Blueprint", voteStatus: "Approve" },
    { name: "Diana", role: "UI/UX Designer", avatar: "👩‍🎨", isSpeaking: false, isThinking: false, confidence: 98, task: "Design Tokens", voteStatus: "Approve" },
    { name: "Evan", role: "Frontend Engineer", avatar: "👨‍💻", isSpeaking: false, isThinking: false, confidence: 95, task: "Dashboard UI", voteStatus: "Approve" },
    { name: "Fiona", role: "Backend Engineer", avatar: "👩‍💻", isSpeaking: false, isThinking: true, confidence: 93, task: "FastAPI Routers", voteStatus: "Approve" },
    { name: "George", role: "Database Engineer", avatar: "👨‍🔧", isSpeaking: false, isThinking: false, confidence: 96, task: "PostgreSQL DDL", voteStatus: "Approve" },
    { name: "Hope", role: "AI Engineer", avatar: "🤖", isSpeaking: false, isThinking: false, confidence: 91, task: "Vector Indexing", voteStatus: "Approve" },
    { name: "Ian", role: "QA Engineer", avatar: "🕵️‍♂️", isSpeaking: false, isThinking: false, confidence: 97, task: "Pytest Fixtures", voteStatus: "Approve" },
    { name: "Jack", role: "Security Engineer", avatar: "🛡️", isSpeaking: false, isThinking: false, confidence: 95, task: "OWASP Review", voteStatus: "Needs Changes" },
    { name: "Kate", role: "DevOps Engineer", avatar: "🚀", isSpeaking: false, isThinking: false, confidence: 98, task: "Docker Config", voteStatus: "Approve" },
  ]);

  // Discussion Messages Stream State
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: "1",
      agentName: "Alice",
      agentRole: "CEO",
      avatar: "👩‍💼",
      timestamp: "18:40:12",
      confidence: 96,
      type: "Proposal",
      content: "Welcome to War Room Session #12. We are reviewing the multi-tier FastAPI architecture proposal for the Inventory Control API.",
      reasoningSummary: "Executive directive to enforce scalable backend patterns before Sprint 1 code generation.",
    },
    {
      id: "2",
      agentName: "Charlie",
      agentRole: "Software Architect",
      avatar: "👨‍🔬",
      timestamp: "18:40:45",
      confidence: 94,
      type: "Architecture Review",
      content: "I propose separating API routing controllers from database models into a dedicated /app/api/v1/ module layout to maintain DDD principles.",
      codeSnippet: "app/\n  ├── api/v1/\n  │   ├── auth_router.py\n  │   └── inventory_router.py\n  ├── models/item.py\n  └── main.py",
      reasoningSummary: "Decoupled architecture prevents circular imports and scales seamlessly for future microservice extraction.",
    },
    {
      id: "3",
      agentName: "Jack",
      agentRole: "Security Engineer",
      avatar: "🛡️",
      timestamp: "18:41:20",
      confidence: 95,
      type: "Security Warning",
      content: "Ensure auth refresh tokens use HttpOnly cookies rather than localStorage to prevent XSS credential theft.",
      reasoningSummary: "OWASP Top 10 security recommendation for web applications.",
    },
    {
      id: "4",
      agentName: "Fiona",
      agentRole: "Backend Engineer",
      avatar: "👩‍💻",
      timestamp: "18:42:05",
      confidence: 93,
      type: "Approval",
      content: "Agreed. I will implement HttpOnly cookie headers in the /auth/refresh controller using Pydantic V2 schemas.",
      reasoningSummary: "FastAPI cleanly supports Cookie dependency injection.",
    },
  ]);

  // Handle User Message Submission
  const handleSendMessage = (text: string) => {
    const userMsg: MessageData = {
      id: Date.now().toString(),
      agentName: "You (Lead)",
      agentRole: "User",
      avatar: "👤",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      confidence: 100,
      type: "Suggestion",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
  };

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

      {/* Main War Room Workspace */}
      <main
        className={`pt-20 pb-16 px-6 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header */}
          <Header
            sessionTitle="War Room Session #12: Architecture & Security Gate Review"
            projectName="Inventory Control API"
            workflowStage="Stage 4: Architecture Gate Review"
          />

          {/* Consensus Active Vote Card */}
          <ConsensusCard
            proposalTitle="Multi-tier FastAPI Layered Router & Argon2id Auth Schema"
            consensusPercentage={91}
            approvedCount={10}
            rejectedCount={0}
            pendingCount={1}
            ceoApproved={true}
          />

          {/* Architecture Whiteboard */}
          <ArchitectureBoard />

          {/* 3-Column Main Workspace */}
          <div className="flex items-start gap-6">
            
            {/* Left Column: Participants */}
            <ParticipantPanel participants={participants} />

            {/* Middle Column: Live Stream & Composer */}
            <div className="flex-1 min-w-0 space-y-6">
              <DiscussionPanel messages={messages} isAIThinking={false} />
              <Composer onSendMessage={handleSendMessage} />
            </div>

            {/* Right Column: Insights */}
            <InsightsPanel />

          </div>

        </div>
      </main>

    </div>
  );
}
