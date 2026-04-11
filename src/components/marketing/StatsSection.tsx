"use client";
import React from "react";

const companies = [
  { name: "Google", color: "hover:text-blue-500" },
  { name: "Microsoft", color: "hover:text-cyan-600" },
  { name: "Infosys", color: "hover:text-blue-700" },
  { name: "TCS", color: "hover:text-red-600" },
  { name: "Flipkart", color: "hover:text-yellow-500" },
  { name: "Swiggy", color: "hover:text-orange-500" }
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100/80 reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        <div className="flex flex-col items-center gap-12">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
            Trusted by professionals from world-class companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
            {companies.map((company) => (
              <span
                key={company.name}
                className={`text-2xl md:text-3xl font-black text-slate-300 transition-all duration-300 cursor-default tracking-tighter filter grayscale hover:grayscale-0 hover:scale-110 ${company.color}`}
              >
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
