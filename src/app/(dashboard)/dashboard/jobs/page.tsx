"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, ExternalLink, MoreVertical, Briefcase } from "lucide-react";
import WeeklyBarChart from "@/components/shared/WeeklyBarChart";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import C from "@/constants/colors";
import { supabase } from "@/lib/supabaseClient";
import { useDashboard } from "@/lib/dashboard/dashboardContext";
import { PLAN_LIMITS, PlanType } from "@/constants/planLimits";
import UsageStats from "@/components/dashboard/overview/UsageStats";

export default function JobsPage() {
  const currentPlan: PlanType = 'basic';
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'today', 'yesterday'
  
  const { totalJobCount } = useDashboard();

  useEffect(() => {
    fetchJobs();
  }, [totalJobCount]);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic update
    setJobs(prev => prev.map(job => job.id === id ? { ...job, status: newStatus } : job));
    
    const { error } = await supabase
      .from("jobs")
      .update({ status: newStatus })
      .eq("id", id);
    
    if (error) {
      fetchJobs(); // Refresh if error
    }
  };

  const getSmartDate = (isoStr: string) => {
    if (!isoStr) return "Just now";
    const date = new Date(isoStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const jobDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 3600 * 24));

    const matchesDate = 
      dateFilter === "all" || 
      (dateFilter === "today" && diffDays === 0) ||
      (dateFilter === "yesterday" && diffDays === 1);

    const matchesSearch = 
      job.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = selectedDomain === "All Domains" || job.domain === selectedDomain;
    const matchesSource = selectedSource === "All Sources" || job.source === selectedSource;
    
    return matchesDate && matchesSearch && matchesDomain && matchesSource;
  });

  // Pagination Logic (using filtered results)
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate Daily Stats from LIVE data
  const calculateDailyStats = () => {
    const DAYS_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    
    // Create last 7 days buckets
    const stats = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      return {
        label: DAYS_NAMES[d.getDay()],
        found: 0,
        applied: 0,
        dateKey: d.toDateString() // Helper for matching
      };
    });

    jobs.forEach(job => {
      const jobDate = new Date(job.created_at);
      const jobDateStr = jobDate.toDateString();
      
      const dayIndex = stats.findIndex(s => s.dateKey === jobDateStr);
      if (dayIndex !== -1) {
        stats[dayIndex].found++;
        if (job.status === "completed") stats[dayIndex].applied++;
      }
    });

    // Remap for chart
    return stats.map(s => ({ week: s.label, found: s.found, applied: s.applied }));
  };

  const dayStats = calculateDailyStats();
  const completedJobsCount = jobs.filter(j => j.status === 'completed').length;

  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Job Tracker</h1>
        <p style={{ color: C.muted, marginTop: 4 }}>Manage and track job links discovered by Nexvelt AI.</p>
      </div>
      <div className="two-col" style={{ marginBottom: 20, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Statistics Chart */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Discovery Activity</h3>
              <p style={{ color: C.muted, fontSize: 13 }}>Daily job links found</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{filteredJobs.length}</div>
              <div style={{ color: C.teal, fontSize: 12, fontWeight: 600 }}>Results</div>
            </div>
          </div>
          <WeeklyBarChart data={dayStats} />
        </Card>

        {/* Plan Usage */}
        <UsageStats planType="basic" appsUsed={completedJobsCount} resumesUsed={0} />
      </div>

        {/* Filters and search box */}
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Search & Filters</h3>
            <div style={{ display: "flex", background: C.light, padding: 3, borderRadius: 10, gap: 2 }}>
              {["all", "today", "yesterday"].map((d) => (
                <button
                  key={d}
                  onClick={() => { setDateFilter(d); setCurrentPage(1); }}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "capitalize",
                    background: dateFilter === d ? "white" : "transparent",
                    color: dateFilter === d ? C.teal : C.muted,
                    border: "none",
                    boxShadow: dateFilter === d ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              background: C.light,
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <Search size={16} color={C.muted} />
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search roles or companies..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, display: "block" }}>DOMAIN</label>
              <select 
                value={selectedDomain}
                onChange={(e) => { setSelectedDomain(e.target.value); setCurrentPage(1); }}
                style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}
              >
                <option>All Domains</option>
                <option>Data</option>
                <option>Software</option>
                <option>Business</option>
                <option>Healthcare</option>
                <option>Engineering</option>
                <option>Security</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, display: "block" }}>SOURCE</label>
              <select 
                value={selectedSource}
                onChange={(e) => { setSelectedSource(e.target.value); setCurrentPage(1); }}
                style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}
              >
                <option>All Sources</option>
                <option value="linkedin">LinkedIn</option>
                <option value="dice">Dice</option>
                <option value="company_career_page">Company Career Page</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => { setSearchQuery(""); setSelectedDomain("All Domains"); setSelectedSource("All Sources"); setCurrentPage(1); }}
            style={{
              marginTop: "auto",
              padding: "10px",
              borderRadius: 10,
              background: "#F1F5F9",
              color: "#475569",
              border: "none",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            Reset All Filters
          </button>
        </Card>

      {/* Applications list */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}>COMPANY</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}>JOB TITLE</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}>STATUS</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}>DATE FOUND</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}>SOURCE</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "#64748B" }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                  <td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>
                    Loading job leads from Supabase...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>
                    No job links found yet. Run the Nexvelt scraper to begin.
                  </td>
                </tr>
              ) : (
                paginatedJobs.map((job: any) => (
                  <tr
                    key={job.id}
                    style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.light)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "#F1F5F9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 12,
                            color: "#64748B",
                          }}
                        >
                          {job.company?.[0] || "J"}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>{job.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                       <div>
                         <p style={{ fontWeight: 600, fontSize: 14, color: "#0F172A" }}>{job.job_title}</p>
                         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                           <span style={{ fontSize: 12, color: "#64748B" }}>{job.location}</span>
                           <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#CBD5E1" }} />
                           <span style={{ fontSize: 11, fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>{job.domain}</span>
                         </div>
                       </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <select
                        value={job.status || "discover"}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          const limit = PLAN_LIMITS[currentPlan].maxApplications;
                          if (newStatus === "completed" && completedJobsCount >= limit && job.status !== "completed") {
                            alert(`You have reached your limit of ${limit} applications for the Basic plan. Upgrade to Pro for 100+ applications!`);
                            return;
                          }
                          updateStatus(job.id, newStatus);
                        }}
                        style={{
                          background: job.status === "completed" ? "#ECFDF5" : job.status === "started" ? "#FFFBEB" : "#F8FAFC",
                          color: job.status === "completed" ? "#10B981" : job.status === "started" ? "#D97706" : "#64748B",
                          padding: "4px 8px",
                          borderRadius: 99,
                          fontSize: 11,
                          fontWeight: 800,
                          border: job.status === "completed" ? "1px solid #10B98133" : job.status === "started" ? "1px solid #D9770633" : "1px solid #E2E8F0",
                          cursor: "pointer",
                          outline: "none",
                          appearance: "none",
                          textAlign: "center",
                          minWidth: 80
                        }}
                      >
                        <option value="discover">Apply</option>
                        <option value="started">Started</option>
                        <option value="completed" disabled={completedJobsCount >= PLAN_LIMITS[currentPlan].maxApplications && job.status !== "completed"}>
                          Completed {completedJobsCount >= PLAN_LIMITS[currentPlan].maxApplications && job.status !== "completed" ? "🔒" : ""}
                        </option>
                      </select>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                      {getSmartDate(job.created_at)}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: job.source === "linkedin" ? "#0077b5" : job.source === "dice" ? "#e51937" : "#64748B",
                          background: (job.source === "linkedin" ? "#0077b5" : job.source === "dice" ? "#e51937" : "#64748B") + "18",
                          padding: "2px 8px",
                          borderRadius: 6,
                          textTransform: "capitalize"
                        }}
                      >
                        {job.source?.replace("_", " ")}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <a 
                          href={job.apply_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: "#2DD4A7", padding: "6px", background: "white", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex" }}
                        >
                          <ExternalLink size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && jobs.length > 0 && (
          <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: C.muted }}>
              Showing {paginatedJobs.length} of {jobs.length} found leads
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {/* Pagination Logic: Show all pages if totalPages is small, else sliding window */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Show first, last, and 2 around current page
                const isNearCurrent = Math.abs(pageNum - currentPage) <= 2;
                const isEdge = pageNum === 1 || pageNum === totalPages;
                
                if (totalPages > 10 && !isNearCurrent && !isEdge) {
                  if (pageNum === 2 || pageNum === totalPages - 1) return <span key={i} style={{ color: C.muted, alignSelf: "center" }}>...</span>;
                  return null;
                }

                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      border: `1px solid ${currentPage === pageNum ? C.teal : C.border}`,
                      background: currentPage === pageNum ? C.teal : "white",
                      color: currentPage === pageNum ? "white" : "#64748B",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
