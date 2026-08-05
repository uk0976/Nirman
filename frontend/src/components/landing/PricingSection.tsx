"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const PLANS = [
    {
      name: "Starter SaaS Builder",
      desc: "Ideal for solo founders and small dev teams starting out.",
      monthlyPrice: "$49",
      annualPrice: "$39",
      features: [
        "Up to 3 Active Projects",
        "Full 20-Phase SDLC Pipeline Engine",
        "14 Specialized AI Agent Roles",
        "FastAPI & Next.js 15 Source Code Export",
        "Basic Support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro Software Team",
      desc: "For growing software startups & agencies needing continuous AI engineering.",
      monthlyPrice: "$149",
      annualPrice: "$119",
      features: [
        "Unlimited Active Projects",
        "Priority Multi-Agent Orchestration",
        "Custom Architecture & Tech Stack Presets",
        "Automated PyTest & Docker Compose Stack",
        "AI War Room Real-Time Collaboration Stream",
        "24/7 Priority Support"
      ],
      cta: "Start Pro Trial",
      highlighted: true
    },
    {
      name: "Enterprise Organization",
      desc: "For enterprise companies requiring dedicated infrastructure & SOC2 compliance.",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      features: [
        "Dedicated Private LLM & LiteLLM Proxies",
        "On-Premises / Private Cloud Deployment",
        "Custom Agent Skill Tuning & Governance",
        "SOC2 Type II & ISO 27001 Security Pack",
        "Dedicated Solutions Architect"
      ],
      cta: "Contact Enterprise Sales",
      highlighted: false
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Transparent Enterprise Pricing
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible Plans For Every Engineering Team
        </h2>
        <p className="text-gray-400 text-sm">
          No hidden fees. Upgrade or downgrade anytime as your project needs grow.
        </p>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs font-mono ${!isAnnual ? "text-white font-bold" : "text-gray-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-[#151824] border border-white/10 p-1 transition relative flex items-center"
          >
            <div
              className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs font-mono ${isAnnual ? "text-white font-bold" : "text-gray-400"}`}>
            Annual Billing <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, i) => (
          <div
            key={i}
            className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between space-y-6 relative transition-all ${
              plan.highlighted
                ? "border-indigo-500/60 shadow-glow bg-indigo-950/20"
                : "border-white/10 glass-panel-hover"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono bg-indigo-600 text-white font-bold uppercase tracking-wider shadow-glow">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
              <p className="text-xs text-gray-400">{plan.desc}</p>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice !== "Custom" && (
                  <span className="text-xs text-gray-400 font-mono">/ month</span>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-gray-300 font-mono">
                {plan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/register"
              className={`w-full text-center py-3 rounded-xl font-medium text-xs transition flex items-center justify-center gap-2 ${
                plan.highlighted
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow"
                  : "bg-[#151824] hover:bg-white/10 text-gray-200 border border-white/10"
              }`}
            >
              <span>{plan.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
