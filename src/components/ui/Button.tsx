import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  Icon?: LucideIcon;
  iconSide?: "left" | "right";
  loading?: boolean;
}

const VARIANTS = {
  primary: "bg-[#1A1A1A] text-white hover:bg-[#333] shadow-md",
  secondary: "bg-[#10B981] text-white hover:bg-[#009E78] shadow-md",
  outline: "bg-white border border-[#EBEBEB] text-[#1A1A1A] hover:bg-[#F9FAFB] shadow-sm",
  ghost: "bg-transparent text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]",
};

const SIZES = {
  sm: "px-4 py-2 text-xs rounded-xl",
  md: "px-6 py-2.5 text-sm rounded-2xl",
  lg: "px-8 py-3.5 text-base rounded-[24px]",
};

export default function Button({
  className = "",
  variant = "primary",
  size = "md",
  Icon,
  iconSide = "left",
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];
  
  return (
    <button
      className={`inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${v} ${s} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>
      ) : Icon && iconSide === "left" && (
        <Icon size={size === "sm" ? 14 : 18} className="mr-2" strokeWidth={2.2} />
      )}
      {children}
      {!loading && Icon && iconSide === "right" && (
        <Icon size={size === "sm" ? 14 : 18} className="ml-2" strokeWidth={2.2} />
      )}
    </button>
  );
}
