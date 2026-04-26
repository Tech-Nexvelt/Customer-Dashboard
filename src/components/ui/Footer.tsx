import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2DD4A7]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/NVlogo.png" 
                alt="Nexvelt Logo" 
                className="h-14 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Automate your job search and build a repeatable system for career success. Join 500+ professionals using Nexvelt today.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#2DD4A7] hover:text-[#0F172A] hover:border-[#2DD4A7] transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#2DD4A7] hover:text-[#0F172A] hover:border-[#2DD4A7] transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#2DD4A7] hover:text-[#0F172A] hover:border-[#2DD4A7] transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Platform</h4>
            <ul className="space-y-4">
              {["Services", "About", "Pricing", "Testimonials"].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase()}`} className="text-slate-400 text-sm hover:text-[#2DD4A7] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#2DD4A7] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Resources</h4>
            <ul className="space-y-4">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Contact Support"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-slate-400 text-sm hover:text-[#2DD4A7] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#2DD4A7] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Connect</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2DD4A7]/10 flex items-center justify-center text-[#2DD4A7] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</p>
                  <a href="mailto:nexvelt.hyd@gmail.com" className="text-white text-sm font-bold hover:text-[#2DD4A7] transition-colors">nexvelt.hyd@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</p>
                  <p className="text-white text-sm font-bold">Hyderabad, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} NEXVELT TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4A7] animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
