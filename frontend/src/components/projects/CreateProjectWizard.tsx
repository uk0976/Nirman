"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  FileCode2,
  Layers,
  Shield,
  Cpu,
  Loader2
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface CreateProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateProjectWizard: React.FC<CreateProjectWizardProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectType: "Web Application",
    requirements: "",
    frontendTech: "Next.js",
    backendTech: "FastAPI",
    databaseTech: "PostgreSQL",
    cloudTech: "Docker Container",
    enableWarRoom: true,
    enablePlanning: true,
    enableAutonomous: true,
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Post to real backend API endpoint
      const projRes = await apiClient.post("/projects/", {
        name: formData.name || "Untitled AI Project",
        description: formData.description || "Created via Nirman autonomous wizard",
        status: "Running",
      });

      const projId = projRes.data?.id || `proj-${Date.now()}`;
      
      // Trigger autonomous 9-stage pipeline engine
      await apiClient.post("/pipeline/start", {
        project_id: String(projId),
        prompt: formData.requirements || formData.description || "Build software application",
      });

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      onSuccess();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-[#08080c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative text-left"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                New Autonomous Project Wizard
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Header */}
          <div className="px-6 py-3 bg-black/40 border-b border-white/[0.04] flex items-center justify-between text-xs font-mono">
            {["General", "Requirements", "Tech Stack", "Preferences", "Review"].map((stTitle, i) => {
              const num = i + 1;
              const isActive = step === num;
              const isDone = step > num;
              return (
                <div key={stTitle} className="flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-white/10 text-slate-500"
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3" /> : num}
                  </span>
                  <span className={`hidden sm:inline ${isActive ? "text-white font-bold" : "text-slate-500"}`}>
                    {stTitle}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step Contents */}
          <div className="p-6 min-h-[300px] flex flex-col justify-between">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 1: General Details</h3>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Project Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Inventory Control API"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe what this software product will accomplish..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Project Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="Web Application">Web Application (Next.js / React)</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="Microservice API">Microservice API (FastAPI)</option>
                    <option value="AI Engine Platform">AI Engine Platform</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 2: Software Requirements</h3>
                <p className="text-xs text-slate-400">Paste your functional requirements or let Nirman AI analyze scope specs.</p>
                <textarea
                  rows={6}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="e.g. Build an inventory management service with user authentication, PostgreSQL database, and automated test suites..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 3: Preferred Technology Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Frontend</label>
                    <select
                      value={formData.frontendTech}
                      onChange={(e) => setFormData({ ...formData, frontendTech: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    >
                      <option value="Next.js">Next.js 16 (App Router)</option>
                      <option value="React Vite">React Vite</option>
                      <option value="Tailwind UI">Tailwind UI</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Backend</label>
                    <select
                      value={formData.backendTech}
                      onChange={(e) => setFormData({ ...formData, backendTech: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    >
                      <option value="FastAPI">FastAPI (Python)</option>
                      <option value="Node.js">Node.js Express</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Database</label>
                    <select
                      value={formData.databaseTech}
                      onChange={(e) => setFormData({ ...formData, databaseTech: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    >
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="SQLite">SQLite</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Cloud / Packaging</label>
                    <select
                      value={formData.cloudTech}
                      onChange={(e) => setFormData({ ...formData, cloudTech: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white"
                    >
                      <option value="Docker Container">Docker Container</option>
                      <option value="Vercel Deployment">Vercel Deployment</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 4: Execution Preferences</h3>
                <div className="space-y-3">
                  {[
                    { key: "enablePlanning", title: "Enable AI Autonomous Planning", desc: "Allows Product Manager Bob and CEO Alice to size scope automatically." },
                    { key: "enableWarRoom", title: "Enable AI War Room Gate Reviews", desc: "Spawns a debate session whenever design questions or security reviews arise." },
                    { key: "enableAutonomous", title: "Enable Code Generation", desc: "Allows Backend and Frontend agents to generate code artifacts." },
                  ].map((pref) => (
                    <label key={pref.key} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.06] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData as any)[pref.key]}
                        onChange={(e) => setFormData({ ...formData, [pref.key]: e.target.checked })}
                        className="w-4 h-4 rounded bg-black border-white/20 text-indigo-600 mt-0.5"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{pref.title}</span>
                        <span className="text-[11px] text-slate-400">{pref.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Step 5: Review &amp; Launch</h3>
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2 text-xs">
                  <div><strong>Name:</strong> {formData.name || "Untitled AI Project"}</div>
                  <div><strong>Type:</strong> {formData.projectType}</div>
                  <div><strong>Stack:</strong> {formData.frontendTech}, {formData.backendTech}, {formData.databaseTech}</div>
                  <div><strong>War Room Gate:</strong> {formData.enableWarRoom ? "Enabled" : "Disabled"}</div>
                </div>
              </div>
            )}

            {/* Stepper Footer Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08] mt-6">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
                  Launch Autonomous Project
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
