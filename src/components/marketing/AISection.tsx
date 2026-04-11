"use client";
import React from "react";
import { Mic, Link2, Clock, Send, Sparkles } from "lucide-react";

export default function AISection() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 sm:gap-20">
      {/* Text on left */}
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#EBEBEB] text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] mb-6">
          <Sparkles size={12} fill="#10B981" /> AI Assistant
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-8 leading-tight">
          Next Gen <span className="text-[#3B82F6]">Support</span> <br className="hidden md:block" />
          Powered by Large Language Models
        </h2>
        <p className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
          Integrated directly into the platform, the AI assistant helps automate lesson planning, answers curriculum questions, and generates mock exams in seconds.
        </p>
        <button className="bg-[#1A1A1A] text-white text-base font-bold px-8 py-4 rounded-2xl hover:bg-[#333] transition-all flex items-center justify-center gap-3 lg:mx-0 mx-auto shadow-xl">
          Try AI For Yourself <Send size={18} />
        </button>
      </div>

      {/* Mock AI Panel on right */}
      <div className="flex-1 w-full max-w-[400px] h-[580px] bg-white rounded-[40px] border border-[#EBEBEB] shadow-2xl overflow-hidden flex flex-col relative z-20 hover:scale-[1.02] transition-transform duration-500">
        {/* Panel Header */}
        <div className="p-6 border-b border-[#EBEBEB] flex items-center justify-between">
          <span className="font-extrabold text-[#1A1A1A]">You AI Assistance</span>
          <div className="bg-[#1A1A1A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            ✦ Pro Account
          </div>
        </div>

        {/* Panel Chat content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-extrabold text-[#1A1A1A] mb-4">How can I Help <br /><span className="text-[#10B981]">you, Amir?</span></div>
          <p className="text-sm text-[#9CA3AF] mb-8">You can ask anything about your academic status, assignments, exams, or courses.</p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {["Exams ✏️", "Assignments 📋", "Events ○"].map(c => <div key={c} className="px-4 py-2 border border-[#EBEBEB] bg-[#FAFAF8] rounded-full text-xs font-bold text-[#1A1A1A]">{c}</div>)}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Schedule ⏰", "Classes 📘"].map(c => <div key={c} className="px-4 py-2 border border-[#EBEBEB] bg-[#FAFAF8] rounded-full text-xs font-bold text-[#1A1A1A]">{c}</div>)}
          </div>
        </div>

        {/* Panel Quick actions slider */}
        <div className="px-6 flex gap-3 overflow-x-auto scrollbar-hide mb-4">
          {["Generate 10 Math Questions", "Create Exam Study Plan"].map(q => <div key={q} className="flex-shrink-0 px-4 py-3 bg-[#F4F4F1] border border-[#EBEBEB] text-[11px] font-bold text-[#6B7280] rounded-xl max-w-[140px] leading-tight text-left">{q}</div>)}
        </div>

        {/* Panel Input */}
        <div className="p-4 pt-0">
          <div className="p-4 bg-[#F8F8F5] border border-[#EBEBEB] rounded-2xl">
            <div className="text-xs text-[#9CA3AF] mb-6 font-semibold">How can I help you today?</div>
            <div className="flex items-center justify-between">
               <div className="flex gap-4 text-[#9CA3AF]">
                 <Mic size={18} />
                 <Link2 size={18} />
                 <Clock size={18} />
               </div>
               <div className="bg-[#1A1A1A] text-white p-2.5 rounded-full shadow-md"><Send size={16} fill="white" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient background blur for AI section */}
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-[#3B82F6]/5 blur-[120px] -z-10 rounded-full animate-pulse"></div>
    </section>
  );
}
