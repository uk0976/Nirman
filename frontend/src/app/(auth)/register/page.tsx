"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterInput } from "@/lib/validation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, X } from "lucide-react";

export default function RegisterPage() {
  const { registerUser } = useAuth();
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Real-time password verification tracker
  const [passwordVal, setPasswordVal] = useState("");
  const [strengthChecks, setStrengthChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      newsletter: false
    },
  });

  const watchedPassword = watch("password");

  useEffect(() => {
    const pw = watchedPassword || "";
    setPasswordVal(pw);
    setStrengthChecks({
      length: pw.length >= 8,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      number: /\d/.test(pw),
      special: /[@$!%*?&]/.test(pw)
    });
  }, [watchedPassword]);

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    try {
      await registerUser(data.fullName, data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 1500);
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Registration failed. Please check your details.";
      setServerError(msg);
    }
  };

  const strengthCount = Object.values(strengthChecks).filter(Boolean).length;
  const strengthText = ["Weak", "Fair", "Medium", "Strong", "Excellent"][Math.max(0, strengthCount - 1)] || "Too Weak";
  const strengthColor = ["bg-rose-500", "bg-orange-500", "bg-yellow-500", "bg-indigo-500", "bg-emerald-500"][Math.max(0, strengthCount - 1)] || "bg-white/10";

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col items-center justify-center p-6 relative">
      
      {/* Background radial glows and grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] radial-glow opacity-[0.3] pointer-events-none" />

      {/* Branding Logo */}
      <div className="flex items-center gap-2 mb-8 relative z-10">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          निर्माण | Nirman
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <Card>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1 text-white">Create Account</h1>
            <p className="text-xs text-slate-400">Join the autonomous AI software enterprise platform</p>
          </div>

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
              Account created successfully! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              placeholder="Alex Dev"
              error={errors.fullName?.message}
              disabled={isSubmitting || success}
              {...register("fullName")}
            />

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="developer@nirman.ai"
              error={errors.email?.message}
              disabled={isSubmitting || success}
              {...register("email")}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              disabled={isSubmitting || success}
              {...register("password")}
            />

            {/* Password strength indicators */}
            {passwordVal.length > 0 && (
              <div className="space-y-2 text-left bg-white/[0.02] border border-white/[0.04] p-3 rounded-lg">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>Password strength: <strong className="text-slate-200">{strengthText}</strong></span>
                  <span>{strengthCount}/5 rules</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${strengthColor} transition-all duration-300`} style={{ width: `${(strengthCount / 5) * 100}%` }} />
                </div>
                
                {/* Requirements checklist */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1.5 border-t border-white/[0.04]">
                  {[
                    { label: "8+ characters", check: strengthChecks.length },
                    { label: "1 uppercase letter", check: strengthChecks.upper },
                    { label: "1 lowercase letter", check: strengthChecks.lower },
                    { label: "1 number digit", check: strengthChecks.number },
                    { label: "1 special symbol", check: strengthChecks.special }
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[9px]">
                      {rule.check ? (
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      ) : (
                        <X className="w-2.5 h-2.5 text-rose-500" />
                      )}
                      <span className={rule.check ? "text-slate-300" : "text-slate-500"}>{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              disabled={isSubmitting || success}
              {...register("confirmPassword")}
            />

            {/* Terms and Conditions Checkbox */}
            <div className="space-y-2 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-left select-none">
                <input
                  type="checkbox"
                  disabled={isSubmitting || success}
                  className="w-4 h-4 rounded bg-black/40 border-white/10 text-indigo-600 focus:ring-indigo-500/50 mt-0.5"
                  {...register("acceptTerms")}
                />
                <span className="text-[11px] text-slate-400 leading-normal">
                  I accept the{" "}
                  <a href="/terms" className="text-indigo-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-indigo-400 hover:underline">
                    Privacy Policy
                  </a>.
                </span>
              </label>
              {errors.acceptTerms && (
                <div className="text-[11px] text-rose-400 text-left">{errors.acceptTerms.message}</div>
              )}

              {/* Optional Newsletter */}
              <label className="flex items-center gap-2.5 cursor-pointer text-left select-none">
                <input
                  type="checkbox"
                  disabled={isSubmitting || success}
                  className="w-4 h-4 rounded bg-black/40 border-white/10 text-indigo-600 focus:ring-indigo-500/50"
                  {...register("newsletter")}
                />
                <span className="text-[11px] text-slate-400">
                  Send me product news and updates schedules.
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full mt-2" isLoading={isSubmitting || success}>
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Lead to sign in page */}
          <div className="text-center mt-6 text-xs text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign In
            </a>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}
