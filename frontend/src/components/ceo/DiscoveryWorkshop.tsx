"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

interface DiscoveryWorkshopProps {
  onSynthesizePlan: (data: any) => void;
}

export function DiscoveryWorkshop({ onSynthesizePlan }: DiscoveryWorkshopProps) {
  const [projectName, setProjectName] = useState("Nirman SaaS Core Platform");
  const [ideaDescription, setIdeaDescription] = useState(
    "Enterprise AI Software Engineering Platform where specialized agents collaborate like a real software company."
  );
  const [targetAudience, setTargetAudience] = useState("Enterprise Software Teams, Founders, Agencies");
  const [businessGoals, setBusinessGoals] = useState("Automate 20-phase SDLC and reduce time-to-market by 10x.");
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      onSynthesizePlan({
        projectName,
        ideaDescription,
        targetAudience,
        businessGoals
      });
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-glow flex items-center justify-center">
          <span className="text-xl">👔</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">CEO Strategic Discovery Workshop</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              Evelyn Vance (CEO)
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Clarify business objectives, vision, target audience, and scope before delegating engineering tasks.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
        <div>
          <label className="block text-gray-300 font-medium mb-1">Project Name & Identity</label>
          <input
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/60"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-1">Raw Software Idea & Vision Statement</label>
          <textarea
            rows={3}
            required
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
            className="w-full bg-[#151824] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500/60 font-sans"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-1">Target Audience & Market Sector</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Primary Business Goals & KPIs</label>
            <input
              type="text"
              value={businessGoals}
              onChange={(e) => setBusinessGoals(e.target.value)}
              className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSynthesizing}
          className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-glow transition flex items-center justify-center gap-2"
        >
          {isSynthesizing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Synthesizing Strategic Execution Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Synthesize Strategic Execution Plan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
