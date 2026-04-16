"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Zap, Globe, Target, BarChart3, Users, Mail, ArrowRight, UserCheck } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function LandingPage() {
  const [leadEmail, setLeadEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('leads').insert([{ email: leadEmail }]);
      if (error) throw error;
      setIsSuccess(true);
      setLeadEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error("Error capturing lead:", err);
      alert("Failed to join. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#2DD4A7]/20 selection:text-[#0F172A] overflow-x-hidden">
      
      {/* ─── NAVIGATION ─── */}
      <nav className="glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer lg:scale-100 scale-90">
            <img 
               src="/NVlogo.png" 
               alt="Nexvelt Logo" 
               className="h-16 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {["Services", "About", "Pricing"].map(item => (
              <Link key={item} href={`/#${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A]/50 hover:text-[#2DD4A7] transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A] hover:text-[#2DD4A7] transition-colors">
              Log In
            </Link>
            <Link 
              href="/onboarding" 
              className="pill-button bg-[#0F172A] text-white hover:bg-[#2DD4A7] hover:text-[#0F172A] text-[11px] uppercase tracking-[0.2em] flex items-center gap-2"
            >
              Get Started <ChevronRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── HERO SECTION ─── */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          {/* Abstract light decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2DD4A7]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#2DD4A7]/10 text-[#2DD4A7] text-[10px] font-black uppercase tracking-widest mb-8 border border-[#2DD4A7]/20">
                <img src="/NV-logo-short.png" alt="NV" className="w-4 h-4" />
                Next-Gen Automation Active
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#0F172A] leading-[0.9] tracking-[-0.04em] mb-10 uppercase">
                Automate Your <br />
                <span className="text-[#2DD4A7]">Internal Funnel.</span>
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-500 font-medium mb-12 leading-relaxed">
                Join 500+ professionals using Nexvelt to automate the most painful parts of the job search. From custom ATS resumes to daily application volume.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link 
                  href="/onboarding" 
                  className="pill-button bg-[#2DD4A7] text-[#0F172A] px-12 py-5 shadow-teal hover:scale-105 active:scale-95 text-xs uppercase tracking-[0.15em]"
                >
                  Join The Search
                </Link>
                <Link 
                  href="/login" 
                  className="pill-button border-2 border-slate-200 text-[#0F172A] hover:border-[#0F172A] px-12 py-5 text-xs uppercase tracking-[0.15em]"
                >
                  Access Portal
                </Link>
              </div>
            </div>

            {/* Visual element (unDraw Illustration) */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#2DD4A7]/5 blur-[100px] rounded-full -z-10"></div>
              
              <div className="animate-float">
                 <img 
                    src="/undraw_programming_j1zw.svg" 
                    alt="Nexvelt Platform" 
                    className="w-full h-auto max-w-[500px] drop-shadow-2xl"
                 />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#2DD4A7]/20 backdrop-blur-3xl rounded-3xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-[#0F172A]/10 backdrop-blur-3xl rounded-2xl -z-10 animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* ─── STATS SECTION ─── */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "500+", label: "Professionals" },
              { val: "100+", label: "Weekly Apps" },
              { val: "7-10", label: "Days to Interview" },
              { val: "24/7", label: "Support" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-[#0F172A] mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2DD4A7]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ABOUT SECTION (WHY NEXVELT EXISTS) ─── */}
        <section id="about" className="py-20 bg-white overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-10">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8 tracking-tight">Why <span className="text-[#2DD4A7]">Nexvelt</span> Exists</h2>
                    <div className="space-y-6 text-slate-500 font-medium text-lg leading-relaxed">
                       <p>Job searching today is frustrating and inconsistent. Most candidates spend hours applying to dozens of roles, only to receive little to no response.</p>
                       <p>Nexvelt was created to solve this problem. Instead of manually applying and guessing what works, we use a structured system that combines automated applications, ATS-optimized resumes, and guided interview preparation.</p>
                       <p className="border-l-4 border-[#2DD4A7] pl-6 py-2 bg-[#2DD4A7]/5 rounded-r-2xl italic text-[#0F172A]">We focus on building a reliable, repeatable process that gives you better results over time.</p>
                    </div>
                 </div>
                 <div className="relative group">
                    <div className="absolute inset-0 bg-[#2DD4A7]/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
                    <div className="p-12 bg-[#F8FAFC] rounded-[45px] border border-slate-100 shadow-premium">
                       <h3 className="text-xl font-black text-[#0F172A] mb-6">The System Model</h3>
                       <div className="space-y-4">
                          {[
                            { step: "Visibility", val: "High-Volume Applications" },
                            { step: "Targeting", val: "ATS-Optimized Resumes" },
                            { step: "Preparation", val: "Mock Interview Sessions" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.step}</span>
                               <span className="text-sm font-bold text-[#0F172A]">{item.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* ─── WHAT WE DO SECTION ─── */}
        <section id="services" className="py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-8 tracking-tight italic">What <span className="text-[#2DD4A7]">We Do</span></h2>
              <div className="max-w-3xl mx-auto space-y-4 text-slate-500 font-medium text-lg leading-relaxed mb-12">
                 <p>Nexvelt is a done-for-you job application service designed to help candidates get more interview opportunities without spending hours applying manually.</p>
                 <p>We handle the entire application process — from identifying relevant roles to submitting optimized applications — so you can focus on preparing for interviews instead of chasing them.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {[
                { title: "Job Application Management", desc: "We apply to relevant full-time roles on your behalf every day, ensuring consistency and high volume.", icon: <Globe size={24} /> },
                // { title: "ATS-Optimized Resumes", desc: "Your resume is tailored for each role to pass Applicant Tracking Systems (ATS) and improve visibility.", icon: <Target size={24} /> },
                { title: "Tailored Cover Letters", desc: "Customized cover letters aligned with each job description to improve your response rates.", icon: <Mail size={24} /> },
                // { title: "Profile Optimization", desc: "We enhance your professional profiles including LinkedIn and GitHub to attract elite recruiters.", icon: <Users size={24} /> },
                { title: "Application Tracking", desc: "Access a structured dashboard to track applications, responses, and job search progress.", icon: <BarChart3 size={24} /> },
                // { title: "Interview Prep Support", desc: "Mock interview sessions and guidance to help you perform better in high-stakes conversations.", icon: <Zap size={24} /> },
                // { title: "Mentorship & Guidance", desc: "One-on-one mentorship sessions to guide your job search strategy and career decisions.", icon: <UserCheck size={24} /> },
                { title: "End-to-End System", desc: "From application to offer, Nexvelt provides a complete system designed to get you hired.", icon: <ShieldCheck size={24} /> }
              ].filter(s => s.title !== "").map((s, i) => (
                <div key={i} className="card-float group">
                  <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#2DD4A7] group-hover:text-[#0F172A] transition-all mb-8">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#0F172A] mb-4 leading-tight">{s.title}</h3>
                  <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS SECTION ─── */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-10 text-center">
            <div className="mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight text-center">Success Stories</h2>
               <p className="text-slate-500 font-medium">Hear from professionals who built a repeatable process with Nexvelt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-4">
              {[
                { name: "Rahul K.", role: "Software Engineer", quote: "After using Nexvelt, I started getting interview calls within about 10 days. The difference was in how targeted the apps were." },
                { name: "Sneha M.", role: "Data Analyst", quote: "Once my resume was optimized and applications were handled consistently, I started seeing a noticeable increase in responses." },
                { name: "Arjun P.", role: "Frontend Developer", quote: "The biggest benefit was structure. Everything was tracked and optimized. The mock interviews helped me feel confident." },
                { name: "Priya S.", role: "Graduate Student", quote: "Nexvelt helped me with resume versions, applications, and guidance. It made the whole process much less overwhelming." }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-[40px] border-2 border-slate-50 bg-[#F8FAFC]/50 transition-all duration-500 flex flex-col items-center text-center hover:border-[#2DD4A7] hover:shadow-teal hover:bg-white group cursor-default">
                  <div className="w-16 h-16 rounded-full bg-[#2DD4A7]/10 flex items-center justify-center mb-6 relative group-hover:bg-[#2DD4A7]/20 transition-colors">
                     <Users className="text-[#2DD4A7]" size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#0F172A] mb-1">{t.name}</h3>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2DD4A7] mb-6">{t.role}</p>
                  <p className="text-slate-500 text-[13px] font-medium leading-relaxed">"{t.quote}"</p>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-6">
               “Results may vary depending on experience, role, and market conditions.”
            </p>
          </div>
        </section>

        {/* ─── PRICING SECTION ─── */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">Simple Pricing.</h2>
               <p className="text-slate-500 font-medium">Choose a plan that fits your search intensity.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
               {[
                 { 
                   plan: "Basic", 
                   price: "0", 
                   active: false, 
                   label: "Free",
                   features: ["20 job applications / month", "12 ATS resume versions"]
                 },
                 { 
                   plan: "PRO", 
                   price: "149", 
                   active: true, 
                   label: "Most Popular",
                   features: [
                     "100 applications/month (Done for you)", 
                     "25–30 ATS resume versions",
                     "Tailored cover letters per role",
                     "Application tracking dashboard",
                     "10 mock interview sessions",
                     "Priority support"
                   ]
                 },
                 { 
                   plan: "PREMIUM", 
                   price: "249", 
                   active: false, 
                   label: "Best Value",
                   features: [
                     "Unlimited applications / month",
                     "Unlimited resume versions",
                     "Tailored cover letters per role",
                     "LinkedIn, GitHub, Portfolio Suite",
                     "Unlimited mock interviews",
                     "OA & Assessment support",
                     "1-on-1 mentorship sessions",
                     "Dedicated human advisor",
                     "Internship access",
                     "Placement guarantee"
                   ]
                 }
               ].map((p, i) => (
                 <div key={i} className={`p-8 md:p-10 rounded-[45px] border-2 relative transition-all duration-500 overflow-hidden ${p.active ? 'border-[#2DD4A7] shadow-premium scale-105 z-10 bg-white' : 'border-slate-50 bg-[#F8FAFC]/50'}`}>
                    {p.active ? (
                       <span className="absolute -top-1 right-1/2 translate-x-1/2 bg-[#2DD4A7] text-[#0F172A] text-[9px] font-black uppercase tracking-[0.2em] px-8 py-2.5 rounded-b-3xl">Most Popular</span>
                    ) : (
                       <span className="absolute -top-1 right-1/2 translate-x-1/2 bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-b-2xl">{p.label}</span>
                    )}

                    <div className="mt-4">
                      <h3 className="text-xl font-black text-[#0F172A] mb-1">{p.plan}</h3>
                      <div className="flex items-baseline gap-1 mb-8">
                         <span className="text-5xl font-black text-[#0F172A]">${p.price}</span>
                         <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">/mo</span>
                      </div>
                      
                      <ul className="space-y-4 mb-10 min-h-[120px]">
                         {p.features.map(f => (
                           <li key={f} className="text-[13px] font-semibold text-slate-600 flex items-start gap-3 leading-tight">
                              <div className="w-5 h-5 rounded-full bg-[#2DD4A7]/10 flex-shrink-0 flex items-center justify-center mt-0.5">
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4A7]"></div>
                              </div>
                              {f}
                           </li>
                         ))}
                      </ul>

                      <Link href="/onboarding" className={`pill-button w-full text-center block text-[11px] uppercase tracking-[0.2em] ${p.active ? 'bg-[#2DD4A7] text-[#0F172A] shadow-teal' : 'bg-[#0F172A] text-white hover:bg-black'}`}>
                        Get Started
                      </Link>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT SECTION ─── */}
        <section className="py-24 bg-[#0F172A] relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2DD4A7]/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 -z-0"></div>
           
           <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">Ready to accelerate?</h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">Get your job search on autopilot. Join Nexvelt today and start receiving interview invites next week.</p>
              
              <form onSubmit={handleLeadCapture} className="bg-white/5 backdrop-blur-md p-2 rounded-full max-w-lg mx-auto flex gap-2 border border-white/10 group focus-within:border-[#2DD4A7]/50 transition-all">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   value={leadEmail}
                   onChange={(e) => setLeadEmail(e.target.value)}
                   className="bg-transparent border-none text-white px-6 w-full outline-none placeholder:text-slate-500 text-sm"
                   required
                 />
                 <button 
                   type="submit"
                   disabled={isSubmitting || isSuccess}
                   className="pill-button bg-[#2DD4A7] text-[#0F172A] text-xs uppercase tracking-widest whitespace-nowrap px-10 disabled:opacity-50"
                 >
                    {isSubmitting ? "Joining..." : isSuccess ? "Successfully Joined!" : "Get Started"}
                    {!isSubmitting && !isSuccess && <ArrowRight size={14} className="inline ml-2 fill-[#0F172A]" />}
                 </button>
              </form>
           </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-16 bg-[#F8FAFC]/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <Link href="/" className="flex items-center gap-2 grayscale brightness-0 opacity-50 cursor-pointer">
            <img 
               src="/NVlogo.png" 
               alt="Nexvelt Logo" 
               className="h-12 w-auto"
            />
          </Link>
          <div className="flex gap-10">
            {[
              { name: "Terms", href: "/terms" },
              { name: "Privacy", href: "/privacy" },
              { name: "Support", href: "mailto:nexvelt2013@gmail.com" }
            ].map(item => (
              <Link key={item.name} href={item.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#0F172A] transition-colors">{item.name}</Link>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <p className="text-[9px] font-medium text-slate-400">By using Nexvelt, you agree to our <Link href="/terms" className="underline hover:text-[#2DD4A7]">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-[#2DD4A7]">Privacy Policy</Link>.</p>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 NEXVELT TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}