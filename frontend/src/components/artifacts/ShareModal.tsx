"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArtifactData } from "./ArtifactCard";
import { X, Share2, Copy, Check, Lock, Globe } from "lucide-react";

interface ShareModalProps {
  artifact: ArtifactData | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ artifact, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const shareUrl = `https://nirman.ai/share/artifacts/${artifact.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
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
          className="w-full max-w-md bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl p-6 text-left space-y-4 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Share Artifact Access</h3>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-200 block">{artifact.name}</span>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/10">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent text-xs text-indigo-300 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
