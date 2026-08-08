"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { STRIDEThreatTable } from "@/components/security-agent/STRIDEThreatTable";
import { AIToolSandboxingMatrix } from "@/components/security-agent/AIToolSandboxingMatrix";
import { SecretsEncryptionViewer } from "@/components/security-agent/SecretsEncryptionViewer";
import { ShieldAlert, Lock, Key, Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function SecurityStudioPage() {
  const [activeTab, setActiveTab] = useState("stride");
  const [approved, setApproved] = useState(false);

  const secData = {
    threats: [
      { category: "Spoofing", asset: "JWT Access Tokens", vulnerability: "Token Theft / Replay", mitigation: "15-minute token expiry + Refresh Token Rotation in HttpOnly cookies" },
      { category: "Tampering", asset: "PostgreSQL 3NF Data", vulnerability: "Cross-Tenant Data Tampering", mitigation: "PostgreSQL Row-Level Security (RLS) enforcement via tenant_id" },
      { category: "Repudiation", asset: "AI Agent Task Executions", vulnerability: "Unauthenticated Action Denial", mitigation: "Immutable Audit Log stream with SHA-256 hash chains" },
      { category: "Information Disclosure", asset: "LLM API Keys & Secrets", vulnerability: "Git Commit / Log Exfiltration", mitigation: "HashiCorp Vault secret injection + automated git secret scanning" },
      { category: "Denial of Service", asset: "FastAPI REST Endpoints", vulnerability: "API Resource Exhaustion", mitigation: "Slowapi Redis rate limiters (60 req/min auth, 20 req/min AI)" },
      { category: "Elevation of Privilege", asset: "AI Code Execution Engine", vulnerability: "Host Container Breakout", mitigation: "Isolated gVisor / Docker sandboxes with gUID/gPID limits" }
    ],
    sandboxing: [
      { agent: "CEO Agent (Evelyn Vance)", allowed_tools: ["strategic_planner", "scope_matrix_gen"], human_approval_required: false },
      { agent: "Database Architect Agent (David Chen)", allowed_tools: ["ddl_synthesizer", "schema_analyzer"], human_approval_required: true },
      { agent: "Backend Engineer Agent (Ethan Vance)", allowed_tools: ["fastapi_router_gen", "repository_builder"], human_approval_required: false },
      { agent: "DevOps Engineer Agent (Devon Vance)", allowed_tools: ["docker_build", "k8s_deploy", "shell_exec"], human_approval_required: true }
    ],
    dataProtection: {
      password_hashing: "Argon2id with 64MB memory cost, 3 iterations, 4 parallelism",
      field_encryption: "AES-256-GCM for sensitive LLM API keys and OAuth refresh tokens",
      transit_encryption: "TLS 1.3 with HSTS (HTTP Strict Transport Security) 1-year max-age"
    },
    owasp: {
      sast_scanner: "Bandit / Semgrep (0 High, 0 Critical findings)",
      dast_scanner: "OWASP ZAP (Clean scan pass on /api/v1 endpoints)",
      dependency_scanner: "Trivy / Dependabot (0 Vulnerable dependencies)"
    }
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
                <span className="text-2xl">🛡️</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">Security Architecture & Threat Audit Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Devon Vance (Principal Security Architect)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                STRIDE Threat Model, AI Agent Tool Sandboxing, AES-256-GCM Encryption, and OWASP Audit Compliance.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "stride", label: "STRIDE Threat Matrix", icon: ShieldAlert },
              { id: "sandboxing", label: "AI Tool Sandboxing Matrix", icon: Lock },
              { id: "secrets", label: "Secrets & Data Protection", icon: Key }
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
          {activeTab === "stride" && <STRIDEThreatTable threats={secData.threats} />}
          {activeTab === "sandboxing" && <AIToolSandboxingMatrix sandboxing={secData.sandboxing} />}
          {activeTab === "secrets" && <SecretsEncryptionViewer dataProtection={secData.dataProtection} owasp={secData.owasp} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Security Architecture Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this security architecture hands off execution to DevOps Engineer Agent (Devon Vance) for Docker Compose & Kubernetes production deployment.
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center">
                ✓ Security Architecture Approved! Handoff sent to DevOps Engineer Devon Vance...
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Security & Handoff to DevOps Engineer</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
