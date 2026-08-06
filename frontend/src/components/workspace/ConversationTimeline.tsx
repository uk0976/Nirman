"use client";

import { useState } from "react";
import { Send, Sparkles, Bot, CheckCircle2, AlertCircle, FileCode2, Layers } from "lucide-react";

export function ConversationTimeline() {
  const [promptText, setPromptText] = useState("");
  const [timeline, setTimeline] = useState([
    {
      id: "1",
      role: "CEO",
      name: "Evelyn Vance",
      avatar: "👔",
      type: "DIRECTIVE",
      time: "10:42 AM",
      text: "Product Discovery phase initiated for 'Nirman SaaS Core'. All 14 AI specialized agents standing by for prompt directives."
    },
    {
      id: "2",
      role: "PRODUCT_MANAGER",
      name: "Sarah Lin",
      avatar: "📋",
      type: "ARTIFACT",
      time: "10:43 AM",
      text: "Synthesized Product Requirement Document (PRD v1.0) & SRS Specs with 45 User Stories.",
      artifact: "PRODUCT_REQUIREMENT_DOCUMENT.md (45 KB)"
    },
    {
      id: "3",
      role: "SYSTEM_ARCHITECT",
      name: "Elena Rostova",
      avatar: "📐",
      type: "HANDOFF",
      time: "10:44 AM",
      text: "Clean Architecture Modular Monolith specified with Next.js 15 App Router & FastAPI. Handoff to DB Architect David Chen."
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    const userEntry = {
      id: Date.now().toString(),
      role: "HUMAN_LEAD",
      name: "Umer Khan (Lead Architect)",
      avatar: "👤",
      type: "HUMAN_INPUT",
      time: "Just now",
      text: promptText
    };

    setTimeline((prev) => [...prev, userEntry]);
    setPromptText("");

    // Simulate Agent reply
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        role: "DATABASE_ARCHITECT",
        name: "David Chen",
        avatar: "🗄️",
        type: "AI_REPLY",
        time: "Just now",
        text: `Acknowledged instruction: "${promptText}". Updating PostgreSQL 3NF database schema and rebuilding Alembic migration scripts.`
      };
      setTimeline((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col h-[560px]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">AI Collaborative Conversation Timeline</h2>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Real-time Stream
        </span>
      </div>

      {/* Stream Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-1">
        {timeline.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition ${
              item.type === "HUMAN_INPUT"
                ? "bg-indigo-950/40 border-indigo-500/40 ml-6"
                : "bg-[#151824] border-white/5 mr-2"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base">{item.avatar}</span>
                <span className="font-bold text-white text-xs">{item.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10">
                  {item.role}
                </span>
              </div>
              <span className="text-[10px] text-gray-500">{item.time}</span>
            </div>

            <p className="text-gray-300 font-sans text-xs leading-relaxed">{item.text}</p>

            {item.artifact && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#0D0F17] border border-emerald-500/30 flex items-center justify-between text-[11px] text-emerald-300">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">{item.artifact}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">View Spec</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Prompt Directive Input */}
      <form onSubmit={handleSend} className="pt-2 border-t border-white/10 flex items-center gap-2">
        <input
          type="text"
          placeholder="Direct the AI Engineering Team (e.g. 'Add Redis session caching for OAuth tokens')..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="flex-1 bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl shadow-glow transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
