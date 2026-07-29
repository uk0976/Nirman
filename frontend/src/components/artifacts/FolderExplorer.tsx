"use client";

import React, { useState } from "react";
import { Folder, FileText, ChevronRight, ChevronDown, Download, Eye } from "lucide-react";
import { ArtifactData } from "./ArtifactCard";

interface FolderExplorerProps {
  artifacts: ArtifactData[];
  onPreview: (art: ArtifactData) => void;
}

export const FolderExplorer: React.FC<FolderExplorerProps> = ({ artifacts, onPreview }) => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    architecture: true,
    backend: true,
    database: true,
    docs: true,
  });

  const toggle = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-indigo-400 font-sans" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Artifacts Directory Tree</h3>
        </div>
        <span className="text-[10px] text-slate-400">9 Subdirectories</span>
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
        {/* Architecture Folder */}
        <div>
          <button onClick={() => toggle("architecture")} className="flex items-center gap-2 text-slate-200 hover:text-white font-bold">
            {openFolders.architecture ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            <Folder className="w-4 h-4 text-purple-400" /> Architecture &amp; Design Specs/
          </button>
          {openFolders.architecture && (
            <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06] text-slate-400">
              <div onClick={() => onPreview(artifacts[0])} className="flex items-center justify-between hover:text-indigo-300 cursor-pointer p-1 rounded hover:bg-white/[0.02]">
                <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-purple-400" /> Architecture.md</span>
                <span className="text-[10px] text-slate-500">v2.1 • 14.2 KB</span>
              </div>
            </div>
          )}
        </div>

        {/* Backend Folder */}
        <div>
          <button onClick={() => toggle("backend")} className="flex items-center gap-2 text-slate-200 hover:text-white font-bold">
            {openFolders.backend ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            <Folder className="w-4 h-4 text-indigo-400" /> Backend API Controllers/
          </button>
          {openFolders.backend && (
            <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06] text-slate-400">
              <div onClick={() => onPreview(artifacts[2])} className="flex items-center justify-between hover:text-indigo-300 cursor-pointer p-1 rounded hover:bg-white/[0.02]">
                <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-indigo-400" /> OpenAPI.yaml</span>
                <span className="text-[10px] text-slate-500">v1.4 • 42.1 KB</span>
              </div>
            </div>
          )}
        </div>

        {/* Database Folder */}
        <div>
          <button onClick={() => toggle("database")} className="flex items-center gap-2 text-slate-200 hover:text-white font-bold">
            {openFolders.database ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            <Folder className="w-4 h-4 text-amber-400" /> Database Migration Schemas/
          </button>
          {openFolders.database && (
            <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06] text-slate-400">
              <div onClick={() => onPreview(artifacts[1])} className="flex items-center justify-between hover:text-indigo-300 cursor-pointer p-1 rounded hover:bg-white/[0.02]">
                <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-amber-400" /> Database.sql</span>
                <span className="text-[10px] text-slate-500">v1.2 • 28.6 KB</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
