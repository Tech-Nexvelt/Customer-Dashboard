"use client";
import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "How it works"] },
    { title: "Company", links: ["About", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
  ];

  return (
    <footer className="bg-[#111827] pt-24 pb-12 px-6 sm:px-10 lg:px-20 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-[#2DD4A7] flex items-center justify-center text-white font-black text-base shadow-lg shadow-[#2DD4A7]/20 group-hover:scale-110 transition-transform">D</span>
              <span className="text-2xl font-black tracking-tight text-white transition-colors">DevSphere</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium">
              We Apply. You Interview. <br/>
              DevSphere handles your entire job search — resume, applications, optimization.
            </p>
            <div className="flex items-center gap-5 text-[#9CA3AF]">
              <Twitter size={18} className="hover:text-[#2DD4A7] transition-all cursor-pointer" />
              <Github size={18} className="hover:text-[#2DD4A7] transition-all cursor-pointer" />
              <Linkedin size={18} className="hover:text-[#2DD4A7] transition-all cursor-pointer" />
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{section.title}</h4>
              <ul className="space-y-3.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href="#" className="text-sm text-[#9CA3AF] hover:text-[#2DD4A7] transition-colors font-semibold">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.2em]">
             © 2026 DevSphere. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
             {["Login", "Signup"].map(auth => (
               <Link key={auth} href={`/${auth.toLowerCase()}`} className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.2em] hover:text-[#2DD4A7] transition-colors">
                  {auth}
               </Link>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
