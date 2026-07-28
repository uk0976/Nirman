"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, LoginInput } from "@/lib/validation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cpu, Shield, Users, ArrowRight } from "lucide-react";

function LoginContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const sessionExpired = searchParams.get("session_expired") === "true";

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push(from);
      }, 1000);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Invalid email or password credentials.";
      setServerError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col lg:flex-row relative">
      
      {/* Background radial glows and grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] radial-glow opacity-[0.4] pointer-events-none" />

      {/* Left Column: Branding / Info Grid */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 bg-black/40 border-r border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
        
        {/* Branding Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            निर्माण | Nirman
          </span>
        </div>

        {/* Dynamic product features summary */}
        <div className="my-auto max-w-md space-y-8 relative z-10 text-left">
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
            Autonomous Software <br />
            Development Engine.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Nirman coordinates specialized AI agents (from Product Managers to DevOps) to build production-grade applications automatically.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">12 Specialized AI Agents</h4>
                <p className="text-xs text-slate-500 mt-0.5">CEO, Architect, Frontend/Backend Engineers, Security, QA and DevOps working in sync.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">AI War Room Consensus</h4>
                <p className="text-xs text-slate-500 mt-0.5">Design specifications and security audits undergo consensus debate before deployment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Gated Verification Sprints</h4>
                <p className="text-xs text-slate-500 mt-0.5">Automated test runs and vulnerability checkpoints guard your branch releases.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-600 relative z-10">
          &copy; {new Date().getFullYear()} निर्माण | Nirman. Powered by autonomous agentic frameworks.
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-16">
        
        {/* Mobile branding header */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            निर्माण | Nirman
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-1 text-white">Welcome Back</h1>
              <p className="text-xs text-slate-400">Sign in to orchestrate your AI development sprints</p>
            </div>

            {sessionExpired && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-lg text-left">
                Your session has expired. Please authenticate again.
              </div>
            )}

            {serverError && (
              <motion.div
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg text-left"
              >
                {serverError}
              </motion.div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg text-left">
                Login successful! Launching workspace environment...
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="developer@nirman.ai"
                error={errors.email?.message}
                disabled={isSubmitting || success}
                {...register("email")}
              />

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-slate-400">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Input
                  label=""
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  disabled={isSubmitting || success}
                  {...register("password")}
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    disabled={isSubmitting || success}
                    className="w-4 h-4 rounded bg-black/40 border-white/10 text-indigo-600 focus:ring-indigo-500/50"
                    {...register("rememberMe")}
                  />
                  <span className="text-xs text-slate-400">Remember Me</span>
                </label>
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={isSubmitting || success}>
                Sign In <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-[1px] bg-white/[0.06] flex-1" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">or continue with</span>
              <div className="h-[1px] bg-white/[0.06] flex-1" />
            </div>

            {/* Social Oauth Buttons (UI Mockup) */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 border border-white/10 hover:border-white/20 bg-white/5 rounded-lg text-xs font-semibold transition-all text-slate-300"
              >
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 border border-white/10 hover:border-white/20 bg-white/5 rounded-lg text-xs font-semibold transition-all text-slate-300"
              >
                GitHub
              </button>
            </div>

            {/* Sign up lead link */}
            <div className="text-center mt-6 text-xs text-slate-500">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Create an Account
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#030303] text-slate-100 flex items-center justify-center font-mono text-xs">
        Loading login panel...
      </div>
    }>
      <LoginContent />
    </React.Suspense>
  );
}
