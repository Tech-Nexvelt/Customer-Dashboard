"use client";
import React from "react";
import { UserPlus, Zap, Target, ChevronRight, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Share your profile",
    icon: <UserPlus className="transition-colors duration-500" size={32} />,
    desc: "Upload your resume and tell us your target roles, location, and companies. Our AI parses your data in seconds.",
    accent: "bg-teal-50",
    iconColor: "text-teal-500",
    borderColor: "group-hover:border-teal-200",
  },
  {
    id: "02",
    title: "We apply for you",
    icon: <Zap className="transition-colors duration-500" size={32} />,
    desc: "Our team applies to 100+ jobs monthly with human-reviewed, tailored resumes and custom cover letters.",
    accent: "bg-indigo-50",
    iconColor: "text-indigo-500",
    borderColor: "group-hover:border-indigo-200",
  },
  {
    id: "03",
    title: "You show up to interviews",
    icon: <Target className="transition-colors duration-500" size={32} />,
    desc: "Get real-time notifications as interviews land. We provide research briefs and prep for every round.",
    accent: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "group-hover:border-amber-200",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-white reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-24">
          <div className="badge-premium mb-6">
            Our Process
          </div>
          <h2 className="heading-section mb-6">
            How DevSphere <span className="text-premium text-[#2DD4A7]">works</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            From signup to first interview in as little as 48 hours. We handle the heavy lifting so you can focus on performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group relative p-10 bg-white border border-slate-100 rounded-[32px] transition-all duration-500 flex flex-col items-start hover:shadow-premium hover:-translate-y-2 ${step.borderColor}`}
            >
              {/* Step number badge */}
              <div className="absolute top-8 right-8 text-5xl font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none">
                {step.id}
              </div>

              <div className={`p-5 ${step.accent} ${step.iconColor} rounded-[24px] mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                {step.icon}
              </div>

              <div className="flex items-center gap-3 mb-4">
                 <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${step.accent} ${step.iconColor} uppercase tracking-widest`}>
                  Step {step.id}
                 </span>
              </div>

              <h3 className="heading-card mb-4 group-hover:text-slate-900 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-slate-500 text-[16px] font-medium leading-relaxed mb-8">
                {step.desc}
              </p>
              
              <div className="mt-auto pt-6 w-full border-t border-slate-50 group-hover:border-slate-100 transition-colors">
                <button className={`flex items-center gap-2 ${step.iconColor} text-sm font-bold opacity-80 group-hover:opacity-100 transition-all group-hover:gap-3`}>
                  Learn more <ArrowRight size={16} />
                </button>
              </div>

              {/* Connecting dashed line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 translate-x-0 w-12 border-t-2 border-dashed border-slate-100 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
