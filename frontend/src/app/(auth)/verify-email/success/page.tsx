import Link from "next/link";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function VerifyEmailSuccessPage() {
  return (
    <AuthLayoutWrapper
      title="Email Verified Successfully!"
      subtitle="Your work email has been verified and your account is active"
    >
      <div className="space-y-6 text-center py-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Welcome to Nirman AI</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Next, complete a quick 60-second onboarding wizard to personalize your AI software engineering team.
          </p>
        </div>

        <Link
          href="/onboarding"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3.5 rounded-xl shadow-glow transition flex items-center justify-center gap-2"
        >
          <span>Continue to Personalization Wizard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </AuthLayoutWrapper>
  );
}
