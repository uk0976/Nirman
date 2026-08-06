"use client";

import { useState } from "react";
import { Sparkles, Check, ArrowRight, ArrowLeft, Bot, Building, Cpu, Layers, ShieldCheck } from "lucide-react";

const ROLES = [
  { id: "DEVELOPER", title: "Senior Developer / Architect", desc: "Building scalable production software products", icon: "💻" },
  { id: "FOUNDER", title: "Founder / Startup Leader", desc: "Transforming raw ideas into full SaaS applications", icon: "🚀" },
  { id: "ENTERPRISE", title: "Enterprise Engineering Team", desc: "Standardizing SDLC pipelines with 14 AI roles", icon: "🏢" },
  { id: "AGENCY", title: "Software Agency / Consultant", desc: "Delivering client software projects fast", icon: "⚡" },
  { id: "STUDENT", title: "Student / Researcher", desc: "Learning Clean Architecture & SDLC best practices", icon: "🎓" }
];

const AI_PROVIDERS = [
  { id: "GEMINI", name: "Google Gemini 1.5 Pro / Flash", desc: "Recommended — High throughput & long context window", badge: "Default" },
  { id: "OPENAI", name: "OpenAI GPT-4o / LiteLLM Proxy", desc: "Standard GPT-4o integration for code synthesis", badge: "Supported" },
  { id: "CLAUDE", name: "Anthropic Claude 3.5 Sonnet", desc: "Precision architectural analysis & code review", badge: "Supported" },
  { id: "OLLAMA", name: "Local Ollama / DeepSeek R1", desc: "On-premises private local model execution", badge: "Private" }
];

export default function OnboardingWizardPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("DEVELOPER");
  const [orgName, setOrgName] = useState("Acme Labs");
  const [selectedProvider, setSelectedProvider] = useState("GEMINI");
  const [experience, setExperience] = useState("ADVANCED");
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsProvisioning(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Nirman Workspace Onboarding (Step {step} of 4)
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Personalize Your AI Engineering Team
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Tailor the 14 AI agent roles to your workflow, experience level, and preferred stack.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                s <= step ? "bg-indigo-500 shadow-glow" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl min-h-[380px] flex flex-col justify-between">
          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                1. Select Your Primary Role
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      selectedRole === r.id
                        ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                        : "bg-[#151824] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <h3 className="font-bold text-xs text-white">{r.title}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: ORGANIZATION SETUP */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                2. Name Your Organization / Workspace
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Organization Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full bg-[#151824] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white"
                      placeholder="e.g. Acme Software Corp"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 font-mono space-y-1">
                  <span className="font-bold">✨ Organization Blueprint Created</span>
                  <p className="text-[11px] text-gray-400">
                    Nirman will set up standard RBAC permissions and repository structure under <span className="text-white font-bold">{orgName}</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERRED AI PROVIDER */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                3. Choose Preferred AI Provider Strategy
              </h2>
              <div className="space-y-2.5">
                {AI_PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProvider(p.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      selectedProvider === p.id
                        ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                        : "bg-[#151824] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs text-white">{p.name}</h3>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-indigo-300 border border-white/10">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{p.desc}</p>
                    </div>
                    {selectedProvider === p.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: EXPERIENCE & CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                4. Software Engineering Experience Level
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "BEGINNER", title: "Beginner", desc: "No-code & AI guidance" },
                  { id: "INTERMEDIATE", title: "Intermediate", desc: "Standard full-stack" },
                  { id: "ADVANCED", title: "Architect", desc: "Clean Architecture & 3NF" }
                ].map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setExperience(exp.id)}
                    className={`p-4 rounded-2xl border text-center transition ${
                      experience === exp.id
                        ? "bg-indigo-600/20 border-indigo-500 shadow-glow"
                        : "bg-[#151824] border-white/5 hover:border-white/20"
                    }`}
                  >
                    <h3 className="font-bold text-xs text-white">{exp.title}</h3>
                    <p className="text-[10px] text-gray-400 mt-1">{exp.desc}</p>
                  </button>
                ))}
              </div>

              {isProvisioning && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 font-mono">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs text-emerald-300 font-bold">Provisioning 14 AI Agent Roster & SDLC Engine...</p>
                </div>
              )}
            </div>
          )}

          {/* Actions Bar */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
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
              type="button"
              onClick={handleNext}
              disabled={isProvisioning}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-glow transition flex items-center gap-2 disabled:opacity-50"
            >
              <span>{step === 4 ? "Complete Setup & Launch" : "Next Step"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
