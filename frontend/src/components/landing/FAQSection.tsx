"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How does Nirman differ from single AI chatbots like Cursor or Copilot?",
    a: "Unlike single-file code completion tools, Nirman operates as a full multi-agent software company. It executes all 20 SDLC phases — generating structured PRDs, SRS specs, 3NF PostgreSQL schemas, Clean Architecture specs, FastAPI services, Next.js components, and PyTest suites deterministically."
  },
  {
    q: "Can I inspect and export the full source code?",
    a: "Yes! Nirman produces clean, modular Python and Next.js TypeScript code without obfuscation or proprietary lock-in. You can download or export your full codebase at any time."
  },
  {
    q: "Is my corporate data and code intellectual property secure?",
    a: "Absolutely. Nirman enforces strict TLS 1.3 encryption, JWT RBAC security, zero data retention for model training, and supports private on-premises / LiteLLM proxy deployments for enterprise SOC2 compliance."
  },
  {
    q: "What tech stack frameworks does Nirman default to?",
    a: "Nirman's architecture defaults to production-grade Next.js 15 App Router (React 19, TypeScript, Tailwind CSS) for Frontend, and FastAPI (Python, Async SQLAlchemy, Pydantic v2) for Backend, with PostgreSQL, pgvector, Redis, and Docker Compose."
  },
  {
    q: "Can I bring my own LLM API keys (Gemini, OpenAI, Claude)?",
    a: "Yes, you can configure your own Google Gemini, OpenAI, Anthropic Claude, or local Ollama API keys inside the Nirman Platform Settings."
  }
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 border-t border-white/10 bg-[#0B0D14]/80">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-indigo-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs text-gray-400 leading-relaxed font-sans border-t border-white/5 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
