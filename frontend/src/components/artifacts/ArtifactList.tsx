"use client";

import React from "react";
import { ArtifactData } from "./ArtifactCard";
import { Eye, Download, History, Share2, FileCode2 } from "lucide-react";

interface ArtifactListProps {
  artifacts: ArtifactData[];
  onPreview: (art: ArtifactData) => void;
  onVersionHistory: (art: ArtifactData) => void;
  onShare: (art: ArtifactData) => void;
}

export const ArtifactList: React.FC<ArtifactListProps> = ({
  artifacts,
  onPreview,
  onVersionHistory,
  onShare,
}) => {
  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/[0.06] text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <th className="py-3 px-3">Artifact</th>
            <th className="py-3 px-3">Project</th>
            <th className="py-3 px-3">Type</th>
            <th className="py-3 px-3">Version</th>
            <th className="py-3 px-3">Author Agent</th>
            <th className="py-3 px-3">Size</th>
            <th className="py-3 px-3">Updated</th>
            <th className="py-3 px-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04] text-xs font-mono">
          {artifacts.map((art) => (
            <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 font-sans">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white hover:text-indigo-300 cursor-pointer font-sans" onClick={() => onPreview(art)}>
                    {art.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-3 text-slate-400">{art.project}</td>
              <td className="py-3 px-3 text-indigo-300">{art.type}</td>
              <td className="py-3 px-3">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px]">
                  {art.version}
                </span>
              </td>
              <td className="py-3 px-3 text-slate-300 font-sans">
                {art.authorAvatar} {art.author}
              </td>
              <td className="py-3 px-3 text-slate-500">{art.size}</td>
              <td className="py-3 px-3 text-slate-500 text-[10px]">{art.updatedAt}</td>
              <td className="py-3 px-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onPreview(art)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onVersionHistory(art)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded">
                    <History className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onShare(art)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
