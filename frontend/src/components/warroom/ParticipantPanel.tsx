"use client";

import React from "react";
import { Users, Activity, Sparkles, Mic, Volume2 } from "lucide-react";

export interface Participant {
  name: string;
  role: string;
  avatar: string;
  isSpeaking: boolean;
  isThinking: boolean;
  confidence: number;
  task: string;
  voteStatus?: "Approve" | "Reject" | "Needs Changes" | "Abstain";
}

interface ParticipantPanelProps {
  participants: Participant[];
}

export const ParticipantPanel: React.FC<ParticipantPanelProps> = ({ participants }) => {
  return (
    <div className="w-72 shrink-0 glass-panel p-4 border border-white/[0.08] hidden lg:block text-left h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">War Room Participants</h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">
          {participants.length} Active
        </span>
      </div>

      <div className="space-y-2.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {participants.map((p) => (
          <div
            key={p.name}
            className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between ${
              p.isSpeaking
                ? "bg-purple-600/20 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                : p.isThinking
                ? "bg-indigo-500/10 border-indigo-500/30"
                : "bg-black/40 border-white/[0.04]"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <span className="text-xl">{p.avatar}</span>
                {p.isSpeaking && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
                )}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white block truncate flex items-center gap-1">
                  {p.name}
                  {p.isSpeaking && <Volume2 className="w-3 h-3 text-purple-400 animate-pulse inline" />}
                </span>
                <span className="text-[10px] font-mono text-indigo-300 block truncate">{p.role}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              {p.voteStatus ? (
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    p.voteStatus === "Approve"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : p.voteStatus === "Reject"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {p.voteStatus}
                </span>
              ) : (
                <span className="text-[9px] font-mono text-slate-500">{p.confidence}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
