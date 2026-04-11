"use client";
import React, { useState } from "react";
import { Check, Info } from "lucide-react";

const pricing = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for tracking your own search.",
    features: [
      "Job Application Tracker",
      "Basic Profile Analysis",
      "Community Support",
      "Up to 5 stored resumes",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "149",
    desc: "We apply to jobs for you daily.",
    features: [
      "100+ Applications/mo",
      "Tailored Resumes & Covers",
      "LinkedIn Optimization",
      "Weekly Progress Reports",
    ],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Premium",
    price: "249",
    desc: "Full career concierge service.",
    features: [
      "Everything in Pro",
      "1-on-1 OA Mentorship",
      "Mock Interviews",
      "Priority Application Support",
    ],
    cta: "Go Premium",
    highlight: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 bg-[#F9FAFB]/50 reveal border-y border-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] mb-6 tracking-tight">
            Simple, <span className="text-premium text-[#2DD4A7] font-normal">transparent</span> pricing
          </h2>
          <p className="text-[#6B7280] font-medium text-lg max-w-2xl mx-auto">
            Choose the level of support you need to land your next dream role.
          </p>
          
          {/* Toggle */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <span className={`text-[13px] font-black uppercase tracking-widest transition-colors ${!isYearly ? "text-[#111827]" : "text-[#9CA3AF]"}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-white border border-[#E5E7EB] rounded-full relative p-1.5 transition-all shadow-sm"
            >
              <div className={`w-4 h-4 bg-[#2DD4A7] rounded-full shadow-sm transition-transform duration-300 ${isYearly ? "translate-x-7" : "translate-x-0"}`} />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-[13px] font-black uppercase tracking-widest transition-colors ${isYearly ? "text-[#111827]" : "text-[#9CA3AF]"}`}>Yearly</span>
              <span className="bg-[#2DD4A7]/10 text-[#2DD4A7] text-[10px] font-black px-2 py-0.5 rounded-md">SAVE 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {pricing.map((plan) => (
            <div 
              key={plan.name}
              className={`flex flex-col p-10 rounded-[32px] bg-white border relative transition-all duration-500 text-left ${
                plan.highlight 
                  ? "border-[#2DD4A7]/30 shadow-premium-xl scale-[1.03] z-10" 
                  : "border-[#E5E7EB] hover:border-[#2DD4A7]/20 hover:shadow-premium"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                   <span className="bg-[#111827] text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-xl">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-black text-[#111827] mb-2">{plan.name}</h3>
                <p className="text-[#6B7280] font-medium text-[13px] leading-relaxed mb-6 h-10">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-black text-[#111827] tracking-tight">
                    ${isYearly ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}
                  </span>
                  <span className="text-[#9CA3AF] font-bold text-sm tracking-widest">/MO</span>
                </div>
              </div>

              <div className="h-px bg-[#F3F4F6] w-full mb-8"></div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 text-[14px] font-medium text-[#4B5563]">
                    <div className="bg-[#2DD4A7]/10 p-0.5 rounded-md mt-0.5 shrink-0">
                      <Check size={14} className="text-[#2DD4A7]" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button 
                  className={`w-full py-4.5 rounded-2xl text-[13px] font-black transition-all flex items-center justify-center gap-2 tracking-widest uppercase ${
                    plan.highlight 
                      ? "bg-[#2DD4A7] text-white hover:scale-[1.02] shadow-2xl shadow-[#2DD4A7]/30" 
                      : "bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] hover:bg-white hover:shadow-premium hover:scale-[1.02]"
                  }`}
                >
                  {plan.cta}
                </button>
                <p className="text-center text-[10px] font-bold text-[#9CA3AF] mt-4 flex items-center justify-center gap-1.5">
                  <Info size={10} /> Fully refundable for 30 days
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
