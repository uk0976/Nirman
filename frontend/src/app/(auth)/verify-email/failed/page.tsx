import Link from "next/link";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function VerifyEmailFailedPage() {
  return (
    <AuthLayoutWrapper
      title="Verification Link Expired"
      subtitle="The email verification link is invalid or has expired"
    >
      <div className="space-y-6 text-center py-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Verification Link Expired</h3>
          <p className="text-xs text-gray-400 leading-relaxed font-mono">
            Verification links expire after 24 hours for security. Click below to request a new link.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/verify-email"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3.5 rounded-xl shadow-glow transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Request New Verification Email</span>
          </Link>

          <Link
            href="/login"
            className="text-xs text-gray-400 hover:text-white transition flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}
