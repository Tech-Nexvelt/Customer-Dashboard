"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function PrivacyPage() {
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
            <Lock size={12} /> Data Protection
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Privacy <span className="text-[#2DD4A7]">Policy.</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Effective Date: 20/04/2026</p>
        </div>

        <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
          
          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">1. Information We Collect</h2>
            <p className="mb-4">We may collect:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Name, email, and contact details</li>
              <li>Resume and professional information</li>
              <li>Job preferences and application data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your data to:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Apply to jobs on your behalf</li>
              <li>Optimize resumes and profiles</li>
              <li>Improve our services</li>
              <li>Communicate with you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">3. Data Sharing</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Employers (through job applications)</li>
              <li>Third-party tools used for application processing</li>
            </ul>
            <p className="mt-4 italic font-bold text-[#0F172A]">We do not sell your personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">4. Data Security</h2>
            <p>We take reasonable steps to protect your data, but no system is completely secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">5. Your Rights</h2>
            <p className="mb-4">You can request:</p>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#2DD4A7]">
              <li>Access to your data</li>
              <li>Correction of incorrect data</li>
              <li>Deletion of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">6. Cookies</h2>
            <p>We may use cookies to improve user experience and track usage.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">7. Third-Party Services</h2>
            <p>Our platform may use third-party tools. We are not responsible for their privacy practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">8. Changes to Policy</h2>
            <p>We may update this Privacy Policy periodically.</p>
          </section>

          <section className="p-8 bg-[#2DD4A7]/5 border-2 border-[#2DD4A7]/10 rounded-[40px]">
            <h2 className="text-xl font-black text-[#0F172A] uppercase tracking-wider mb-4">9. Contact</h2>
            <p className="flex items-center gap-3 font-bold text-[#0F172A]">
               <Mail size={18} className="text-[#2DD4A7]" />
               nexvelt2013@gmail.com
            </p>
          </section>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">© 2026 NEXVELT TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}
