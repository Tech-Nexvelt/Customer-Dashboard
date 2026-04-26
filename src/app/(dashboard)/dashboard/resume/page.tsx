"use client";
import React, { useState, useRef } from "react";
import { FileText, Download, Share2, Upload, MessageSquare, Lock, X, CheckCircle2, Zap, AlertCircle, ChevronRight, LayoutTemplate, Eye, FileUp, Loader2, ArrowLeft, BarChart } from "lucide-react";
import ATSGauge from "@/components/shared/ATSGauge";
import Card from "@/components/ui/Card";
import C from "@/constants/colors";
import Link from "next/link";
import ATSReport from "@/components/dashboard/resume/ATSReport";

type ViewState = "default" | "preview" | "report";

interface ATSReportData {
  score: number;
  breakdown: { impact: number; brevity: number; appearance: number };
  detections: { contact: boolean; linkedin: boolean; portfolio: boolean };
  checks: Array<{ title: string; desc: string; passed: boolean }>;
  improvementsMade: string[];
}

interface Resume {
  id: string;
  name: string;
  url?: string;
  isMain: boolean;
  atsMatchScore: number;
  atsReport?: ATSReportData;
  updatedAt: string;
  type?: string;
}

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useUser } from "@/features/auth/hooks/useUser";

export default function ResumePage() {
  const { user } = useUser();
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const maxFreeResumes = 10;
  
  // View states
  const [viewState, setViewState] = useState<ViewState>("default");

  // Generator Logic
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const [genStep, setGenStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [targetDomain, setTargetDomain] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateResume = () => {
    if (resumes.length >= maxFreeResumes) {
      setUpgradeModalOpen(true);
      return;
    }
    setGenStep(1);
    setUploadedFile(null);
    setTargetDomain("");
    setGeneratorOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const fetchResumes = async () => {
    if (!session?.user) return;
    setLoading(true);
    try {
      console.log(`[ResumePage] Fetching resumes: GET /api/resumes`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/resumes`, {
        headers: {
          Authorization: `Bearer ${(session.user as any).accessToken}`,
        },
      });
      const data = await res.json();
      console.log(`[ResumePage] Resumes response:`, data);
      if (res.ok) setResumes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [session]);

  const handleGenerate = async () => {
    if (!session?.user) return;
    setIsGenerating(true);
    try {
      console.log(`[ResumePage] Generating resume: POST /api/resumes/generate`, { targetRole: targetDomain });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/resumes/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session.user as any).accessToken}`,
        },
        body: JSON.stringify({ targetRole: targetDomain, templateId: selectedTemplate }),
      });

      const data = await res.json();
      console.log(`[ResumePage] Generate response:`, data);

      if (res.ok) {
        setIsGenerating(false);
        setGeneratorOpen(false);
        setViewState("preview");
        fetchResumes();
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    alert("Downloading PDF... (Mock Action)");
  };

  if (viewState === "report") {
    return <ATSReport onBack={() => setViewState("default")} targetRole={targetDomain || "AI/ML Engineer"} />;
  }

  if (viewState === "preview") {
    return (
      <div className="min-h-[80vh] flex flex-col">
         <div className="flex items-center justify-between mb-8">
            <button onClick={() => setViewState("default")} className="flex items-center gap-2 text-slate-500 hover:text-[#0F172A] font-bold text-sm uppercase tracking-widest transition-colors">
               <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <div className="flex gap-4">
               <button 
                  onClick={() => setViewState("report")}
                  className="px-6 py-3 bg-[#0F172A] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2DD4A7] hover:text-[#0F172A] transition-all flex items-center gap-2 shadow-sm"
               >
                  Get ATS Score & Report <BarChart size={16} />
               </button>
               <button 
                  onClick={handleDownload}
                  className="px-6 py-3 bg-[#2DD4A7] text-[#0F172A] rounded-xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-teal"
               >
                  Download PDF <Download size={16} />
               </button>
            </div>
         </div>

         <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-8 md:p-12 border-r border-slate-100 flex flex-col bg-slate-50/50">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
               </div>
               <h2 className="text-3xl font-black text-[#0F172A] mb-3">Resume Generated!</h2>
               <p className="text-slate-500 font-medium mb-8 leading-relaxed">Your resume has been completely rewritten and optimized for the <span className="font-bold text-[#0F172A]">{targetDomain || "specified"}</span> role using the <span className="capitalize font-bold text-[#0F172A]">{selectedTemplate}</span> template.</p>
               
               <div className="space-y-6 mt-auto">
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Next Steps</p>
                     <p className="text-sm font-bold text-[#0F172A] mb-4">View your detailed ATS parse report to see exactly how recruiters will see your resume.</p>
                     <button onClick={() => setViewState("report")} className="w-full py-3 bg-slate-100 text-[#0F172A] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                        View ATS Report
                     </button>
                  </div>
               </div>
            </div>

            <div className="w-full md:w-2/3 bg-slate-100 flex items-center justify-center p-8 relative">
               {/* Fake Full Page PDF Preview - 2 Pages */}
               <div className="w-full max-w-lg flex flex-col gap-8 h-[600px] overflow-y-auto px-4 pb-8 pt-4 custom-scrollbar">
                  {/* Page 1 */}
                  <div className="w-full aspect-[1/1.414] bg-white shadow-xl shadow-slate-300 p-8 md:p-10 flex flex-col gap-5 shrink-0 relative transition-transform hover:-translate-y-1">
                     <div className="text-center mb-6 border-b border-slate-100 pb-6">
                        <div className="h-8 bg-slate-800 w-3/4 mx-auto rounded mb-3"></div>
                        <div className="h-4 bg-slate-400 w-1/2 mx-auto rounded"></div>
                     </div>
                     <div className="h-4 bg-slate-800 w-1/3 rounded mt-2"></div>
                     <div className="space-y-3">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-5/6 rounded"></div>
                     </div>
                     <div className="h-4 bg-slate-800 w-1/4 rounded mt-4"></div>
                     <div className="space-y-3">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-11/12 rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-4/5 rounded"></div>
                     </div>
                     <div className="h-4 bg-slate-800 w-1/4 rounded mt-4"></div>
                     <div className="space-y-3">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-11/12 rounded"></div>
                     </div>
                     <div className="absolute bottom-4 right-8 text-[9px] text-slate-300 font-bold tracking-widest">PAGE 1 / 2</div>
                  </div>

                  {/* Page 2 */}
                  <div className="w-full aspect-[1/1.414] bg-white shadow-xl shadow-slate-300 p-8 md:p-10 flex flex-col gap-5 shrink-0 relative transition-transform hover:-translate-y-1">
                     <div className="space-y-3 mt-4">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-3/4 rounded"></div>
                     </div>
                     <div className="h-4 bg-slate-800 w-1/3 rounded mt-6"></div>
                     <div className="space-y-3">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-5/6 rounded"></div>
                     </div>
                     <div className="h-4 bg-slate-800 w-1/4 rounded mt-6"></div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-4/5 rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-11/12 rounded"></div>
                        <div className="h-2.5 bg-slate-300 w-full rounded"></div>
                     </div>
                     <div className="absolute bottom-4 right-8 text-[9px] text-slate-300 font-bold tracking-widest">PAGE 2 / 2</div>
                  </div>
               </div>
               
               <div className="absolute top-6 right-6 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Eye size={14} /> Live Preview
               </div>
            </div>
         </div>
      </div>
    );
  }

  // --- default state below ---
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Resume & Portfolio</h1>
          <p style={{ color: C.muted, marginTop: 4 }}>Manage your ATS-optimized resumes and portfolio</p>
        </div>
        
        <button
          onClick={handleCreateResume}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm bg-[#2DD4A7] text-[#0F172A] hover:opacity-90`}
        >
          <Upload size={16} /> 
          Create New Resume
        </button>
      </div>

      {resumes.length >= maxFreeResumes && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
           <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
           <div>
              <h4 className="text-sm font-bold text-red-700 mb-1">Resume Creation Limit Reached</h4>
              <p className="text-xs font-medium text-red-600/80">You have used all {maxFreeResumes} free ATS resume generations included in the Basic plan. Upgrade your account to unlock unlimited versions and tailored cover letters.</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "30px 20px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 20 }}>Current ATS Score Analysis</h3>
          <ATSGauge score={resumes[0]?.atsMatchScore || 0} size={150} />
          <div style={{ marginTop: 24 }}>
            <p style={{ color: resumes[0]?.atsMatchScore >= 80 ? C.success : C.teal, fontWeight: 700, fontSize: 14 }}>
              {resumes[0]?.atsMatchScore >= 80 ? 'Excellent Work!' : resumes.length > 0 ? 'Good Start!' : 'No Resume Found'}
            </p>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
              {resumes.length > 0 
                ? `Your latest resume is optimized for technical roles with a score of ${resumes[0]?.atsMatchScore}%.` 
                : 'Upload or generate your first resume to see your ATS score analysis.'}
            </p>
          </div>
        </Card>

        <Card style={{ padding: "30px 20px" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Portfolio Website</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase flex items-center gap-1"><Lock size={10}/> Premium</span>
          </div>
          <div
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => setUpgradeModalOpen(true)}
            style={{
              height: 180,
              background: "#F1F5F9",
              borderRadius: 14,
              border: `2px dashed ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <span className="bg-[#0F172A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"><Lock size={12}/> Unlock Portfolio Suite</span>
            </div>
            
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.teal,
                marginBottom: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Share2 size={18} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.text }}>portfolio-sayyad.nexvelt.me</p>
            <p style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Hosted by Nexvelt</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
           <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Resume Versions ({resumes.length})</h3>
        </div>
        
        {resumes.map((r, i, arr) => (
          <div
            key={r.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: r.isMain ? C.teal + "18" : C.light,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} color={r.isMain ? C.teal : C.muted} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{r.name}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: C.muted }}>Modified {new Date(r.updatedAt).toLocaleDateString()}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: r.isMain ? C.teal + "18" : C.light,
                      color: r.isMain ? C.teal : C.muted,
                      padding: "1px 6px",
                      borderRadius: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {r.type || 'Standard'}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                title="Download"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: C.light,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.muted,
                }}
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        ))}
      </Card>

      {/* Generator Modal (Steps 1 and 2 only) */}
      {generatorOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col h-[90vh] md:h-[80vh] animate-in zoom-in duration-200">
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
                 <div>
                    <h2 className="text-xl font-black text-[#0F172A] flex items-center gap-2"><Zap size={20} className="text-[#2DD4A7]"/> AI Resume Generator</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Generate an ATS-friendly resume tailored to your target role.</p>
                 </div>
                 <button onClick={() => setGeneratorOpen(false)} className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors">
                    <X size={16} />
                 </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-50 h-1">
                 <div className="bg-[#2DD4A7] h-full transition-all duration-500" style={{ width: `${(genStep / 2) * 100}%` }}></div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50/50">
                 {/* Step 1: Upload & Details */}
                 {genStep === 1 && (
                    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                       <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">1. Upload Current Resume</label>
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                          <div 
                             onClick={() => fileInputRef.current?.click()}
                             className="border-2 border-dashed border-slate-200 bg-white rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#2DD4A7] hover:bg-[#2DD4A7]/5 transition-all group"
                          >
                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:bg-white group-hover:shadow-sm group-hover:text-[#2DD4A7] transition-all">
                                <FileUp size={28} />
                             </div>
                             <p className="text-sm font-bold text-[#0F172A] mb-1">{uploadedFile ? uploadedFile.name : "Click or drag file to upload"}</p>
                             <p className="text-xs text-slate-400 font-medium">{uploadedFile ? "File selected successfully" : "PDF, DOCX up to 5MB"}</p>
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">2. Target Role / Domain</label>
                          <input 
                             type="text" 
                             placeholder="e.g. Senior Frontend Engineer" 
                             value={targetDomain}
                             onChange={(e) => setTargetDomain(e.target.value)}
                             className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium outline-none focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/10 transition-all text-[#0F172A]"
                          />
                       </div>

                       <button 
                          disabled={!uploadedFile || !targetDomain}
                          onClick={() => setGenStep(2)}
                          className="w-full py-4 bg-[#0F172A] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2DD4A7] hover:text-[#0F172A] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                          Next: Select Template <ChevronRight size={16} />
                       </button>
                    </div>
                 )}

                 {/* Step 2: Template Selection */}
                 {genStep === 2 && (
                    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                       <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block text-center mb-6">Choose an ATS-Friendly Template</label>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {["modern", "executive", "minimal"].map((tpl) => (
                             <div 
                                key={tpl}
                                onClick={() => setSelectedTemplate(tpl)}
                                className={`bg-white rounded-2xl p-2 border-2 cursor-pointer transition-all hover:shadow-lg ${selectedTemplate === tpl ? 'border-[#2DD4A7] shadow-lg scale-105' : 'border-slate-100 opacity-70 hover:opacity-100'}`}
                             >
                                <div className="aspect-[1/1.4] bg-slate-100 rounded-xl mb-3 flex flex-col p-4 gap-2">
                                   <div className="h-4 bg-slate-300 w-2/3 rounded-full mb-2"></div>
                                   <div className="h-2 bg-slate-200 w-full rounded-full"></div>
                                   <div className="h-2 bg-slate-200 w-4/5 rounded-full mb-2"></div>
                                   <div className="h-2 bg-slate-200 w-full rounded-full"></div>
                                   <div className="h-2 bg-slate-200 w-5/6 rounded-full"></div>
                                </div>
                                <div className="text-center pb-2">
                                   <p className="text-sm font-bold text-[#0F172A] capitalize">{tpl}</p>
                                </div>
                             </div>
                          ))}
                       </div>

                       <div className="flex gap-4 pt-4">
                          <button 
                             onClick={() => setGenStep(1)}
                             className="w-1/3 py-4 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
                          >
                             Back
                          </button>
                          <button 
                             onClick={handleGenerate}
                             disabled={isGenerating}
                             className="w-2/3 py-4 bg-[#0F172A] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#2DD4A7] hover:text-[#0F172A] transition-all flex justify-center items-center gap-2"
                          >
                             {isGenerating ? <><Loader2 size={16} className="animate-spin" /> Generating AI Resume...</> : <><Zap size={16} className="text-[#2DD4A7]" /> Generate Resume</>}
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}

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
              
              <h3 className="text-2xl font-black text-[#0F172A] mb-2 leading-tight">Unlock Unlimited Access</h3>
              <p className="text-slate-500 text-sm font-medium mb-8">You've hit your free limit of 12 ATS resumes, or you're trying to access a premium feature like the Portfolio Suite. Upgrade your plan to gain full access.</p>
              
              <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Unlimited ATS Resumes
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Instant Portfolio Website
                 </div>
                 <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 size={18} className="text-[#2DD4A7]" /> Unlimited Cover Letters
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
