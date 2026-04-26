"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, ExternalLink,
  Sparkles, CheckCircle2, Globe, MapPin, 
  Building2, Bookmark, EyeOff, TrendingUp,
  Zap, ArrowRight, DollarSign, Clock, LayoutGrid, List,
  PieChart as PieChartIcon, BarChart3, Target, MousePointer2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import C from "@/constants/colors";
import { useUser } from "@/features/auth/hooks/useUser";
import { toast } from "react-hot-toast";

// --- Types ---
interface JobLink {
  id: string;
  job_title: string;
  company: string;
  location: string;
  source: "linkedin" | "dice" | "indeed" | "glassdoor" | "company_site";
  apply_link: string;
  domain: string;
  salary?: string;
  posted_at: string;
  status: "new" | "interested" | "applied" | "rejected";
  isHot?: boolean;
}

// --- Mock Data ---
const MOCK_SCRAPED_JOBS: JobLink[] = [
  {
    id: "1",
    job_title: "Senior AI Engineer",
    company: "Google",
    location: "Mountain View, CA",
    source: "linkedin",
    apply_link: "https://linkedin.com/jobs/google-ai",
    domain: "AI & ML",
    salary: "$180k - $240k",
    posted_at: new Date().toISOString(),
    status: "new",
    isHot: true
  },
  {
    id: "2",
    job_title: "Staff Software Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    source: "company_site",
    apply_link: "https://netflix.com/careers",
    domain: "Software",
    salary: "$210k - $300k",
    posted_at: new Date().toISOString(),
    status: "applied",
    isHot: true
  },
  {
    id: "3",
    job_title: "Data Scientist",
    company: "Airbnb",
    location: "San Francisco, CA",
    source: "linkedin",
    apply_link: "https://airbnb.com/careers",
    domain: "Data Science",
    salary: "$165k - $225k",
    posted_at: new Date(Date.now() - 3600000).toISOString(),
    status: "new"
  },
  {
    id: "4",
    job_title: "Full Stack Developer",
    company: "Stripe",
    location: "Remote",
    source: "indeed",
    apply_link: "https://stripe.com/jobs",
    domain: "Software",
    salary: "$150k - $210k",
    posted_at: new Date(Date.now() - 7200000).toISOString(),
    status: "applied"
  },
  {
    id: "5",
    job_title: "Machine Learning Lead",
    company: "OpenAI",
    location: "San Francisco, CA",
    source: "company_site",
    apply_link: "https://openai.com/careers",
    domain: "AI & ML",
    salary: "$250k - $350k",
    posted_at: new Date(Date.now() - 10800000).toISOString(),
    status: "new",
    isHot: true
  },
  {
    id: "6",
    job_title: "Frontend Architect",
    company: "Vercel",
    location: "Remote",
    source: "linkedin",
    apply_link: "https://vercel.com/careers",
    domain: "Software",
    salary: "$170k - $230k",
    posted_at: new Date(Date.now() - 14400000).toISOString(),
    status: "interested"
  }
];

const DOMAINS = ["All Domains", "AI & ML", "Software", "Data Science", "Cloud & DevOps", "Design"];

