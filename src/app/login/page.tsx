"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { AlertCircle, CheckCircle2, Github, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { AuthInput, AuthButton } from "@/components/ui/AuthComponents";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryError = searchParams.get("error") || "";
  const queryMessage = searchParams.get("message") || "";

  const displayError = error || queryError;
  const displayMessage = message || queryMessage;

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
      toast.error("Login failed. Please check your credentials.");
      setLoading(false);
    } else {
      toast.success("Welcome back! Logging you in...");
      
      // Delay for 2 seconds to show success toast
      setTimeout(() => {
        router.push("/dashboard/overview");
      }, 2000);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    await signIn("google", { callbackUrl: "/dashboard/overview" });
  };

  const handleGithubLogin = async () => {
    setLoadingGithub(true);
    await signIn("github", { callbackUrl: "/dashboard/overview" });
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-[#2DD4A7]/10">
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-6 shrink-0">
          <Link href="/">
            <img src="/NV-logo-short.png" alt="Nexvelt Logo" className="w-12 h-12 mb-3 drop-shadow-sm cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter uppercase italic">Nexvelt</h1>
          <p className="text-slate-400 text-[12px] font-medium mt-0.5">Authenticate to continue</p>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col gap-6 relative z-10">
            {displayError && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
                <AlertCircle size={14} className="shrink-0" />
                <span>{displayError}</span>
              </div>
            )}

            {displayMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{displayMessage}</span>
              </div>
            )}

            <form onSubmit={handleManualLogin} className="flex flex-col gap-5">
              <AuthInput 
                label="Email Address"
                type="email"
                placeholder="EMAIL_ADDRESS"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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

            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">OR</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={handleGoogleLogin} 
                disabled={loadingGoogle || loadingGithub || loading}
                className="w-full py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loadingGoogle ? "Connecting..." : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <button 
                type="button"
                onClick={handleGithubLogin} 
                disabled={loadingGoogle || loadingGithub || loading}
                className="w-full py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 bg-[#24292F] text-white hover:bg-[#24292F]/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loadingGithub ? "Connecting..." : (
                  <>
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-50 text-center relative z-10">
            <p className="text-slate-400 text-[13px] font-medium">Don&apos;t have an account? <Link href="/signup" className="text-[#2DD4A7] hover:text-[#25c99e] font-bold hover:underline transition-colors">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[#F8FAFC]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
