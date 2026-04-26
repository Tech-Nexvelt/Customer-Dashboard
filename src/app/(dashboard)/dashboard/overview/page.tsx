"use client";
import React, { useState } from "react";
import C from "@/constants/colors";
import StatCardsRow from "@/components/dashboard/overview/StatCardsRow";
import AssignmentsRow from "@/components/dashboard/prep/AssignmentsRow";
import { useUser } from "@/features/auth/hooks/useUser";
import { Lock, Zap, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const { user } = useUser();
  const userName = user?.name || "User";
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleFeatureClick = (featureName: string) => {
    setSelectedFeature(featureName);
    setUpgradeModalOpen(true);
  };

  return (
    <div>
      {/* ── Greeting ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.03em" }}>
          Good Morning, {userName}{" "}
          <span style={{ fontSize: 28 }}>👋</span>
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 14, marginTop: 8, fontWeight: 500 }}>
          Here's a look at your career performance and analytics.
        </p>
      </div>

      {/* ── 3 Stat Cards ── */}
      <StatCardsRow />

      {/* ── Assignments Row ── */}
      <AssignmentsRow />

      {/* ── Premium Features Showcase ── */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold text-[#0F172A]">Premium Suite & AI Tools</h2>
           <span className="text-xs font-bold text-[#2DD4A7] uppercase tracking-wider bg-[#2DD4A7]/10 px-3 py-1 rounded-full">Pro / Premium</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {/* Free limit hit example */}
           <div 
             onClick={() => handleFeatureClick("Automated Job Applications (Limit Reached)")}
             className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm cursor-pointer hover:shadow-md transition-all relative overflow-hidden group"
           >
              <div className="flex items-center justify-between mb-4">
                 <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                    <Zap size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">20/20 USED</span>
              </div>
              <h3 className="font-bold text-[#0F172A] mb-1">Auto-Apply Bot</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Your monthly free tier limit has been reached.</p>
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-[#0F172A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">Upgrade to Unlock</span>
              </div>
           </div>

           {/* Locked features */}
           {[
             { title: "AI Mock Interviews", desc: "Practice with our realistic AI interviewer.", icon: <Lock size={18} /> },
             { title: "Tailored Cover Letters", desc: "Generate role-specific cover letters instantly.", icon: <Lock size={18} /> },
             { title: "LinkedIn Optimization", desc: "Automated profile reviews and suggestions.", icon: <Lock size={18} /> },
             { title: "Dedicated Human Advisor", desc: "Get 1-on-1 mentorship and guidance.", icon: <Lock size={18} /> },
             { title: "Placement Guarantee", desc: "We don't stop until you land an offer.", icon: <Lock size={18} /> }
           ].map((feat, i) => (
             <div 
               key={i}
               onClick={() => handleFeatureClick(feat.title)}
               className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all relative overflow-hidden group"
             >
                <div className="flex items-center justify-between mb-4">
                   <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                      {feat.icon}
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wider">Locked</span>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="bg-[#0F172A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"><Lock size={12}/> Unlock Feature</span>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Upgrade Modal */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-200">
              <button onClick={() => setUpgradeModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors">
                 <X size={16} />
              </button>
              
              <div className="w-16 h-16 bg-[#2DD4A7]/10 rounded-2xl flex items-center justify-center text-[#2DD4A7] mb-6">
                 <Lock size={28} />
              </div>
              
              <h3 className="text-2xl font-black text-[#0F172A] mb-2 leading-tight">Unlock {selectedFeature}</h3>
              <p className="text-slate-500 text-sm font-medium mb-8">You've hit your free limit or are trying to access a premium feature. Upgrade your plan to gain full access to Nexvelt's powerful automation suite.</p>
              
              <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Unlimited automated applications
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Advanced AI interview prep
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Priority human support
                 </div>
              </div>

              <Link 
                 href="/#pricing"
                 onClick={() => setUpgradeModalOpen(false)}
                 className="w-full py-4 bg-[#0F172A] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2DD4A7] hover:text-[#0F172A] transition-colors flex justify-center items-center gap-2 shadow-lg"
              >
                 View Upgrade Plans <Zap size={16} />
              </Link>
           </div>
        </div>
      )}
    </div>
  );
}
