"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto overflow-hidden relative reveal">
      <div className="bg-slate-900 rounded-[48px] p-12 md:p-24 text-center text-white relative flex flex-col items-center justify-center gap-10 shadow-premium-xl overflow-hidden border border-white/10">
        {/* Decorative background glows */}
        <div className="absolute top-[-20%] right-[-10%] w-2/3 h-2/3 bg-[#2DD4A7]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-1/2 h-1/2 bg-indigo-500/10 blur-[100px] rounded-full"></div>
        
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-2">
            <Rocket className="text-[#2DD4A7]" size={28} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Ready to land your <span className="text-premium text-[#2DD4A7] font-normal italic">dream role?</span>
          </h2>
        </div>
        
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium z-10 leading-relaxed">
          Join 500+ top-tier professionals who let DevSphere handle the application grind. Stop applying, start interviewing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4 z-10 w-full sm:w-auto">
          <Link href="/signup" className="btn-primary w-full sm:w-auto px-12 py-5 text-base">
            Get started for free <ChevronRight size={20} />
          </Link>
          <Link href="/pricing" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-10 py-5 rounded-2xl transition-all w-full sm:w-auto">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
