"use client";

import { useState } from "react";
import { Folder, FileCode, FileText, Database, ChevronRight, ChevronDown, Download, Eye } from "lucide-react";

interface FileNode {
  name: string;
  type: "folder" | "file";
  icon?: string;
  size?: string;
  children?: FileNode[];
  content?: string;
}

const FILES_TREE: FileNode[] = [
  {
    name: "01_specifications",
    type: "folder",
    children: [
      { name: "PRODUCT_REQUIREMENT_DOCUMENT.md", type: "file", size: "45 KB", content: "# PRD v1.0 — Nirman SaaS Core\n\n## Vision\nBuild autonomous AI software engineering company platform." },
      { name: "SOFTWARE_REQUIREMENT_SPECIFICATION.md", type: "file", size: "62 KB", content: "# SRS v1.0\n\n## Non-Functional Requirements\n- 99.9% Uptime\n- Latency < 100ms" }
    ]
  },
  {
    name: "02_architecture",
    type: "folder",
    children: [
      { name: "CLEAN_ARCHITECTURE_SPEC.md", type: "file", size: "110 KB", content: "# Clean Architecture Modular Monolith\n\n- API Layer\n- Domain Layer\n- Persistence Layer" },
      { name: "SYSTEM_SEQUENCE_DIAGRAM.puml", type: "file", size: "18 KB", content: "@startuml\nUser -> API: Request\nAPI -> Engine: Execute SDLC Phase\n@enduml" }
    ]
  },
  {
    name: "03_database",
    type: "folder",
    children: [
      { name: "SCHEMA_3NF_POSTGRES.sql", type: "file", size: "38 KB", content: "CREATE TABLE projects (\n  id UUID PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);" },
      { name: "ALEMBIC_INITIAL_MIGRATION.py", type: "file", size: "12 KB", content: "def upgrade():\n    op.create_table('projects')" }
    ]
  },
  {
    name: "04_source_code",
    type: "folder",
    children: [
      { name: "backend_fastapi_main.py", type: "file", size: "8 KB", content: "from fastapi import FastAPI\napp = FastAPI()" },
      { name: "docker-compose.yml", type: "file", size: "4 KB", content: "version: '3.8'\nservices:\n  backend:\n    build: ." }
    ]
  }
];

export function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({ "01_specifications": true, "02_architecture": true });
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(FILES_TREE[0].children![0]);

  const toggleFolder = (name: string) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
      {/* File Tree Bar */}
      <div className="space-y-3 border-r border-white/10 pr-4">
        <h3 className="font-bold text-white uppercase text-xs">Project Assets & Code Tree</h3>
        <div className="space-y-1">
          {FILES_TREE.map((folder) => {
            const isOpen = openFolders[folder.name];
            return (
              <div key={folder.name} className="space-y-1">
                <button
                  onClick={() => toggleFolder(folder.name)}
                  className="w-full flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition text-left"
                >
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
                  <Folder className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold">{folder.name}</span>
                </button>

                {isOpen && folder.children && (
                  <div className="pl-6 space-y-1">
                    {folder.children.map((file) => (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full flex items-center justify-between p-1.5 rounded-lg transition text-left ${
                          selectedFile?.name === file.name
                            ? "bg-indigo-600/20 text-white font-bold border border-indigo-500/30"
                            : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{file.size}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Code / Content Viewer */}
      <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
        {selectedFile ? (
          <>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-indigo-400 uppercase">ARTIFACT PREVIEW</span>
                <h4 className="font-bold text-white text-sm">{selectedFile.name}</h4>
              </div>
              <button className="flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-white/10 transition">
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#0D0F17] border border-white/5 text-gray-200 font-mono text-xs overflow-x-auto min-h-[220px]">
              <code>{selectedFile.content}</code>
            </pre>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            Select a file from the tree to preview artifact content.
          </div>
        )}
      </div>
    </div>
  );
}
