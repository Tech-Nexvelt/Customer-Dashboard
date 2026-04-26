"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw,
  MoreVertical,
  ChevronRight,
  UserPlus
} from "lucide-react";

interface OnboardingSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone_number: string;
  domain: string;
}

const MOCK_SUBMISSIONS: OnboardingSubmission[] = [
  { id: "1", created_at: new Date().toISOString(), name: "John Doe", email: "john@example.com", phone_number: "+1234567890", domain: "software-engineering" },
  { id: "2", created_at: new Date(Date.now() - 86400000).toISOString(), name: "Jane Smith", email: "jane@example.com", phone_number: "+0987654321", domain: "data-analytics" },
];

export default function AdminOnboardingFeed() {
  const [submissions, setSubmissions] = useState<OnboardingSubmission[]>(MOCK_SUBMISSIONS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorized, setAuthorized] = useState<boolean>(true);

  const fetchSubmissions = async () => {
    setLoading(true);
    // Mock fetch
    setTimeout(() => {
      setSubmissions(MOCK_SUBMISSIONS);
      setLoading(false);
    }, 500);
  };

  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight uppercase italic flex items-center gap-3">
            <Users size={32} className="text-[#2DD4A7]" />
            Onboarding Feed
          </h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage new client requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchSubmissions}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#2DD4A7] hover:border-[#2DD4A7] transition-all"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5 w-64 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Requests", val: submissions.length, icon: <Users />, color: "#2DD4A7" },
          { label: "New Today", val: submissions.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length, icon: <Calendar />, color: "#0F172A" },
          { label: "In Review", val: submissions.length, icon: <Filter />, color: "#94A3B8" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
              <div className="text-2xl font-black text-[#0F172A]">{stat.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-bottom border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Received</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client Info</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Domain</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-6"><div className="h-12 bg-slate-50 rounded-2xl w-full"></div></td>
                  </tr>
                ))
              ) : filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#0F172A]">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {new Date(sub.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-black text-xs">
                          {sub.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0F172A]">{sub.name}</span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                              <Mail size={12} /> {sub.email}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                              <Phone size={12} /> {sub.phone_number}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-[#0F172A] text-[10px] font-black uppercase tracking-widest">
                        <Globe size={12} className="text-slate-400" />
                        {sub.domain.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#2DD4A7]/10 hover:text-[#2DD4A7] text-slate-400 rounded-lg transition-colors group/btn relative">
                          <UserPlus size={18} />
                          <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-[#0F172A] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity">Create User</span>
                        </button>
                        <button className="p-2 hover:bg-slate-200 text-slate-400 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-400">
                      <Users size={48} className="opacity-20" />
                      <p className="text-sm font-medium">No onboarding submissions found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
