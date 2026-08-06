"use client";

import { useState } from "react";
import { X, ShieldCheck, Check, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";

interface HumanApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HumanApprovalModal({ isOpen, onClose }: HumanApprovalModalProps) {
  const [feedback, setFeedback] = useState("");
  const [approved, setApproved] = useState(false);

  if (!isOpen) return null;

  const handleApprove = () => {
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
        {/* Header */}
        <div className="p-5 bg-amber-950/30 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm">Human Approval Required — Phase 8 (Database 3NF)</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 space-y-2 font-mono">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-indigo-400">AUTHOR: David Chen (DB Architect)</span>
              <span className="text-gray-500">PostgreSQL 3NF Schema</span>
            </div>
            <p className="text-gray-200 text-xs">
              Synthesized PostgreSQL 16 schema with 3NF normalization, foreign key constraints, indexes, and Alembic migration scripts.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-gray-300 mb-1.5">Optional Feedback or Request Changes</label>
            <textarea
              rows={3}
              placeholder="e.g. Add indexes to project_id foreign key column..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-[#151824] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
            />
          </div>

          {approved && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-mono font-bold">
              ✓ Artifact Approved! Resuming SDLC Pipeline execution...
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-5 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#151824] hover:bg-white/10 border border-white/10 text-gray-300 font-medium"
          >
            Request Changes
          </button>

          <button
            onClick={handleApprove}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Approve & Continue Pipeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
