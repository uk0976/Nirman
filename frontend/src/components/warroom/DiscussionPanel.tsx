"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code2
} from "lucide-react";

export interface MessageData {
  id: string;
  agentName: string;
  agentRole: string;
  avatar: string;
  timestamp: string;
  confidence: number;
  type: "Proposal" | "Architecture Review" | "Security Warning" | "Approval" | "Task Assignment" | "Suggestion" | "System Event";
  content: string;
  codeSnippet?: string;
  reasoningSummary?: string;
}

interface DiscussionPanelProps {
  messages: MessageData[];
  isAIThinking?: boolean;
}

export const DiscussionPanel: React.FC<DiscussionPanelProps> = ({ messages, isAIThinking }) => {
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({});

  const toggleReasoning = (id: string) => {
    setExpandedReasoning((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getMessageTypeBadge = (type: MessageData["type"]) => {
    switch (type) {
      case "Proposal":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "Architecture Review":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Security Warning":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "Approval":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Task Assignment":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "Suggestion":
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] flex-1 text-left flex flex-col justify-between h-[650px]">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">War Room Live Stream Discussion</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">OpenAI Responses API + Codex Channel</span>
      </div>

      {/* Messages Stream Container */}
      <div className="space-y-4 overflow-y-auto pr-2 flex-1 scrollbar-thin">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/15 transition-all space-y-3"
          >
            {/* Message Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{msg.avatar}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{msg.agentName}</span>
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold">({msg.agentRole})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${getMessageTypeBadge(msg.type)}`}>
                  {msg.type}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {msg.confidence}% Conf.
                </span>
              </div>
            </div>

            {/* Message Body */}
            <p className="text-xs text-slate-200 leading-relaxed font-sans pl-9">{msg.content}</p>

            {/* Optional Code Snippet */}
            {msg.codeSnippet && (
              <div className="ml-9 p-3 rounded-lg bg-[#050508] border border-white/10 text-xs font-mono text-indigo-300 overflow-x-auto">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 border-b border-white/[0.06] pb-1">
                  <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-indigo-400" /> Proposed Code</span>
                  <span>Python FastAPI</span>
                </div>
                <pre>{msg.codeSnippet}</pre>
              </div>
            )}

            {/* Optional Expandable Reasoning */}
            {msg.reasoningSummary && (
              <div className="ml-9 pt-1">
                <button
                  onClick={() => toggleReasoning(msg.id)}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{expandedReasoning[msg.id] ? "Hide Chain-of-Thought Reasoning" : "View Agent Reasoning"}</span>
                  {expandedReasoning[msg.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {expandedReasoning[msg.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-slate-300 font-mono leading-relaxed"
                  >
                    {msg.reasoningSummary}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {/* Live Thinking Bar */}
        {isAIThinking && (
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs flex items-center gap-3 animate-pulse">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="text-purple-300 font-mono">Fiona (Backend Engineer) is formulating a code proposal...</span>
          </div>
        )}
      </div>
    </div>
  );
};
