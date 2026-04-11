"use client";
import React from "react";
import { FileText, Send, Mail, UserPlus, Mic, GraduationCap, LucideIcon } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  badge?: string;
}

const FEATURES: Feature[] = [
  { id: 1, title: "ATS-Optimized Resumes", description: "Up to 30 tailored versions per month designed to pass every automated screening.", icon: FileText, color: "#2DD4A7", bg: "bg-teal-50" },
  { id: 2, title: "Done-for-You Applications", description: "100+ applications filed monthly by our team to your target roles and companies.", icon: Send, color: "#3B82F6", bg: "bg-blue-50" },
  { id: 3, title: "Tailored Cover Letters", description: "A unique, highly-personalized cover letter written for every single role we apply to.", icon: Mail, color: "#F97316", bg: "bg-orange-50" },
  { id: 4, title: "Profile Optimization", description: "Your LinkedIn, GitHub, and Portfolio are all updated to attract top-tier recruiters.", icon: UserPlus, color: "#8B5CF6", bg: "bg-purple-50" },
  { id: 5, title: "Mock Interviews", description: "Unlimited practice rounds with industry experts and detailed performance feedback.", icon: Mic, color: "#F59E0B", bg: "bg-amber-50" },
  { id: 6, title: "Expert Mentorship", description: "Guided technical prep and 1-on-1 mentorship for final rounds and salary negotiation.", icon: GraduationCap, color: "#7C6FE0", bg: "bg-indigo-50", badge: "Premium" },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-32 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto reveal">
      <div className="text-center mb-24">
        <div className="badge-premium mb-6">Features</div>
        <h2 className="heading-section mb-6">
          Everything <span className="text-premium text-[#2DD4A7]">handled</span> for you
        </h2>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          From first touch to final offer. Our team handles the entire process while you prepare to shine in the interview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {FEATURES.map((f) => (
          <div
            key={f.id}
            className="group p-10 bg-white rounded-[40px] border border-slate-100/80 hover:border-[#2DD4A7]/40 hover:shadow-premium transition-all duration-500 relative flex flex-col items-start"
          >
            {f.badge && (
              <span className="absolute top-8 right-8 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-[0.15em] border border-indigo-100">
                {f.badge}
              </span>
            )}
            <div
              className={`w-16 h-16 ${f.bg} rounded-[22px] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}
            >
              <f.icon size={30} color={f.color} strokeWidth={2} />
            </div>
            <h3 className="heading-card mb-4 group-hover:text-slate-900 transition-colors">{f.title}</h3>
            <p className="text-slate-500 text-[16px] font-medium leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
