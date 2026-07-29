"use client";

import React, { useState } from "react";
import { Settings, Save, RotateCcw, Download, ShieldCheck, Sparkles, Check } from "lucide-react";

interface HeaderProps {
  onSave: () => void;
  isSaving?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSave, isSaving }) => {
  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] relative overflow-hidden text-left mb-8">
      {/* Accent Top Bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Settings &amp; Administration
            </h1>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Enterprise AI Company
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-400">
            Configure your AI Software Company parameters, model routing, workforce autonomy levels, API credentials, and security controls.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all">
            <Download className="w-3.5 h-3.5" /> Export Specs
          </button>

          <button
            onClick={handleSaveClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Settings Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
