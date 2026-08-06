"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";

export default function VerifyEmailPendingPage() {
  const [countdown, setCountdown] = useState(45);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    setResent(true);
  };

  return (
    <AuthLayoutWrapper
      title="Verify Your Work Email"
      subtitle="We sent a verification link to your registered email address"
    >
      <div className="space-y-6 text-center py-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
          <Mail className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-bold text-white">Check Your Inbox</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Click the link inside the email to verify your address and unlock your multi-agent AI workspace.
          </p>
        </div>

        {resent && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verification email resent successfully!</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Link
            href="/verify-email/success"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-xl shadow-glow transition block flex items-center justify-center gap-2"
          >
            <span>Simulate Opening Email Link (Verify Email)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 pt-2">
            <span>Didn't receive email?</span>
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className="text-indigo-400 hover:text-indigo-300 font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{countdown > 0 ? `Resend in ${countdown}s` : "Resend Verification Email"}</span>
            </button>
          </div>
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}
