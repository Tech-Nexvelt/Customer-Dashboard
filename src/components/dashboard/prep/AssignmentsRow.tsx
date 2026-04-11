"use client";
import React from "react";
import { ChevronRight, Bookmark, Circle, Sparkles, PenLine } from "lucide-react";
import C from "@/constants/colors";
import { AssignmentCardData } from "@/types/dashboard";

const ASSIGN_CARDS: AssignmentCardData[] = [
  { count: 0,  label: "Applications", Icon: Bookmark,  iconColor: "#3B82F6", bg: "#EFF6FF", href: "/dashboard/jobs"     },
  { count: 0,  label: "New Alerts",  Icon: Circle,    iconColor: "#F97316", bg: "#FFF7ED", href: "/dashboard/overview" },
  { count: 0, label: "Company News", Icon: Sparkles,  iconColor: "#EAB308", bg: "#FEFCE8", href: "/dashboard/overview" },
  { count: 0,  label: "Interview Prep", Icon: PenLine,   iconColor: "#10B981", bg: "#F0FDF4", href: "/dashboard/prep"     },
];

import { useDashboard } from "@/lib/dashboard/dashboardContext";

export default function AssignmentsRow() {
  const { addTab, switchTab, tabs } = useDashboard();

  const handleNav = (label: string) => {
    const existing = tabs.find(t => t.name === label);
    if (existing) {
      switchTab(existing.id);
    } else {
      addTab(label, "#10B981");
    }
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", marginBottom: 14, letterSpacing: "-0.01em" }}>Assignments</h2>
      <div className="assign-grid">
        {ASSIGN_CARDS.map((c, i) => (
          <div
            key={i}
            className="hover-card"
            onClick={() => handleNav(c.label)}
            style={{
              background: c.bg,
              borderRadius: 20,
              border: "1px solid transparent",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                onClick={() => alert("Pro Account features coming soon!")}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <c.Icon size={18} color={c.iconColor} strokeWidth={2} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#1A1A1A", lineHeight: 1 }}>
                  {c.count}
                </span>
                <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>
                  {c.label}
                </span>
              </div>
            </div>
            <ChevronRight size={18} color="#9CA3AF" />
          </div>
        ))}
      </div>
    </div>
  );
}
