"use client";

import { useState } from "react";
import { X, Sparkles, Check, ArrowRight, ArrowLeft, FolderGit2, Layers, Cpu, Users } from "lucide-react";

interface CreateProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { id: "WEB_SAAS", title: "Enterprise Web SaaS", desc: "Next.js 15 App Router + FastAPI Backend", icon: "🌐" },
  { id: "AI_AGENT", title: "AI Agent Platform", desc: "LangGraph State Machine + LiteLLM + Vector Search", icon: "🤖" },
  { id: "MOBILE", title: "Cross-Platform Mobile App", desc: "React Native / Flutter + REST API", icon: "📱" },
  { id: "MICROSERVICE", title: "Backend Microservices API", desc: "FastAPI + Async SQLAlchemy + Redis", icon: "⚙️" }
];

export function CreateProjectWizard({ isOpen, onClose }: CreateProjectWizardProps) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("WEB_SAAS");
  const [frontendTech, setFrontendTech] = useState("Next.js 15, Tailwind CSS, TypeScript");
  const [backendTech, setBackendTech] = useState("FastAPI, Python, Async SQLAlchemy");
  const [databaseTech, setDatabaseTech] = useState("PostgreSQL, pgvector, Redis");
  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      onClose();
      window.location.href = "/projects/proj-1";
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[460px]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0D14]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Create New Software Project</h2>
              <p className="text-xs text-gray-400 font-mono">Step {step} of 4 · Prepare SDLC Engineering Pipeline</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* Step 1: Project Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">1. Project Identity & Purpose</h3>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Analytics Platform"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">Description & Vision</label>
                <textarea
                  rows={3}
                  placeholder="Describe what the software product does, key features, target users..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/60"
                />
              </div>
            </div>
          )}

          {/* Step 2: Project Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">2. Select Software Project Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProjectType(t.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      projectType === t.id
                        ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                        : "bg-[#151824] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <h4 className="font-bold text-xs text-white">{t.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Tech Stack Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">3. Architectural & Technology Preferences</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Frontend Technology</label>
                  <input
                    type="text"
                    value={frontendTech}
                    onChange={(e) => setFrontendTech(e.target.value)}
                    className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Backend Services</label>
                  <input
                    type="text"
                    value={backendTech}
                    onChange={(e) => setBackendTech(e.target.value)}
                    className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Database & Caching</label>
                  <input
                    type="text"
                    value={databaseTech}
                    onChange={(e) => setDatabaseTech(e.target.value)}
                    className="w-full bg-[#151824] border border-white/10 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: AI Agent Assignment */}
          {step === 4 && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">4. Assign AI Agent Roster</h3>
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
                <span className="text-indigo-300 font-bold">🤖 14 AI Employees Ready For Deployment</span>
                <p className="text-gray-400 font-sans text-xs">
                  CEO, Product Manager, Business Analyst, System Architect, Database Architect, Frontend, Backend, Security, QA, and DevOps agents assigned.
                </p>
              </div>

              {isDeploying && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs text-emerald-300 font-bold">Initializing SDLC Phase 1 (Product Discovery)...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-5 border-t border-white/10 bg-[#0B0D14] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs text-gray-400 hover:text-white transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
            disabled={isDeploying || (step === 1 && !projectName.trim())}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-glow transition flex items-center gap-2 disabled:opacity-50"
          >
            <span>{step === 4 ? "Create Project & Launch SDLC" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
