"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock, ShieldCheck, Award } from "lucide-react";

interface ConsensusCardProps {
  proposalTitle: string;
  consensusPercentage: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  ceoApproved: boolean;
}

export const ConsensusCard: React.FC<ConsensusCardProps> = ({
  proposalTitle,
  consensusPercentage,
  approvedCount,
  rejectedCount,
  pendingCount,
  ceoApproved,
}) => {
  return (
    <div className="glass-panel p-5 border border-white/[0.08] text-left mb-6 relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">War Room Active Consensus Vote</h3>
        </div>
        {ceoApproved && (
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> CEO Approved
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Active Proposal</span>
          <h4 className="text-sm font-bold text-white mb-3">{proposalTitle}</h4>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> {approvedCount} Approve
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> {rejectedCount} Reject
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Clock className="w-3.5 h-3.5" /> {pendingCount} Pending
            </span>
          </div>
        </div>

        {/* Progress Ring / Percentage */}
        <div className="flex items-center gap-4 shrink-0 bg-black/40 border border-white/[0.06] p-4 rounded-2xl">
          <div className="text-center">
            <span className="text-2xl font-extrabold text-emerald-400 block tracking-tight">
              {consensusPercentage}%
            </span>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Consensus Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
