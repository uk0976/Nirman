"use client";

import React, { useState } from "react";
import { FileCode2, Maximize2, ZoomIn, ZoomOut, Layers, Workflow, Database } from "lucide-react";

export const ArchitectureBoard: React.FC = () => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-6 text-left space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">War Room System Architecture Whiteboard</h3>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(Math.max(70, zoom - 10))} className="p-1 text-slate-400 hover:text-white rounded bg-white/[0.04]">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-slate-400">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(140, zoom + 10))} className="p-1 text-slate-400 hover:text-white rounded bg-white/[0.04]">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Diagram Render Canvas */}
      <div className="p-6 rounded-xl bg-[#050508] border border-white/10 overflow-auto flex items-center justify-center min-h-[260px]" style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}>
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-purple-600/20 border border-purple-500/30 text-white text-center">
            <span className="font-bold block">Client Portal</span>
            <span className="text-[10px] text-purple-300">Next.js App</span>
          </div>

          <span className="text-slate-500 font-bold">── WebSocket ──►</span>

          <div className="p-4 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-white text-center">
            <span className="font-bold block">FastAPI Routers</span>
            <span className="text-[10px] text-indigo-300">Layered Controllers</span>
          </div>

          <span className="text-slate-500 font-bold">── SQLAlchemy ──►</span>

          <div className="p-4 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-white text-center">
            <span className="font-bold block">PostgreSQL DB</span>
            <span className="text-[10px] text-cyan-300">Async Pool</span>
          </div>
        </div>
      </div>
    </div>
  );
};
