"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { DockerComposeViewer } from "@/components/devops/DockerComposeViewer";
import { TerraformBlueprintViewer } from "@/components/devops/TerraformBlueprintViewer";
import { ObservabilityDashboard } from "@/components/devops/ObservabilityDashboard";
import { Terminal, Cloud, Activity, Check, ArrowRight, ShieldCheck, Rocket } from "lucide-react";

export default function DevOpsStudioPage() {
  const [activeTab, setActiveTab] = useState("compose");
  const [approved, setApproved] = useState(false);

  const devopsData = {
    compose_yaml: `# ========================================================\n# NIRMAN AI PLATFORM — PRODUCTION DOCKER COMPOSE STACK\n# ========================================================\nversion: '3.8'\n\nservices:\n  frontend:\n    build:\n      context: ./frontend\n      dockerfile: Dockerfile\n    ports:\n      - "3000:3000"\n    environment:\n      - NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1\n    depends_on:\n      - backend\n\n  backend:\n    build:\n      context: ./backend\n      dockerfile: Dockerfile\n    ports:\n      - "8000:8000"\n    environment:\n      - DATABASE_URL=postgresql+asyncpg://nirman_user:secret_pass@postgres:5432/nirman_db\n      - REDIS_URL=redis://redis:6379/0\n    depends_on:\n      - postgres\n      - redis\n\n  postgres:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: nirman_db\n      POSTGRES_USER: nirman_user\n      POSTGRES_PASSWORD: secret_pass\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    ports:\n      - "5432:5432"\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n\n  prometheus:\n    image: prom/prometheus:latest\n    volumes:\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n    ports:\n      - "9090:9090"\n\nvolumes:\n  postgres_data:`,
    blueprint: {
      cloud_provider: "AWS (Amazon Web Services)",
      compute_service: "AWS ECS Fargate (Serverless Container Orchestration)",
      database_service: "AWS RDS PostgreSQL 16 (Multi-AZ Deployment with Read Replicas)",
      cache_service: "AWS ElastiCache Redis 7",
      object_storage: "AWS S3 Private Buckets with KMS Server-Side Encryption"
    },
    metrics: [
      { metric: "HTTP Request Latency", tool: "Prometheus / Grafana", threshold: "P99 < 150ms", alert_channel: "Slack #alerts-prod" },
      { metric: "HTTP 5xx Error Rate", tool: "Prometheus Alertmanager", threshold: "> 1.0% in 5 mins", alert_channel: "PagerDuty Critical" },
      { metric: "PostgreSQL Connections", tool: "pg_stat_activity / Grafana", threshold: "> 85% Pool Usage", alert_channel: "Slack #alerts-db" },
      { metric: "AI Agent Token Spending", tool: "Nirman Observability Engine", threshold: "> $500/hour", alert_channel: "Email Executive Admin" }
    ],
    dr: {
      rpo: "5 minutes (Continuous PostgreSQL WAL Archiving to S3)",
      rto: "15 minutes (Automated Terraform failover script)",
      backup_retention: "30 days Daily Backups + 12 months Monthly Snapshots",
      rollback_procedure: "Zero-downtime rolling rollback to previous Docker image tag via ECS Deployment Controller"
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
                <span className="text-2xl">🚀</span>
                <h1 className="text-2xl font-bold text-white tracking-tight">DevOps & Cloud Production Infrastructure Studio</h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Marcus Vance (Principal DevOps Engineer)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Docker Compose Production Stack, Terraform IaC Cloud Blueprints, Prometheus Telemetry, and Disaster Recovery Runbooks.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2 font-mono text-xs">
            {[
              { id: "compose", label: "Docker Compose Stack", icon: Terminal },
              { id: "blueprint", label: "Terraform IaC Blueprint", icon: Cloud },
              { id: "observability", label: "Prometheus Observability & DR", icon: Activity }
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
          {activeTab === "compose" && <DockerComposeViewer yamlContent={devopsData.compose_yaml} />}
          {activeTab === "blueprint" && <TerraformBlueprintViewer blueprint={devopsData.blueprint} />}
          {activeTab === "observability" && <ObservabilityDashboard metrics={devopsData.metrics} dr={devopsData.dr} />}

          {/* Human Approval Action Bar */}
          <div className="p-5 border-t border-white/10 bg-[#0B0D14] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-white">Production Deployment Approval Gate</span>
              <p className="text-[11px] text-gray-400 font-sans">
                Approving this DevOps infrastructure finalizes all 14 multi-agent SDLC engineering phases and releases Nirman to production!
              </p>
            </div>

            {approved ? (
              <div className="px-6 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-center flex items-center gap-2">
                <Rocket className="w-4 h-4 text-emerald-400" />
                <span>✓ Production Infrastructure Approved & Deployed! All SDLC Engineering Phases Complete!</span>
              </div>
            ) : (
              <button
                onClick={() => setApproved(true)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-glow transition flex items-center justify-center gap-2 shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Approve Infrastructure & Deploy to Production</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
