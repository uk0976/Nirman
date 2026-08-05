import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { AgentShowcase } from "@/components/landing/AgentShowcase";
import { WorkflowVisualization } from "@/components/landing/WorkflowVisualization";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { WhyNirman } from "@/components/landing/WhyNirman";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col font-sans transition-colors duration-300">
      {/* Navbar Header */}
      <header className="border-b border-white/10 bg-[#0B0D14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 p-[1px] flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              NIRMAN <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI PLATFORM</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400 font-mono">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#sdlc" className="hover:text-white transition">20 SDLC Engine</a>
            <a href="#agents" className="hover:text-white transition">AI Employees</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="text-xs text-gray-300 hover:text-white font-medium transition px-2">
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-glow transition flex items-center gap-2"
            >
              <span>Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Trusted By */}
        <TrustedBySection />

        {/* Section 3: Problem Statement */}
        <ProblemSection />

        {/* Section 4: Solution Architecture */}
        <SolutionSection />

        {/* Section 5: AI Agent Showcase */}
        <div id="agents">
          <AgentShowcase />
        </div>

        {/* Section 6: Workflow Visualization */}
        <div id="sdlc">
          <WorkflowVisualization />
        </div>

        {/* Section 7: Features */}
        <div id="features">
          <FeatureGrid />
        </div>

        {/* Section 8: Why Choose Nirman */}
        <WhyNirman />

        {/* Section 9: Pricing */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* Section 10: FAQ */}
        <div id="faq">
          <FAQSection />
        </div>

        {/* Section 11: Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Section 12: Footer */}
      <Footer />
    </div>
  );
}
