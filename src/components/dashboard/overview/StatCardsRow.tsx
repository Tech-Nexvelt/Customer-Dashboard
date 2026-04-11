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
  const { addTab, switchTab, tabs } = useDashboard();

  const handleNav = (label: string, href: string) => {
    const existing = tabs.find(t => t.href === href);
    if (existing) {
      switchTab(existing.id);
    } else {
      addTab(label, href, "#10B981");
    }
  };

  return (
    <div className="stat-grid" style={{ marginBottom: 20 }}>
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
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A" }}>{c.title}</span>
            </div>
            <span 
              onClick={() => handleNav(c.title, c.href)} 
              style={{ fontSize: 12, color: "#9CA3AF", cursor: "pointer", fontWeight: 500 }}
            >
              {c.manage}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>{c.label}</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#1A1A1A" }}>{c.value}</span>
          </div>

          <div style={{ width: "100%", height: 6, background: "#F0F0EC", borderRadius: 10, overflow: "hidden" }}>
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
