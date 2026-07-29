"use client";

import React, { useState } from "react";
import { Send, Paperclip, Code, Sparkles, AtSign, Award, Layers } from "lucide-react";

interface ComposerProps {
  onSendMessage: (text: string) => void;
  onStartVote?: () => void;
}

export const Composer: React.FC<ComposerProps> = ({ onSendMessage, onStartVote }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="glass-panel p-4 border border-white/[0.08] text-left space-y-3">
      {/* Quick Tool Triggers */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setText((prev) => prev + " @Fiona ")}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]"
        >
          <AtSign className="w-3.5 h-3.5 text-indigo-400" /> Mention Agent
        </button>

        <button
          onClick={() => setText((prev) => prev + " ```python\n# Proposed FastAPI Code\n```")}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]"
        >
          <Code className="w-3.5 h-3.5 text-cyan-400" /> Insert Code
        </button>

        <button
          onClick={onStartVote}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30 font-semibold"
        >
          <Award className="w-3.5 h-3.5 text-purple-400" /> Trigger Consensus Vote
        </button>
      </div>

      {/* Message Input Box */}
      <div className="flex items-center gap-3">
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Speak to AI Employees or propose architectural changes (e.g., @Charlie approve FastAPI layout)..."
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans resize-none"
        />

        <button
          onClick={handleSend}
          className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 hover:opacity-90 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
