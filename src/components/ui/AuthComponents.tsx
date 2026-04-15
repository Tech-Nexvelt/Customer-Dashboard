"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const AuthInput = ({ label, icon, error, ...props }: InputProps) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
      {label}
    </label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`w-full ${icon ? 'pl-11' : 'px-5'} pr-5 py-4 bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-slate-400`}
      />
    </div>
    {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'teal';
}

export const AuthButton = ({ children, loading, variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-[#0F172A] text-white hover:bg-black shadow-lg shadow-slate-100",
    teal: "bg-[#2DD4A7] text-[#0F172A] hover:bg-[#25c99e] shadow-lg shadow-[#2DD4A7]/10",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full py-4.5 rounded-2xl text-[12px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant as keyof typeof variants]}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : children}
    </button>
  );
};
