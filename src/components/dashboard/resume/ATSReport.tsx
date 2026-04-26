import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowLeft, ExternalLink, Download } from 'lucide-react';

interface ATSReportProps {
  onBack: () => void;
  targetRole?: string;
  applicantName?: string;
}

export default function ATSReport({ onBack, targetRole = "Senior Frontend Engineer", applicantName = "John Doe" }: ATSReportProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative">
      {/* --- Raw CSS for PDF Printing --- */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #ats-report-container, #ats-report-container * {
            visibility: visible;
          }
          #ats-report-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            background-color: #171717 !important; 
            padding: 12mm 15mm !important;
          }
          .hide-on-print {
            display: none !important;
          }
          .page-break-before {
            page-break-before: always;
            break-before: page;
            padding-top: 20mm;
          }
          
          /* Prevent layout from collapsing to mobile view on print */
          .lg\\:flex-row { flex-direction: row !important; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .lg\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
          .lg\\:w-80 { width: 20rem !important; }
          .lg\\:items-center { align-items: center !important; }
        }
      `}</style>

      {/* Action Bar (Hidden on print) */}
      <div className="flex items-center justify-between mb-6 hide-on-print">
         <button 
           onClick={onBack}
           className="flex items-center gap-2 text-slate-500 hover:text-[#0F172A] transition-colors text-sm font-bold uppercase tracking-widest"
         >
           <ArrowLeft size={16} /> Back to Preview
         </button>
         
         <button 
            onClick={handlePrint}
            className="px-6 py-3 bg-[#2DD4A7] text-[#0F172A] rounded-xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-teal"
         >
            Download PDF Report <Download size={16} />
         </button>
      </div>

      {/* The Printable Report Container */}
      <div id="ats-report-container" className="bg-[#171717] min-h-screen text-white rounded-3xl overflow-hidden shadow-2xl p-8 lg:p-12 mb-10 relative">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DD4A7]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* ── Top Header ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8 relative z-10 border-b border-white/10 pb-8">
          <div>
            {/* Fancy Company Logo */}
            <div className="flex items-center mb-8">
               <img 
                 src="/NVlogo.png" 
                 alt="Nexvelt Logo" 
                 className="h-10 w-auto"
               />
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">ATS Screening Report</h1>
            
            <div className="flex flex-col gap-3">
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Applicant Name: <span className="text-white bg-white/5 px-3 py-1 rounded-md border border-white/10">{applicantName}</span>
               </div>
               <div className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Target Role: <span className="bg-[#2DD4A7]/10 px-3 py-1 rounded-md text-[#2DD4A7] border border-[#2DD4A7]/20 shadow-[0_0_15px_rgba(45,212,167,0.1)]">{targetRole}</span>
               </div>
            </div>
          </div>

          <div className="relative pt-4">
            <div className="w-48 h-48 rounded-full border-[12px] border-[#2DD4A7]/10 flex items-center justify-center relative z-10 shadow-[0_0_80px_rgba(45,212,167,0.15)] bg-black/20 backdrop-blur-md">
               <div className="absolute inset-0 rounded-full border-[12px] border-[#2DD4A7] border-l-transparent border-t-[#2DD4A7]/40 -rotate-45 drop-shadow-[0_0_15px_rgba(45,212,167,0.5)]"></div>
               <div className="text-center">
                  <span className="text-7xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">94</span>
               </div>
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-black tracking-[0.3em] uppercase text-[#2DD4A7] bg-[#171717] px-4">Match Score</div>
          </div>
        </div>

        {/* ── Detections ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-12 relative z-10 bg-white/5 p-6 rounded-2xl border border-white/10">
           {[
             { label: "Contact Details", val: "YES" },
             { label: "LinkedIn Id", val: "YES" },
             { label: "Portfolio", val: "YES" },
             { label: "Email Id", val: "YES" },
             { label: "GitHub", val: "YES" },
           ].map(d => (
             <div key={d.label} className="flex flex-col items-center justify-center gap-2 text-center">
                <ShieldCheck size={24} className="text-[#2DD4A7]" />
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{d.label}</span>
                <span className="text-sm font-black text-[#2DD4A7]">{d.val}</span>
             </div>
           ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
           {/* ── Left Grid (Checks) ── */}
           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Measuring Effect", desc: "Well done. Your resume contains enough numbers and metrics." },
                { title: "Vague Buzzwords", desc: "Well done! Your resume avoids Vague Buzzwords." },
                { title: "No repetitive phrases", desc: "Your use of language exhibits commendable diversity." },
                { title: "Fluff Glitches", desc: "Great Job! Your resume avoids Fluff Glitches." },
                { title: "Unique action verbs", desc: "Well done. Your resume contains enough Action Verbs." },
                { title: "Formatting", desc: "Excellent. Your experiences are in reverse chronological order." },
                { title: "Weak Action Verbs", desc: "Nice work, your verbs are clear and impactful." },
                { title: "Date Formatting", desc: "You're a pro at keeping your dates consistent, good job!" },
                { title: "Unwanted Words", desc: "Great job, your word choice is inclusive and impactful." },
                { title: "Contact Details", desc: "It's Clear. Your resume contains enough Contact Details." },
                { title: "Proofread Impact", desc: "Great job! Your resume is free of mistakes and looking sharp." },
                { title: "Personal Details", desc: "The information you requested seems to be available." },
                { title: "Resume Length", desc: "Perfect resume length, not too short, not too long!" },
                { title: "Core Readability", desc: "Your Resume Core Sections Found." },
              ].map((check, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 flex gap-4 items-start shadow-sm border border-white/5 hover:bg-white/10 transition-colors">
                   <div className="mt-0.5 w-6 h-6 rounded-full bg-[#2DD4A7]/20 text-[#2DD4A7] flex items-center justify-center shrink-0">
                      <ShieldCheck size={14} />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white mb-1">{check.title}</h4>
                      <p className="text-[11px] font-medium text-slate-400 leading-snug">{check.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* ── Right Sidebar (Scores) ── */}
           <div className="w-full lg:w-80 space-y-6">
              {[
                { score: 92, title: "Impact", items: ["Metrics Impact", "Verbs Impact", "Spell Impact", "Keyword Impact"] },
                { score: 90, title: "Brevity", items: ["Resume Length", "Formatting", "Excess/Filler Words", "Bullet Strength"] },
                { score: 93, title: "Appearance", items: ["Vague Buzzwords", "Details Detection", "Core Linking", "Readability"] }
              ].map((block, i) => (
                 <div key={i} className="bg-gradient-to-b from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2DD4A7] to-transparent opacity-50"></div>
                    <div className="flex flex-col items-center mb-6">
                       <div className="w-16 h-16 rounded-full bg-[#2DD4A7]/10 border border-[#2DD4A7]/30 text-[#2DD4A7] font-black text-2xl flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(45,212,167,0.2)]">
                          {block.score}
                       </div>
                       <h4 className="text-lg font-black text-white uppercase tracking-widest">{block.title}</h4>
                    </div>
                    <div className="space-y-4">
                       {block.items.map(item => (
                          <div key={item} className="flex items-center justify-between text-xs font-bold text-slate-300 bg-black/20 p-2.5 rounded-lg border border-white/5">
                             {item} <CheckCircle2 size={14} className="text-[#2DD4A7]" />
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* ── PAGE 2 CONTENT (For PDF Printing) ── */}
        <div className="page-break-before mt-16 pt-16 border-t border-white/10 relative z-10">
           
           <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#2DD4A7] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(45,212,167,0.4)]">
                 <span className="text-[#171717] font-black text-2xl">AI</span>
              </div>
              <h2 className="text-3xl font-black text-white">What we did for you:</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 bg-white/5 p-8 lg:p-12 rounded-3xl border border-white/10">
              {[
                "We have crafted your summary section based on your experience. You should customize it according to the job description.",
                "We have included advanced technical skills relevant to your domain to pass stringent ATS filters.",
                "We have crafted your resume structure based on modern employer expectations.",
                "The work experience section has been optimized based on employer business models and impactful metrics.",
                "Technical keywords were added to your work experience section to drastically improve Applicant Tracking System (ATS) parsing.",
                "Mentioning metrics on your resume grabs the recruiter's attention and is one of the most critical elements of an ATS resume.",
                "We tailored your resume length according to ATS standards. For 3+ years of experience, it is perfectly constrained.",
                "We verified formatting and date consistency to ensure no parsing errors occur in legacy enterprise systems."
              ].map((text, i) => (
                 <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4A7] to-blue-500 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-lg">
                       {i + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-relaxed pt-1.5">{text}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* ── Footer Pitch ── */}
        <div className="mt-16 pt-12 border-t border-white/10 text-center relative z-10">
           <div className="bg-gradient-to-b from-white/10 to-transparent rounded-3xl p-10 max-w-2xl mx-auto border border-white/10 shadow-2xl">
              <h3 className="text-xl font-black text-[#2DD4A7] mb-4 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(45,212,167,0.5)]">Official Platform</h3>
              <p className="text-slate-300 font-medium mb-8">Access our full suite of AI career tools, placement programs, and LinkedIn optimization services.</p>
              <div className="inline-flex items-center gap-2 border-b-2 border-[#2DD4A7] pb-1 text-2xl font-black text-white hover:text-[#2DD4A7] transition-colors cursor-pointer">
                 app.nexvelt.me <ExternalLink size={20} className="text-[#2DD4A7]" />
              </div>
           </div>
           
           <div className="mt-16 flex flex-col items-center justify-center">
              <p className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-3">Thank you from</p>
              <img src="/NVlogo.png" alt="Nexvelt" className="h-8 w-auto opacity-90" />
           </div>
        </div>

      </div>
    </div>
  );
}
