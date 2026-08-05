"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import {
  Terminal,
  Send,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

const AGENT_MESSAGES = [
  {
    id: "1",
    role: "CEO",
    name: "Evelyn Vance",
    avatar: "👔",
    message: "Welcome to the AI War Room. We are initiating Phase 1 to 20 for 'Nirman AI SaaS Platform'. Solution Architect & System Architect, present your system topology proposal.",
    timestamp: "10:42 AM",
    type: "DIRECTIVE"
  },
  {
    id: "2",
    role: "SOLUTION_ARCHITECT",
    name: "Vikram Patel",
    avatar: "🏗️",
    message: "Analyzed non-functional requirements. I recommend a Clean Architecture Modular Monolith using Next.js 15 App Router on Frontend and FastAPI Async Python backend with Async SQLAlchemy.",
    timestamp: "10:43 AM",
    type: "PROPOSAL"
  },
  {
    id: "3",
    role: "DATABASE_ARCHITECT",
    name: "David Chen",
    avatar: "🗄️",
    message: "Agreed. For database design, we will use PostgreSQL 16 with pgvector for AI memory embeddings, normalized to 3NF. Zero-setup SQLite fallback included for instant dev mode.",
    timestamp: "10:44 AM",
    type: "TECHNICAL_SPEC"
  },
  {
    id: "4",
    role: "SECURITY_ENGINEER",
    name: "Alex Mercer",
    avatar: "🛡️",
    message: "Security Audit: Implemented JWT HS256 tokens, bcrypt password hashing, OWASP top 10 sanitization, and strict CORS middleware on FastAPI.",
    timestamp: "10:45 AM",
    type: "SECURITY_AUDIT"
  },
  {
    id: "5",
    role: "QA_ENGINEER",
    name: "Devon Hayes",
    avatar: "🧪",
    message: "Test Plan Verified: 100% of API endpoints covered with PyTest fixtures and async HTTPX client tests.",
    timestamp: "10:46 AM",
    type: "QA_VERIFICATION"
  }
];

export default function WarRoomPage() {
  const [messages, setMessages] = useState(AGENT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      role: "HUMAN_LEAD",
      name: "Umer Khan (Lead Architect)",
      avatar: "👤",
      message: inputPrompt,
      timestamp: "Just now",
      type: "HUMAN_INPUT"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");

    // Simulate AI Agent response
    setTimeout(() => {
      const responseMsg = {
        id: (Date.now() + 1).toString(),
        role: "SYSTEM_ARCHITECT",
        name: "Elena Rostova",
        avatar: "📐",
        message: `Acknowledged instruction: "${inputPrompt}". Updating system architecture specs and broadcasting to backend and frontend engineers.`,
        timestamp: "Just now",
        type: "AI_ACKNOWLEDGMENT"
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h1 className="text-xl font-bold text-white tracking-tight">AI War Room & Multi-Agent Workspace</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold animate-pulse">
                  LIVE DEBATE STREAM
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Real-time consensus timeline where 14 specialized AI engineering roles debate, review, and synthesize project code.
              </p>
            </div>
          </div>

          {/* Main Grid: Stream & Agent Roster */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
            {/* Stream Console */}
            <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/10 flex flex-col overflow-hidden h-[600px]">
              {/* Console Top Bar */}
              <div className="bg-[#0B0D14] px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>orchestrator://project-nirman-core/sdlc-stream</span>
                </div>
                <span className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-gray-400">
                  14 AGENTS CONNECTED
                </span>
              </div>

              {/* Message Timeline */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border ${
                      msg.type === "HUMAN_INPUT"
                        ? "bg-indigo-950/40 border-indigo-500/30 ml-8"
                        : "bg-[#151824] border-white/5 mr-4"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{msg.avatar}</span>
                        <span className="font-bold text-gray-200">{msg.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10">
                          {msg.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed font-sans text-xs">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 bg-[#0B0D14] border-t border-white/10 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Direct the AI Engineering Team (e.g. 'Add Redis caching to API endpoints')..."
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  className="flex-1 bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl shadow-glow transition flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right Sidebar: Active Agent Roster */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Connected AI Roster</h2>
              <div className="space-y-2.5 overflow-y-auto max-h-[520px]">
                {[
                  { role: "CEO", name: "Evelyn Vance", avatar: "👔", state: "Active" },
                  { role: "Product Manager", name: "Sarah Lin", avatar: "📋", state: "Active" },
                  { role: "Solution Architect", name: "Vikram Patel", avatar: "🏗️", state: "Active" },
                  { role: "System Architect", name: "Elena Rostova", avatar: "📐", state: "Active" },
                  { role: "DB Architect", name: "David Chen", avatar: "🗄️", state: "Active" },
                  { role: "Frontend Engineer", name: "Lucas Meyer", avatar: "⚛️", state: "Ready" },
                  { role: "Backend Engineer", name: "Aria Takahashi", avatar: "⚙️", state: "Ready" },
                  { role: "Security Engineer", name: "Alex Mercer", avatar: "🛡️", state: "Auditing" },
                  { role: "QA Engineer", name: "Devon Hayes", avatar: "🧪", state: "Ready" },
                  { role: "DevOps Engineer", name: "Kaito Tanaka", avatar: "🐳", state: "Ready" }
                ].map((ag, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#151824] border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>{ag.avatar}</span>
                      <div>
                        <p className="font-semibold text-gray-200 text-[11px]">{ag.name}</p>
                        <p className="text-[9px] text-gray-400 font-mono">{ag.role}</p>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
