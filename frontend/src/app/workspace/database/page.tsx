"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { DDLViewer } from "@/components/database/DDLViewer";
import { ERDiagramVisualizer } from "@/components/database/ERDiagramVisualizer";
import { DataDictionaryTable } from "@/components/database/DataDictionaryTable";
import { Database, Layers, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function DatabaseStudioPage() {
  const [activeTab, setActiveTab] = useState("ddl");
  const [approved, setApproved] = useState(false);

  const dbData = {
    sql: `-- ========================================================\n-- NIRMAN AI PLATFORM — PRODUCTION 3NF POSTGRESQL 16 SCHEMA\n-- ========================================================\n\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";\nCREATE EXTENSION IF NOT EXISTS "pgvector";\n\n-- 1. IDENTITY & AUTHENTICATION DOMAIN\nCREATE TABLE users (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    email VARCHAR(255) UNIQUE NOT NULL,\n    hashed_password VARCHAR(255),\n    full_name VARCHAR(255) NOT NULL,\n    is_verified BOOLEAN DEFAULT FALSE,\n    onboarding_completed BOOLEAN DEFAULT FALSE,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE user_sessions (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    device_info VARCHAR(255),\n    ip_address VARCHAR(45),\n    refresh_token_hash VARCHAR(255) NOT NULL,\n    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 2. ORGANIZATIONS & MULTI-TENANCY DOMAIN\nCREATE TABLE organizations (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    name VARCHAR(255) NOT NULL,\n    slug VARCHAR(255) UNIQUE NOT NULL,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\n-- 3. PROJECTS DOMAIN\nCREATE TABLE projects (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,\n    name VARCHAR(255) NOT NULL,\n    slug VARCHAR(255) NOT NULL,\n    description TEXT,\n    sdlc_phase INT DEFAULT 1,\n    status VARCHAR(50) DEFAULT 'IN_PROGRESS',\n    health_score INT DEFAULT 100,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    UNIQUE(organization_id, slug)\n);\n\n-- 4. KNOWLEDGE BASE & PGVECTOR EMBEDDINGS\nCREATE TABLE document_chunks (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,\n    content TEXT NOT NULL,\n    embedding vector(1536),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE INDEX idx_chunks_embedding ON document_chunks USING hnsw (embedding vector_cosine_ops);`,
    dictionary: [
      { table: "users", columns_count: 8, primary_key: "id (UUID)", tenant_scoped: "No" },
      { table: "organizations", columns_count: 4, primary_key: "id (UUID)", tenant_scoped: "Tenant Root" },
      { table: "projects", columns_count: 9, primary_key: "id (UUID)", tenant_scoped: "Yes (organization_id)" },
      { table: "agent_executions", columns_count: 8, primary_key: "id (UUID)", tenant_scoped: "Yes (project_id)" },
      { table: "document_chunks", columns_count: 5, primary_key: "id (UUID)", tenant_scoped: "Yes (project_id)" }
    ]
  };

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopNavbar />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗄️</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Database Architect 3NF Schema Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  David Chen (Database Architect)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                PostgreSQL 16 3NF DDL Schema, Multi-Tenant Row-Level Security (RLS), Alembic Migrations, and pgvector HNSW Indexing.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "ddl", label: "3NF PostgreSQL DDL SQL", icon: Database },
              { id: "er", label: "ER Diagram Graph", icon: Layers },
              { id: "dictionary", label: "Data Dictionary", icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 border ${
                    activeTab === tab.id
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active View Render */}
          {activeTab === "ddl" && <DDLViewer sqlContent={dbData.sql} />}
          {activeTab === "er" && <ERDiagramVisualizer />}
          {activeTab === "dictionary" && <DataDictionaryTable dictionary={dbData.dictionary} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Database Architecture Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this 3NF database schema freezes Alembic migration versioning and hands off execution to UI/UX Designer Agent (Sophia Martinez).
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ 3NF Database Schema Approved & Frozen! Handoff sent to UI/UX Designer Sophia Martinez...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Schema & Handoff to UI/UX Designer</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
