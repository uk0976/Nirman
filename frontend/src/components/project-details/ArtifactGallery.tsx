"use client";

import React, { useState } from "react";
import { FileCode2, Download, Eye, FileText, Database, Code2, ShieldCheck, Terminal, History, X } from "lucide-react";

export const ArtifactGallery: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);

  const artifacts = [
    { name: "Architecture.md", type: "Markdown Spec", author: "Charlie (Architect)", time: "10m ago", size: "14.2 KB", icon: FileText, content: "# Architecture Blueprint\n\n- Backend: FastAPI\n- Database: PostgreSQL\n- Cache: Redis\n- Auth: JWT Bearer Tokens" },
    { name: "Database.sql", type: "PostgreSQL DDL", author: "George (Database)", time: "15m ago", size: "28.6 KB", icon: Database, content: "CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  hashed_password VARCHAR(255) NOT NULL\n);" },
    { name: "OpenAPI.yaml", type: "Swagger Spec", author: "Fiona (Backend)", time: "25m ago", size: "42.1 KB", icon: Code2, content: "openapi: 3.0.0\ninfo:\n  title: Inventory Control API\n  version: 1.0.0" },
    { name: "Dockerfile", type: "Container Config", author: "Kate (DevOps)", time: "45m ago", size: "4.8 KB", icon: Terminal, content: "FROM python:3.11-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD [\"uvicorn\", \"app.main:app\", \"--host\", \"0.0.0.0\"]" },
  ];

  return (
    <div className="glass-panel p-6 border border-white/[0.08] mb-8 text-left space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Generated System Artifacts</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">4 Core Artifacts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {artifacts.map((art) => {
          const Icon = art.icon;
          return (
            <div
              key={art.name}
              className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white truncate">{art.name}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">By <strong className="text-slate-200">{art.author}</strong></p>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{art.size}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedArtifact(art)}
                    className="p-1 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded"
                    title="Preview Artifact"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded" title="Download">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Artifact Preview Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-2xl p-6 text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-indigo-400" />
                {selectedArtifact.name}
              </h3>
              <button onClick={() => setSelectedArtifact(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-indigo-300 overflow-x-auto max-h-80">
              {selectedArtifact.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
