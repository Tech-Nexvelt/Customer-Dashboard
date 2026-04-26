"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2DD4A7]/20">
      
      {/* ─── HEADER ─── */}
      <nav className="glass-nav sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-slate-500 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
          </Link>
          <Link href="/">
            <img src="/NVlogo.png" alt="Nexvelt" className="h-10 w-auto grayscale brightness-0 opacity-50 cursor-pointer" />
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
            <Shield size={12} /> Legal Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Terms of <span className="text-[#2DD4A7]">Service.</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Effective Date: 20/04/2026</p>
        </div>

        <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
          
          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">1. Introduction</h2>
            <p>Welcome to Nexvelt. By using our platform and services, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">2. Services Provided</h2>
            <p className="mb-4">Nexvelt provides job application assistance services including:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Applying to job opportunities on behalf of users</li>
              <li>Resume optimization for ATS systems</li>
              <li>Cover letter generation</li>
              <li>Profile optimization (LinkedIn, GitHub, etc.)</li>
              <li>Interview preparation support</li>
            </ul>
            <p className="mt-4 italic font-bold text-[#0F172A]">Nexvelt does not guarantee job placement or employment outcomes.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">3. User Responsibilities</h2>
            <p className="mb-4">By using Nexvelt, you agree:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>To provide accurate and truthful information</li>
              <li>Not to use the service for fraudulent or misleading activities</li>
              <li>To review applications and materials when required</li>
            </ul>
            <p className="mt-4">You are solely responsible for the accuracy of the information submitted.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">4. Payments & Subscriptions</h2>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Some services are paid and billed on a recurring basis</li>
              <li>All payments are non-refundable unless otherwise stated</li>
              <li>Nexvelt reserves the right to change pricing with prior notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">5. No Guarantee of Results</h2>
            <p className="mb-4">While Nexvelt aims to improve your job search outcomes:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>We do not guarantee interviews, offers, or placements</li>
              <li>Results may vary based on market conditions, profile, and experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">6. Intellectual Property</h2>
            <p>All platform content, design, and materials belong to Nexvelt and may not be copied or reused without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">Nexvelt is not liable for:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Job application outcomes</li>
              <li>Employer decisions</li>
              <li>Any indirect or consequential losses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">8. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">9. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the service means you accept the updated terms.</p>
          </section>

          <section className="p-8 bg-[#2DD4A7]/5 border-2 border-[#2DD4A7]/10 rounded-[40px]">
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">10. Contact</h2>
            <p className="flex items-center gap-3 font-bold text-[#0F172A]">
               <Mail size={18} className="text-[#2DD4A7]" />
               nexvelt.hyd@gmail.com
            </p>
          </section>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">© 2026 NEXVELT TECHNOLOGIES. BUILT FOR SCALE.</p>
      </footer>

    </div>
  );
}
