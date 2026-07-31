"use client";

import React from "react";
import { ArtifactCard, ArtifactData } from "./ArtifactCard";
import { FileCode2, Plus } from "lucide-react";

interface ArtifactGridProps {
  artifacts: ArtifactData[];
  onPreview: (art: ArtifactData) => void;
  onVersionHistory: (art: ArtifactData) => void;
  onShare: (art: ArtifactData) => void;
  onOpenCreateWizard?: () => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({
  artifacts,
  onPreview,
  onVersionHistory,
  onShare,
  onOpenCreateWizard,
}) => {
  if (artifacts.length === 0) {
    return (
      <div className="glass-panel p-12 text-center border border-white/[0.08] rounded-2xl mb-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400">
          <FileCode2 className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-base font-bold text-white mb-2">No Generated Artifacts Yet</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
          Launch an autonomous software project by clicking <strong className="text-indigo-300">+ New Requirement</strong> or using the Search bar to generate real PRDs, system architectures, code files, and Docker deployment artifacts.
        </p>
        <button
          onClick={onOpenCreateWizard}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Launch AI Project Wizard</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {artifacts.map((art) => (
        <ArtifactCard
          key={art.id}
          artifact={art}
          onPreview={onPreview}
          onVersionHistory={onVersionHistory}
          onShare={onShare}
        />
      ))}
    </div>
  );
};
