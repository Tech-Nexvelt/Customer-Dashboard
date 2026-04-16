"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AuthInput, AuthButton } from "@/components/ui/AuthComponents";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
    }
    
    const errorMsg = searchParams.get("error");
    if (errorMsg) {
      setError(errorMsg);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      
      if (signInError) {
        console.error("Sign-in Error Detail:", signInError);
        throw signInError;
      }
      
      router.push("/dashboard/overview");
      router.refresh();
    } catch (err: any) {
      console.error("Login attempt failed:", err);
      if (err.message === "Invalid login credentials") {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else if (err.message?.includes("Email not confirmed")) {
        setError("Please verify your email address before logging in. Check your inbox for a confirmation link.");
      } else {
        setError(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 pt-20 selection:bg-[#2DD4A7]/10">
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <img src="/NV-logo-short.png" alt="Nexvelt Logo" className="w-14 h-14 mb-4 drop-shadow-sm cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter uppercase italic">Nexvelt</h1>
          <p className="text-slate-400 text-[13px] font-medium mt-1">Authenticate to continue</p>
        </div>

        <div className="bg-white rounded-[45px] shadow-2xl shadow-slate-200/50 p-10 md:p-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <AuthInput 
              label="Email Address"
              type="email"
              placeholder="EMAIL_ADDRESS"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Password</label>
                <Link href="#" className="text-[10px] font-bold text-[#2DD4A7] hover:text-[#25c99e] uppercase tracking-widest hover:underline transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Lock size={18} /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2DD4A7]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AuthButton type="submit" loading={loading} variant="teal">Log In</AuthButton>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center relative z-10">
            <p className="text-slate-400 text-[13px] font-medium">Don't have an account? <Link href="/onboarding" className="text-[#2DD4A7] hover:text-[#25c99e] font-bold hover:underline transition-colors">Request Access</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
