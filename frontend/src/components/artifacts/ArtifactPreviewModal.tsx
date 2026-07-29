"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtifactData } from "./ArtifactCard";
import { X, FileCode2, Copy, Check, Download, Share2 } from "lucide-react";

interface ArtifactPreviewModalProps {
  artifact: ArtifactData | null;
  onClose: () => void;
}

export const ArtifactPreviewModal: React.FC<ArtifactPreviewModalProps> = ({ artifact, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  {artifact.name}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {artifact.version}
                  </span>
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  {artifact.type} • Author: {artifact.author}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Code"}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6">
            <pre className="p-4 rounded-xl bg-[#040407] border border-white/10 text-xs font-mono text-indigo-300 overflow-x-auto max-h-[400px] leading-relaxed">
              {artifact.content}
            </pre>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Size: {artifact.size} • Updated: {artifact.updatedAt}</span>
            <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold">
              <Download className="w-3.5 h-3.5" /> Download File
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
