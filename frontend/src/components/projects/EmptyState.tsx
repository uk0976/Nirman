"use client";

import React from "react";
import { FolderKanban, Plus } from "lucide-react";

interface EmptyStateProps {
  onOpenCreate: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onOpenCreate }) => {
  return (
    <div className="glass-panel p-12 border border-white/[0.08] text-center my-8 max-w-xl mx-auto space-y-4">
      <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
        <FolderKanban className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white">No Projects Found</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          You don't have any software projects matching your criteria. Start an autonomous build sprint with your AI Company.
        </p>
      </div>

      <button
        onClick={onOpenCreate}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
      >
        <Plus className="w-4 h-4" /> Create First Project
      </button>
    </div>
  );
};
