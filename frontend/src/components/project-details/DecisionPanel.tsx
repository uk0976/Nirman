"use client";

import { useState } from "react";
import { MessageSquare, Send, AtSign, Paperclip, Bot, User } from "lucide-react";

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  time: string;
  isAgent?: boolean;
}

const INITIAL_COMMENTS: CommentItem[] = [
  { id: "c-1", author: "Umer Khan", avatar: "UK", role: "Owner", text: "@Sarah Lin (PM) ensure the PRD includes OAuth2 social login user stories.", time: "10m ago" },
  { id: "c-2", author: "Sarah Lin", avatar: "📋", role: "Product Manager", text: "Added User Stories #14 through #18 for Google & GitHub OAuth2 login integration.", time: "5m ago", isAgent: true },
  { id: "c-3", author: "David Chen", avatar: "🗄️", role: "DB Architect", text: "Normalized user_credentials table to support multiple OAuth providers in 3NF schema.", time: "Just now", isAgent: true }
];

export function DecisionPanel() {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: CommentItem = {
      id: Date.now().toString(),
      author: "Umer Khan",
      avatar: "UK",
      role: "Lead Architect",
      text,
      time: "Just now"
    };

    setComments([...comments, newComment]);
    setText("");

    // Simulate AI Agent mention response
    if (text.includes("@")) {
      setTimeout(() => {
        const agentReply: CommentItem = {
          id: (Date.now() + 1).toString(),
          author: "Alex Mercer",
          avatar: "🛡️",
          role: "Security Engineer",
          text: `Acknowledged mention in "${text}". Reviewing security specs and updating JWT payload structure.`,
          time: "Just now",
          isAgent: true
        };
        setComments((prev) => [...prev, agentReply]);
      }, 1000);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Team & AI Collaboration Stream</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          @Agent Mentions Enabled
        </span>
      </div>

      {/* Comment List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {comments.map((c) => (
          <div key={c.id} className={`p-3.5 rounded-xl border ${c.isAgent ? "bg-[#151824] border-indigo-500/30" : "bg-[#0D0F17] border-white/5"}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{c.avatar} {c.author}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10">
                  {c.role}
                </span>
              </div>
              <span className="text-[10px] text-gray-500">{c.time}</span>
            </div>
            <p className="text-gray-300 font-sans text-xs mt-1 leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-white/10">
        <input
          type="text"
          placeholder="Write a comment or mention an agent (e.g. '@Sarah Lin check PRD')..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-[#151824] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl shadow-glow transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
