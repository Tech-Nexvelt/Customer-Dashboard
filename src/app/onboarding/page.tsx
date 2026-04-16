"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, User, Mail, Phone, Globe, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    domain: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: insertError } = await supabase
        .from("onboarding_form")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone_number: formData.number,
            domain: formData.domain,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/signup"); // Redirect to signup after onboarding
      }, 3000);
    } catch (err: any) {
      console.error("Onboarding error:", err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8 p-12 bg-white rounded-[45px] shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="w-24 h-24 bg-[#2DD4A7]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle2 size={48} className="text-[#2DD4A7]" />
          </div>
          
          <h1 className="text-3xl font-black text-[#0F172A] uppercase italic leading-tight">Request Received!</h1>
          
          <div className="space-y-4">
            <p className="text-slate-500 font-medium leading-relaxed">
              Thank you, <span className="text-[#0F172A] font-bold">{formData.name.split(' ')[0]}</span>. Your onboarding application has been successfully submitted.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our team will review your details and <span className="text-[#2DD4A7] font-bold">hand over your login credentials</span> via email within 24 hours.
            </p>
          </div>

          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] hover:text-[#2DD4A7] transition-colors mt-8"
          >
            Return to Home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#2DD4A7]/20 flex flex-col items-center justify-center p-6 pt-20">
      <div className="w-full max-w-[540px]">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/">
            <img src="/NV-logo-short.png" alt="Nexvelt" className="w-16 h-16 mb-4 drop-shadow-sm hover:scale-110 transition-transform" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4A7]/10 text-[#2DD4A7] text-[9px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={12} /> Secure Onboarding
          </div>
          <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter uppercase italic leading-none">Get Started</h1>
          <p className="text-slate-400 text-[13px] font-medium mt-3">Step 1: Tell us a bit about yourself</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[45px] shadow-2xl shadow-slate-200/50 p-10 md:p-14 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0F172A]/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl flex items-center gap-3">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>{error}</span>
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><User size={18} /></div>
                <input
                  type="text"
                  name="name"
                  placeholder="JOHN DOE"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold uppercase placeholder:opacity-30 focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Mail size={18} /></div>
                <input
                  type="email"
                  name="email"
                  placeholder="NAME@WEBSITE.COM"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold uppercase placeholder:opacity-30 focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Grid for Number and Domain */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Contact Number</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Phone size={18} /></div>
                  <input
                    type="tel"
                    name="number"
                    placeholder="+1 (000) 000-0000"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold placeholder:opacity-30 focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Interest Domain</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Globe size={18} /></div>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="" disabled>SELECT DOMAIN</option>
                    <option value="software-engineering">Software Engineering</option>
                    <option value="data-science">Data Science</option>
                    <option value="product-management">Product Management</option>
                    <option value="design-marketing">Design & Marketing</option>
                    <option value="business-operations">Business Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#0F172A] hover:bg-[#2DD4A7] text-white hover:text-[#0F172A] py-6 px-8 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 group relative overflow-hidden active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Submit Application <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-[10px] font-medium text-slate-400 mt-4 leading-relaxed">
              By submitting, you agree to our <Link href="/terms" className="text-[#0F172A] font-bold underline hover:text-[#2DD4A7]">Terms</Link> and <Link href="/privacy" className="text-[#0F172A] font-bold underline hover:text-[#2DD4A7]">Data Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
