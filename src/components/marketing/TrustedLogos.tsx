"use client";
import React from "react";

const logos = [
  { name: "Google", brand: "google" },
  { name: "Microsoft", brand: "microsoft" },
  { name: "Amazon", brand: "amazon" },
  { name: "Meta", brand: "meta" },
  { name: "Apple", brand: "apple" },
  { name: "Netflix", brand: "netflix" },
];

export default function TrustedLogos() {
  return (
    <section className="py-20 border-y border-slate-100 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">
          Trusted by professionals at world-class companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="group flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <span className="text-2xl font-black text-slate-400 group-hover:text-slate-900 transition-colors tracking-tight">
                {logo.name}
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-[#2DD4A7] transition-all duration-300 rounded-full mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
