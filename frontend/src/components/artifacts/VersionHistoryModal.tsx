"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtifactData } from "./ArtifactCard";
import { X, History, GitCompare, Check, Download } from "lucide-react";

interface VersionHistoryModalProps {
  artifact: ArtifactData | null;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ artifact, onClose }) => {
  const [showDiff, setShowDiff] = useState(false);

  if (!artifact) return null;

  const versions = [
    { version: "v2.1", author: "Charlie (Architect)", time: "10m ago", changes: "Added multi-tier layered router specifications." },
    { version: "v2.0", author: "Charlie (Architect)", time: "1 hour ago", changes: "Initial architecture design draft." },
    { version: "v1.0", author: "Bob (PM)", time: "3 hours ago", changes: "PRD scope sizing baseline." },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Version History: {artifact.name}
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06]">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Version List Timeline */}
            <div className="space-y-3">
              {versions.map((v, i) => (
                <div key={v.version} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-indigo-300 font-mono">{v.version}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{v.time} • By {v.author}</span>
                    </div>
                    <p className="text-slate-300">{v.changes}</p>
                  </div>
                  <button
                    onClick={() => setShowDiff(!showDiff)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] text-[11px] font-mono text-slate-300 hover:text-white border border-white/[0.06]"
                  >
                    <GitCompare className="w-3.5 h-3.5 text-indigo-400" /> Diff
                  </button>
                </div>
              ))}
            </div>

            {/* Diff View Box */}
            {showDiff && (
              <div className="p-4 rounded-xl bg-[#040407] border border-white/10 text-xs font-mono space-y-1">
                <div className="text-[10px] text-slate-500 pb-2 border-b border-white/[0.06]">
                  Comparing v2.1 (Current) with v2.0
                </div>
                <div className="text-emerald-400">+ Added: /app/api/v1/auth_router.py multi-file layout</div>
                <div className="text-rose-400">- Removed: single file main.py router declaration</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
