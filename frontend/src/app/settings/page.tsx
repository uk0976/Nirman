"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Sliders, Key, User, Shield, Cpu, Save } from "lucide-react";

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("••••••••••••••••••••••••••••");
  const [openaiKey, setOpenaiKey] = useState("••••••••••••••••••••••••••••");

  return (
    <div className="flex h-screen bg-[#07090E] text-gray-100 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          <div className="border-b border-white/10 pb-5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Platform & AI Provider Settings</h1>
            <p className="text-xs text-gray-400 mt-1">Configure LLM providers, API credentials, and organization security.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>AI Provider API Keys</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">Google Gemini API Key</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="w-full bg-[#151824] border border-white/10 rounded-lg px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">OpenAI / LiteLLM Proxy API Key</label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full bg-[#151824] border border-white/10 rounded-lg px-4 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-glow transition flex items-center gap-2">
                <Save className="w-3.5 h-3.5" />
                <span>Save API Configurations</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
