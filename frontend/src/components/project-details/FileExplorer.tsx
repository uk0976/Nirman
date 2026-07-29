"use client";

import React, { useState } from "react";
import { Folder, FileText, ChevronRight, ChevronDown, Search, Download, Upload } from "lucide-react";

export const FileExplorer: React.FC = () => {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    app: true,
    api: true,
    models: true,
  });

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Repository Source Tree Explorer</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-semibold text-slate-300 hover:bg-white/[0.08]">
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-xs space-y-2">
        {/* Root Folder: app */}
        <div>
          <button onClick={() => toggleFolder("app")} className="flex items-center gap-2 text-slate-200 hover:text-white font-bold">
            {openFolders.app ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            <Folder className="w-4 h-4 text-amber-400" /> app/
          </button>

          {openFolders.app && (
            <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06]">
              {/* Folder: api */}
              <div>
                <button onClick={() => toggleFolder("api")} className="flex items-center gap-2 text-slate-300 hover:text-white">
                  {openFolders.api ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                  <Folder className="w-3.5 h-3.5 text-amber-400" /> api/v1/
                </button>
                {openFolders.api && (
                  <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06] text-slate-400">
                    <div className="flex items-center gap-2 hover:text-indigo-300 cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> auth_router.py
                    </div>
                    <div className="flex items-center gap-2 hover:text-indigo-300 cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> inventory_router.py
                    </div>
                  </div>
                )}
              </div>

              {/* Folder: models */}
              <div>
                <button onClick={() => toggleFolder("models")} className="flex items-center gap-2 text-slate-300 hover:text-white">
                  {openFolders.models ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                  <Folder className="w-3.5 h-3.5 text-amber-400" /> models/
                </button>
                {openFolders.models && (
                  <div className="pl-6 space-y-1 mt-1 border-l border-white/[0.06] text-slate-400">
                    <div className="flex items-center gap-2 hover:text-indigo-300 cursor-pointer">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" /> item.py
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 cursor-pointer">
                <FileText className="w-3.5 h-3.5 text-indigo-400" /> main.py
              </div>
            </div>
          )}
        </div>

        {/* Root Level Files */}
        <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 cursor-pointer pt-1">
          <FileText className="w-3.5 h-3.5 text-indigo-400" /> Dockerfile
        </div>
        <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-300 cursor-pointer">
          <FileText className="w-3.5 h-3.5 text-indigo-400" /> requirements.txt
        </div>
      </div>
    </div>
  );
};
