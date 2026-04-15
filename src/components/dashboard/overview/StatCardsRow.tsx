"use client";
import React from "react";
import { StatCardData } from "@/types/dashboard";
import { useDashboard } from "@/lib/dashboard/dashboardContext";

const CARDS: StatCardData[] = [
  {
    emoji: "💼",
    iconBg: "rgba(59, 130, 246, 0.1)",
    title: "Job Applications",
    manage: "Track all",
    label: "Total Sent",
    value: "0",
    barColor: "#3B82F6",
    barPercent: 0,
    href: "/dashboard/jobs",
  },
  {
    emoji: "🗓️",
    iconBg: "rgba(16, 185, 129, 0.1)",
    title: "Interviews",
    manage: "Schedule",
    label: "Upcoming",
    value: "0",
    barColor: "#10B981",
    barPercent: 0,
    href: "/dashboard/prep",
  },
  {
    emoji: "✨",
    iconBg: "rgba(139, 92, 246, 0.1)",
    title: "Profile Strength",
    manage: "Optimize",
    label: "Completeness",
    value: "15%",
    barColor: "#8B5CF6",
    barPercent: 15,
    href: "/dashboard/resume",
  },
];

export default function StatCardsRow() {
  const { addTab, switchTab, tabs, totalJobCount } = useDashboard();

  const handleNav = (label: string, href: string) => {
    const existing = tabs.find(t => t.href === href);
    if (existing) {
      switchTab(existing.id);
    } else {
      addTab(label, href, "#2DD4A7");
    }
  };

  const CARDS = [
    {
      emoji: "📂",
      iconBg: "rgba(45, 212, 167, 0.1)",
      title: "Job Links",
      manage: "View all",
      label: "Found Leads",
      value: totalJobCount.toString(),
      barColor: "#2DD4A7",
      barPercent: Math.min((totalJobCount / 100) * 100, 100),
      href: "/dashboard/jobs",
    },
    {
      emoji: "💼",
      iconBg: "rgba(59, 130, 246, 0.1)",
      title: "Job Applications",
      manage: "Track all",
      label: "Total Sent",
      value: "0",
      barColor: "#3B82F6",
      barPercent: 0,
      href: "/dashboard/jobs",
    },
    {
      emoji: "🗓️",
      iconBg: "rgba(245, 158, 11, 0.1)",
      title: "Interviews",
      manage: "Schedule",
      label: "Upcoming",
      value: "0",
      barColor: "#F59E0B",
      barPercent: 0,
      href: "/dashboard/prep",
    },
    {
      emoji: "✨",
      iconBg: "rgba(139, 92, 246, 0.1)",
      title: "Profile Strength",
      manage: "Optimize",
      label: "Completeness",
      value: "15%",
      barColor: "#8B5CF6",
      barPercent: 15,
      href: "/dashboard/resume",
    },
  ];

  return (
    <div className="stat-grid" style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: 20, 
      marginBottom: 26 
    }}>
      {CARDS.map((c, i) => (
        <div 
          key={i} 
          className="hover-card" 
          style={{ 
            background: "white", 
            borderRadius: 22, 
            padding: "20px 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            border: "1px solid #EBEBEB",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div 
                style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: 10, 
                  background: c.iconBg, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: 16 
                }}
              >
                {c.emoji}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{c.title}</span>
            </div>
            <span 
              onClick={() => handleNav(c.title, c.href)} 
              style={{ fontSize: 11, color: "#94A3B8", cursor: "pointer", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              {c.manage}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>{c.label}</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>{c.value}</span>
          </div>

          <div style={{ width: "100%", height: 6, background: "#F1F5F9", borderRadius: 10, overflow: "hidden" }}>
            <div 
              style={{ 
                width: `${c.barPercent}%`, 
                height: "100%", 
                background: c.barColor, 
                borderRadius: 10,
                transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" 
              }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
