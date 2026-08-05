import { ShieldCheck, CheckCircle2, Lock, Cpu, Server, Zap } from "lucide-react";

export function WhyNirman() {
  const DIFFERENTIATORS = [
    {
      title: "Not Another Chatbot",
      desc: "Nirman doesn't output random code snippets. It operates as an entire software organization executing 20 SDLC phases deterministically.",
      icon: Cpu
    },
    {
      title: "Enterprise SOC2 & TLS 1.3",
      desc: "Your intellectual property is protected with end-to-end encryption, strict JWT role-based access control, and zero data training retention.",
      icon: ShieldCheck
    },
    {
      title: "Clean Architecture Guarantee",
      desc: "Produces maintainable, modular Python FastAPI and Next.js 15 code that follows SOLID principles and 3NF database design.",
      icon: Server
    },
    {
      title: "Human-in-the-Loop Oversight",
      desc: "Review and approve PRDs, system architecture diagrams, and DB schemas at any phase before code execution proceeds.",
      icon: Lock
    }
  ];

  return (
    <section className="py-24 border-t border-white/10 bg-[#0B0D14]/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            Why Enterprise Teams Choose Nirman
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built For Production Engineering Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-white/10 glass-panel-hover space-y-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 w-fit">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{diff.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{diff.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
