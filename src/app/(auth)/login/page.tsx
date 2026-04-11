"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2, ChevronLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    // Simulate auth logic
    setTimeout(() => {
      router.push("/dashboard/overview");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-inter">
      {/* Left Panel: Brand Panel (Desktop Only 50/50) */}
      <div className="hidden md:flex md:w-1/2 bg-[#111827] flex-col justify-between p-12 lg:p-20 relative overflow-hidden">
        {/* Subtle background glow decorator */}
        <div className="absolute top-[-10%] right-[-10%] w-2/3 h-2/3 bg-[#2DD4A7]/5 blur-[120px] rounded-full"></div>
        
        <div className="z-10">
          <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-[#2DD4A7] flex items-center justify-center text-white text-base">D</span>
            DevSphere
          </Link>
        </div>

        <div className="z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] mb-6">
            Your next offer letter is closer than you think.
          </h1>
          <p className="text-[#9CA3AF] text-lg mb-10 leading-relaxed">
            DevSphere has helped 500+ professionals land roles at top companies — without the job search grind.
          </p>

          <div className="space-y-4">
            {[
              "100+ applications filed per month",
              "ATS-optimized resumes for every role",
              "Dedicated advisor for Premium clients"
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 size={20} className="text-[#2DD4A7]" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="z-10 bg-[#1F2937]/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl max-w-sm">
          <p className="text-white italic mb-4 leading-relaxed tracking-wide font-medium">
             "Got placed in 38 days. Best decision ever."
          </p>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#7C6FE0] flex items-center justify-center text-white text-xs font-bold">SR</div>
             <div>
               <p className="text-white text-sm font-bold">Sneha R.</p>
               <p className="text-[#9CA3AF] text-xs">Product Manager</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel: White Background Panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        <Link 
          href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#111827] transition-all sm:hidden"
        >
          <ChevronLeft size={16} />
        </Link>

        {/* Mobile Logo Only */}
        <div className="md:hidden mb-10">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#2DD4A7]">
            DevSphere
          </Link>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#111827] mb-2">Welcome back</h2>
            <p className="text-sm font-medium text-[#6B7280]">Log in to your DevSphere dashboard</p>
          </div>

          {/* Google Auth Button */}
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-all text-sm font-bold text-[#374151] mb-8"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957273V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957273 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-8 flex items-center gap-4">
             <div className="flex-1 h-px bg-[#E5E7EB]"></div>
             <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">or continue with email</span>
             <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2.5">Email address</label>
              <input 
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 bg-white border ${errors.email ? "border-[#EF4444]" : "border-[#E5E7EB]"} rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF]`}
              />
              {errors.email && <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-sm font-bold text-[#111827]">Password</label>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3.5 bg-white border ${errors.password ? "border-[#EF4444]" : "border-[#E5E7EB]"} rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF] pr-12`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                </button>
              </div>
              {errors.password && <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">{errors.password}</p>}
              <div className="mt-3 text-right">
                <Link href="#" className="text-[13px] font-bold text-[#2DD4A7] hover:underline underline-offset-4">Forgot password?</Link>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#2DD4A7] text-white rounded-xl text-sm font-[600] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-[#2DD4A7]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-[#6B7280]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#2DD4A7] font-bold hover:underline underline-offset-4">Sign up →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