export default function JobsPage() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<JobLink[]>(MOCK_SCRAPED_JOBS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --- Analytics Logic ---
  const stats = useMemo(() => {
    const total = jobs.length;
    const newlyFound = jobs.filter(j => j.status === "new").length;
    const applied = jobs.filter(j => j.status === "applied").length;
    const interested = jobs.filter(j => j.status === "interested").length;
    
    // Source data for Pie Chart
    const sourceMap: Record<string, number> = {};
    jobs.forEach(j => sourceMap[j.source] = (sourceMap[j.source] || 0) + 1);
    const sourceData = Object.keys(sourceMap).map(name => ({ name, value: sourceMap[name] }));

    // Domain data for Bar Chart
    const domainMap: Record<string, number> = {};
    jobs.forEach(j => domainMap[j.domain] = (domainMap[j.domain] || 0) + 1);
    const domainData = Object.keys(domainMap).map(name => ({ name, value: domainMap[name] }));

    return { total, newlyFound, applied, interested, sourceData, domainData };
  }, [jobs]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === "All Domains" || job.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter uppercase italic">Intelligence Hub</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#2DD4A7]/10 border border-[#2DD4A7]/20 rounded-full text-[#2DD4A7] text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#2DD4A7] rounded-full animate-ping"></span>
              Real-time Analysis
            </div>
          </div>
          <p className="text-slate-500 font-medium text-sm">Actionable analytics and verified job links from Nexvelt Scraper.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#0F172A]" : "text-slate-400 hover:text-slate-600"}`}><LayoutGrid size={18} /></button>
             <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#0F172A]" : "text-slate-400 hover:text-slate-600"}`}><List size={18} /></button>
          </div>
        </div>
      </div>

      {/* --- Detailed Analytics Row --- */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-12">
        {/* Pipeline Funnel */}
        <Card className="xl:col-span-2 p-6 rounded-[32px] border-slate-100 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest flex items-center gap-2">
                <Target size={14} className="text-[#2DD4A7]" /> Application Pipeline
              </h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Lead Conversion Funnel</p>
            </div>
            <Badge variant="teal" size="sm">Active</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            {[
              { label: "Discovered", value: stats.total, color: "text-blue-500", icon: Globe },
              { label: "High Interest", value: stats.interested, color: "text-amber-500", icon: Zap },
              { label: "Applied", value: stats.applied, color: "text-[#2DD4A7]", icon: MousePointer2 },
            ].map((f, i) => (
              <div key={i} className="text-center group">
                <div className="text-2xl font-black text-[#0F172A] mb-1 group-hover:scale-110 transition-transform">{f.value}</div>
                <div className={`text-[9px] font-black uppercase tracking-widest ${f.color}`}>{f.label}</div>
              </div>
            ))}
          </div>

          <div className="h-2 w-full bg-slate-50 rounded-full flex overflow-hidden">
             <div style={{ width: `${(stats.interested / stats.total) * 100}%` }} className="bg-amber-400 h-full"></div>
             <div style={{ width: `${(stats.applied / stats.total) * 100}%` }} className="bg-[#2DD4A7] h-full"></div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 text-center italic">Conversion Rate: {((stats.applied / stats.total) * 100).toFixed(1)}%</p>
        </Card>

        {/* Source Intelligence */}
        <Card className="p-6 rounded-[32px] border-slate-100 relative overflow-hidden">
           <h3 className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest mb-6 flex items-center gap-2">
             <PieChartIcon size={14} className="text-indigo-500" /> Source Reach
           </h3>
           <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={stats.sourceData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                   {stats.sourceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={["#2DD4A7", "#0F172A", "#6366f1", "#f59e0b"][index % 4]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
              <span>Verified Leads</span>
              <span className="text-[#0F172A]">{stats.total} Total</span>
           </div>
        </Card>

        {/* Industry Trends */}
        <Card className="p-6 rounded-[32px] border-slate-100">
           <h3 className="text-[11px] font-black text-[#0F172A] uppercase tracking-widest mb-6 flex items-center gap-2">
             <BarChart3 size={14} className="text-rose-500" /> Top Domains
           </h3>
           <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.domainData}>
                   <XAxis dataKey="name" hide />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                   <Bar dataKey="value" fill="#2DD4A7" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
           </div>
           <p className="text-[9px] font-bold text-slate-400 mt-2 text-center uppercase tracking-widest">Growth by Industry</p>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sidebar --- */}
        <div className="w-full lg:w-72 shrink-0 space-y-6">
          <Card className="p-6 rounded-[32px] border-slate-100 sticky top-24">
            <div className="space-y-8">
              <div>
                <h3 className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Search size={14} /> Filter Leads
                </h3>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search roles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:bg-white focus:border-[#2DD4A7] transition-all"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[11px] font-black text-[#0F172A] uppercase tracking-[0.2em] mb-4">Verticals</h3>
                <div className="flex flex-col gap-1.5">
                  {DOMAINS.map(domain => (
                    <button key={domain} onClick={() => setSelectedDomain(domain)} className={`text-left px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all ${selectedDomain === domain ? "bg-[#0F172A] text-white shadow-xl" : "text-slate-500 hover:bg-slate-50"}`}>
                      {domain}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                 <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hot Leads</p>
                    <span className="text-[11px] font-black text-emerald-500 italic">NEW</span>
                 </div>
                 <p className="text-[13px] font-black text-[#0F172A] uppercase italic leading-tight">Software Engineer <br/> at Netflix</p>
                 <button className="mt-3 text-[10px] font-black text-[#2DD4A7] uppercase tracking-widest hover:underline">View Lead Details</button>
              </div>
            </div>
          </Card>
        </div>

        {/* --- Main Feed --- */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-4">
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Verified Job Discovery</p>
             <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-400">Sort:</span>
               <select className="bg-transparent text-[10px] font-black text-[#0F172A] uppercase tracking-widest outline-none cursor-pointer">
                 <option>Newest First</option>
                 <option>Match Score</option>
               </select>
             </div>
          </div>

          <AnimatePresence mode="popLayout">
            <div className={viewMode === "grid" ? "grid grid-cols-1 xl:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
              {filteredJobs.map((job, index) => {
                const matchScore = Math.floor(Math.random() * (99 - 85 + 1)) + 85; // Mock AI match score
                return (
                <motion.div 
                  key={job.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                >
                  <Card 
                    className={`p-0 overflow-hidden border-slate-200/60 group hover:shadow-[0_30px_70px_-15px_rgba(15,23,42,0.12)] transition-all duration-500 relative bg-white/70 backdrop-blur-xl ${job.isHot ? "ring-1 ring-[#2DD4A7]/30" : ""}`}
                    style={{ borderRadius: 32 }}
                  >
                    {/* Hot Lead Ribbon */}
                    {job.isHot && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-[#2DD4A7] text-[#0F172A] text-[9px] font-black uppercase tracking-[0.2em] px-6 py-1.5 rotate-45 translate-x-6 translate-y-2 shadow-lg">
                          Hot
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      {/* Top Row: Logo + Score */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex gap-5">
                          <div className="w-18 h-18 bg-slate-50 border border-slate-100 rounded-[28px] flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-inner overflow-hidden">
                             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white to-slate-100 group-hover:from-[#0F172A] group-hover:to-[#1E293B] transition-colors duration-500">
                               <Building2 size={32} className={`${job.isHot ? "text-[#2DD4A7]" : "text-slate-400"} group-hover:text-white transition-colors duration-500`} />
                             </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                               <h3 className="text-xl font-black text-[#0F172A] tracking-tight group-hover:text-[#2DD4A7] transition-colors duration-300">
                                 {job.job_title}
                               </h3>
                            </div>
                            <div className="flex items-center gap-3">
                               <p className="text-[14px] font-bold text-[#0F172A]/70 uppercase tracking-tight">{job.company}</p>
                               <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                               <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                 <MapPin size={12} className="text-rose-500" /> {job.location}
                               </div>
                            </div>
                          </div>
                        </div>

                        {/* Match Score Indicator */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                              <circle cx="28" cy="28" r="24" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                              <circle 
                                cx="28" cy="28" r="24" fill="none" stroke={job.isHot ? "#2DD4A7" : "#6366F1"} 
                                strokeWidth="4" strokeDasharray="150" strokeDashoffset={150 - (matchScore / 100) * 150}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-[12px] font-black text-[#0F172A]">{matchScore}%</span>
                          </div>
                          <span className="text-[8px] font-black uppercase text-slate-400 mt-1 tracking-widest">Match</span>
                        </div>
                      </div>

                      {/* Middle Row: Meta Data */}
                      <div className="flex items-center flex-wrap gap-3 mb-10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0F172A]/5 border border-slate-200/50 rounded-2xl text-[10px] font-black text-[#0F172A] uppercase tracking-widest">
                           <Globe size={13} className="text-indigo-500" /> {job.domain}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                          <DollarSign size={13} className="text-emerald-500" /> {job.salary}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest ml-auto">
                          <Clock size={13} /> {new Date(job.posted_at).toLocaleDateString("en-GB", { day: '2-digit', month: 'short' })}
                        </div>
                      </div>

                      {/* Bottom Row: Actions */}
                      <div className="flex items-center gap-4 pt-8 border-t border-dashed border-slate-100">
                        <a 
                          href={job.apply_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-[3] py-4.5 bg-[#0F172A] text-white rounded-[24px] text-[12px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:bg-[#2DD4A7] hover:text-[#0F172A] hover:shadow-[0_20px_40px_-10px_rgba(45,212,167,0.4)] transition-all duration-300 group shadow-2xl shadow-slate-200"
                        >
                          Unlock Secure Link <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </a>
                        
                        <div className="flex items-center gap-2 flex-1">
                          <button className="flex-1 p-4.5 bg-white border border-slate-200 text-slate-400 rounded-[24px] hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] transition-all duration-300 flex items-center justify-center">
                            <Bookmark size={20} />
                          </button>
                          <button className="flex-1 p-4.5 bg-white border border-slate-200 text-slate-400 rounded-[24px] hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all duration-300 flex items-center justify-center">
                            <EyeOff size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- Premium Conversion Section --- */}
      <div className="mt-16 relative overflow-hidden rounded-[48px] bg-[#0F172A] p-12 md:p-16 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)]">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#2DD4A7]/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyREQ0QTciIG9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-14">
          {/* Left: Headline + Features */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2DD4A7]/15 border border-[#2DD4A7]/30 rounded-full text-[#2DD4A7] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={12} /> Limited Offer — 30% Off This Month
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-4">
              Stop Searching.<br/>
              <span className="text-[#2DD4A7] italic">Start Interviewing.</span>
            </h2>
            <p className="text-slate-400 font-medium text-base leading-relaxed max-w-xl mb-8">
              Nexvelt Pro goes beyond links. Our dedicated team and AI engine handle applications for you — and we don&apos;t stop until you&apos;re hired.
            </p>

            {/* Feature checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[
                "Unlimited daily job links",
                "AI writes & submits applications",
                "Direct hiring manager outreach",
                "Interview coaching & prep",
                "100% placement guarantee",
                "Dedicated account manager",
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#2DD4A7]/20 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 size={12} className="text-[#2DD4A7]" />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-300">{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-12 py-5 bg-[#2DD4A7] text-[#0F172A] rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] hover:scale-105 hover:shadow-[0_0_40px_rgba(45,212,167,0.4)] transition-all shadow-xl">
                Unlock Pro Access →
              </button>
              <button className="text-slate-400 text-[12px] font-bold hover:text-white transition-colors underline underline-offset-4">
                View full pricing
              </button>
            </div>
          </div>

          {/* Right: Stats proof */}
          <div className="w-full lg:w-80 shrink-0 grid grid-cols-2 gap-4">
            {[
              { value: "94%", label: "Placement Rate", sub: "vs 12% industry avg" },
              { value: "18d", label: "Avg. Time to Hire", sub: "from account creation" },
              { value: "2,400+", label: "Users Placed", sub: "in the last 12 months" },
              { value: "$128k", label: "Avg. Salary Won", sub: "across all placed users" },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[24px] p-5 text-center hover:bg-white/10 transition-all">
                <div className="text-2xl font-black text-white mb-1">{s.value}</div>
                <div className="text-[10px] font-black text-[#2DD4A7] uppercase tracking-widest mb-1">{s.label}</div>
                <div className="text-[9px] font-medium text-slate-500 leading-tight">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
