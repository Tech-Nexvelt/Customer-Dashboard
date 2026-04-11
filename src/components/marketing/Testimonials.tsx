"use client";
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "DevSphere got me 6 interviews in 3 weeks. I just had to show up. Their team handled everything from tailoring to application.",
    author: "Rahul M.",
    role: "SDE-2 at Swiggy",
    color: "bg-[#2DD4A7]",
  },
  {
    quote: "The resume versions they created were incredible. Every letter was unique. It felt like I had a personal headhunter.",
    author: "Priya K.",
    role: "PM at Razorpay",
    color: "bg-[#7C6FE0]",
  },
  {
    quote: "Best investment in my job search. Placed in 45 days at my dream company. The technical mentorship was a game changer.",
    author: "Aditya S.",
    role: "Data Engineer at Flipkart",
    color: "bg-[#F59E0B]",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-white reveal">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] mb-6 tracking-tight">
            What our clients <span className="text-premium text-[#2DD4A7] font-normal">say</span>
          </h2>
          <p className="text-[#6B7280] font-medium text-lg max-w-2xl mx-auto">
            Real results from people who let DevSphere lead the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="p-10 bg-white border border-[#E5E7EB] rounded-[32px] flex flex-col justify-between transition-all hover:border-[#2DD4A7]/30 hover:shadow-premium duration-500 group text-left"
            >
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, star) => (
                    <Star key={star} size={14} fill="#2DD4A7" className="text-[#2DD4A7]" />
                  ))}
                </div>
                <p className="text-[#111827] text-lg leading-relaxed mb-12 font-medium">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-8 border-t border-[#F3F4F6]">
                <div className={`w-12 h-12 ${t.color} rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {t.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-black text-[#111827] text-sm tracking-tight">{t.author}</h4>
                  <p className="text-[#9CA3AF] text-[11px] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
