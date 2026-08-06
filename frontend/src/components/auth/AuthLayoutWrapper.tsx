import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, Bot } from "lucide-react";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayoutWrapper({ children, title, subtitle }: AuthLayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col lg:flex-row font-sans">
      {/* Left Column: Enterprise AI Branding & Graphic (Visible on LG screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0B0D14] border-r border-white/10 p-12 flex-col justify-between relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1px] shadow-glow">
            <div className="w-full h-full bg-[#0D0F17] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
            NIRMAN <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI PLATFORM</span>
          </span>
        </Link>

        {/* Center Graphic & Testimonial Quote */}
        <div className="z-10 space-y-8 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Autonomous SDLC 20-Phase State Machine
          </div>

          <blockquote className="text-2xl font-bold text-white tracking-tight leading-snug">
            "Nirman transformed how our engineering team builds software. We launched our SaaS 5x faster with complete PRDs and clean 3NF database schemas."
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 p-[1px] flex items-center justify-center font-bold text-sm text-white">
              UK
            </div>
            <div>
              <p className="font-bold text-sm text-white">Umer Khan</p>
              <p className="text-xs text-gray-400 font-mono">Lead Solutions Architect, CloudScale</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5 font-mono text-xs text-gray-300 pt-4 border-t border-white/10">
            {[
              "14 Specialized AI Agent Roles Operational",
              "SOC2 Type II Security & TLS 1.3 Encryption",
              "100% Deterministic Python & Next.js Code Output"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="z-10 flex items-center justify-between text-xs text-gray-500 font-mono pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted SaaS Security</span>
          </div>
          <span>© 2026 Nirman AI</span>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="flex items-center justify-between lg:justify-end gap-4 mb-6">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-sm text-white">NIRMAN</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md mx-auto space-y-6 my-auto">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs sm:text-sm text-gray-400">{subtitle}</p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            {children}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 font-mono">
          Protected by Nirman SaaS Shield · Terms & Privacy
        </div>
      </div>
    </div>
  );
}
