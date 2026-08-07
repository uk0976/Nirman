"use client";

import { useState } from "react";
import { FileCode2, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";

interface ADRItem {
  adr_id: string;
  title: string;
  status: string;
  context: string;
  decision: string;
  consequences: string;
}

interface ADRListProps {
  adrs: ADRItem[];
}

export function ADRList({ adrs }: ADRListProps) {
  const [openId, setOpenId] = useState<string | null>("ADR-001");

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white uppercase text-xs">Architecture Decision Records (ADRs)</h3>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          {adrs.length} Records Accepted
        </span>
      </div>

      <div className="space-y-2.5">
        {adrs.map((adr) => {
          const isOpen = openId === adr.adr_id;
          return (
            <div key={adr.adr_id} className="p-4 rounded-xl bg-[#151824] border border-white/5 space-y-2">
              <button
                onClick={() => setOpenId(isOpen ? null : adr.adr_id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  {isOpen ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                  <span className="font-bold text-indigo-400">{adr.adr_id}:</span>
                  <span className="font-bold text-white text-xs">{adr.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  {adr.status}
                </span>
              </button>

              {isOpen && (
                <div className="pt-3 border-t border-white/5 space-y-2 text-xs font-sans text-gray-300">
                  <div>
                    <strong className="text-gray-200 font-mono text-[11px]">Context & Problem:</strong>
                    <p className="mt-0.5">{adr.context}</p>
                  </div>
                  <div>
                    <strong className="text-indigo-300 font-mono text-[11px]">Decision:</strong>
                    <p className="mt-0.5 font-semibold text-white">{adr.decision}</p>
                  </div>
                  <div>
                    <strong className="text-emerald-400 font-mono text-[11px]">Consequences & Benefits:</strong>
                    <p className="mt-0.5">{adr.consequences}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
