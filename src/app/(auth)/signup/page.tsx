"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2, Check } from "lucide-react";

type Plan = "Free" | "Pro" | "Premium";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const plans: { id: Plan; price: string; label: string }[] = [
  { id: "Free", price: "$0/mo", label: "Free" },
  { id: "Pro", price: "$149/mo", label: "Pro" },
  { id: "Premium", price: "$249/mo", label: "Premium" },
];

function getPasswordStrength(password: string): {
  label: "Weak" | "Fair" | "Strong" | "";
  color: string;
  width: string;
} {
  if (!password) return { label: "", color: "", width: "0%" };
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const score = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;
  if (score === 1) return { label: "Weak", color: "#EF4444", width: "33%" };
  if (score === 2) return { label: "Fair", color: "#F59E0B", width: "66%" };
  return { label: "Strong", color: "#2DD4A7", width: "100%" };
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>("Pro");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const strength = getPasswordStrength(password);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name || name.trim().length < 2)
      newErrors.name = "Full name must be at least 2 characters";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address";
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!password || !hasLength || !hasNumber || !hasSpecial)
      newErrors.password =
        "Password must be 8+ chars with a number and special character";
    if (!confirmPassword || confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreed) newErrors.terms = "You must agree to continue";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard/overview");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* ── LEFT BRAND PANEL ── */}
      <div className="hidden md:flex md:w-1/2 bg-[#111827] flex-col justify-between p-12 lg:p-20 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute bottom-[-10%] left-[-10%] w-2/3 h-2/3 bg-[#7C6FE0]/5 blur-[120px] rounded-full" />

        {/* Logo */}
        <div className="z-10">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-white flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-[#2DD4A7] flex items-center justify-center text-white font-black text-base">
              D
            </span>
            DevSphere
          </Link>
        </div>

        {/* Center content */}
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.2] mb-6">
            Start your job search journey today.
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-10 leading-relaxed">
            Join thousands of professionals who let DevSphere handle the grind.
          </p>

          <div className="space-y-4 mb-12">
            {[
              "Free plan — 20 applications/month, no credit card",
              "Setup in under 5 minutes",
              "Cancel or upgrade anytime",
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 size={20} className="text-[#2DD4A7] shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Pro plan preview card */}
        <div className="z-10 bg-[#1F2937]/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#7C6FE0] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Most popular
            </span>
            <span className="text-white font-extrabold text-lg">
              Pro — $149/mo
            </span>
          </div>
          <ul className="space-y-2.5 mb-4">
            {[
              "100+ applications per month",
              "ATS-optimized resumes for every role",
              "LinkedIn & profile optimization",
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[#D1D5DB] text-sm">
                <Check size={14} className="text-[#2DD4A7] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="#pricing"
            className="text-[#2DD4A7] text-sm font-bold hover:underline underline-offset-4"
          >
            See all plans →
          </Link>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 relative">
        {/* Mobile logo */}
        <div className="md:hidden mb-10">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#2DD4A7]">
            DevSphere
          </Link>
        </div>

        <div className="w-full max-w-[440px]">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#111827] mb-2">
              Create your account
            </h2>
            <p className="text-sm font-medium text-[#6B7280]">
              Free forever. Upgrade when you're ready.
            </p>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F9FAFB] transition-all text-sm font-bold text-[#374151] mb-7"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957273V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957273 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="relative mb-7 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">
              or sign up with email
            </span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3.5 bg-white border ${
                  errors.name ? "border-[#EF4444]" : "border-[#E5E7EB]"
                } rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF]`}
              />
              {errors.name && (
                <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 bg-white border ${
                  errors.email ? "border-[#EF4444]" : "border-[#E5E7EB]"
                } rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF]`}
              />
              {errors.email && (
                <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3.5 bg-white border ${
                    errors.password ? "border-[#EF4444]" : "border-[#E5E7EB]"
                  } rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF] pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={2.5} />
                  ) : (
                    <Eye size={18} strokeWidth={2.5} />
                  )}
                </button>
              </div>
              {/* Strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: strength.width,
                        background: strength.color,
                      }}
                    />
                  </div>
                  <p
                    className="text-[12px] font-bold mt-1 ml-0.5"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-2">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3.5 bg-white border ${
                    errors.confirmPassword
                      ? "border-[#EF4444]"
                      : confirmPassword && confirmPassword === password
                      ? "border-[#2DD4A7]"
                      : "border-[#E5E7EB]"
                  } rounded-xl text-sm font-medium outline-none transition-all focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 placeholder:text-[#9CA3AF] pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#111827] transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff size={18} strokeWidth={2.5} />
                  ) : (
                    <Eye size={18} strokeWidth={2.5} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Plan selector */}
            <div>
              <label className="block text-sm font-bold text-[#111827] mb-3">
                Choose your plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {plans.map((plan) => {
                  const selected = selectedPlan === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-[#2DD4A7] bg-[#F0FDF4]"
                          : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
                      }`}
                    >
                      {selected && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2DD4A7] rounded-full flex items-center justify-center shadow">
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                      )}
                      <p
                        className={`text-xs font-extrabold mb-0.5 ${
                          selected ? "text-[#2DD4A7]" : "text-[#111827]"
                        }`}
                      >
                        {plan.label}
                      </p>
                      <p className="text-[11px] font-bold text-[#6B7280]">
                        {plan.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      agreed
                        ? "bg-[#2DD4A7] border-[#2DD4A7]"
                        : errors.terms
                        ? "border-[#EF4444] bg-white"
                        : "border-[#D1D5DB] bg-white group-hover:border-[#2DD4A7]"
                    }`}
                  >
                    {agreed && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-sm text-[#6B7280] font-medium leading-relaxed">
                  I agree to the{" "}
                  <Link href="#" className="text-[#111827] font-bold hover:text-[#2DD4A7] transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#111827] font-bold hover:text-[#2DD4A7] transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-[12px] font-bold text-[#EF4444] mt-1.5 ml-8">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#2DD4A7] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-[#2DD4A7]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account →"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-[#6B7280]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#2DD4A7] font-bold hover:underline underline-offset-4"
            >
              Log in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
