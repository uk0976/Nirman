import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "stitch";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, isLoading, variant = "primary", size = "md", disabled, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#040406] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";
    
    const variants = {
      primary: "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30",
      stitch: "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-90 text-white shadow-xl shadow-cyan-500/20 border border-cyan-300/30",
      secondary: "bg-purple-600/80 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 border border-purple-400/30",
      outline: "border border-white/10 hover:border-white/20 text-slate-200 bg-white/[0.04] hover:bg-white/[0.08]",
      ghost: "text-slate-400 hover:text-white hover:bg-white/[0.06]",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs font-medium",
      md: "px-5 py-2.5 text-xs font-semibold tracking-wide",
      lg: "px-8 py-3.5 text-sm font-bold tracking-wide",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
