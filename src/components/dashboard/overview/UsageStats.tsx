"use client";
import React from "react";
import C from "@/constants/colors";
import { PLAN_LIMITS, PlanType } from "@/constants/planLimits";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface UsageStatsProps {
  planType: PlanType;
  appsUsed: number;
  resumesUsed: number;
}

export default function UsageStats({ planType, appsUsed, resumesUsed }: UsageStatsProps) {
  const limits = PLAN_LIMITS[planType];

  const metrics = [
    {
      label: "Job Applications",
      used: appsUsed,
      max: limits.maxApplications,
      color: C.teal,
    },
    {
      label: "ATS Resumes",
      used: resumesUsed,
      max: limits.maxResumes,
      color: "#8B5CF6",
    }
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "24px",
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Plan Usage</h3>
        <Link 
          href="/dashboard/plans"
          style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: C.teal, 
            display: "flex", 
            alignItems: "center", 
            gap: 4,
            textDecoration: "none"
          }}
        >
          Upgrade <ArrowUpRight size={14} />
        </Link>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {metrics.map((m, i) => {
          const percent = Math.min((m.used / m.max) * 100, 100);
          const isUnlimited = m.max >= 9999;

          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>
                  {isUnlimited ? "Unlimited" : `${m.used} / ${m.max}`}
                </span>
              </div>
              <div style={{ height: 8, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                <div
                  style={{
                    width: isUnlimited ? "100%" : `${percent}%`,
                    height: "100%",
                    background: m.color,
                    borderRadius: 99,
                    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div 
        style={{ 
          marginTop: 20, 
          padding: "10px 14px", 
          background: "#F8FAFC", 
          borderRadius: 12, 
          fontSize: 12, 
          color: C.muted,
          fontWeight: 500
        }}
      >
        Your {planType.toUpperCase()} plan resets in <span style={{ color: C.text, fontWeight: 700 }}>12 days</span>.
      </div>
    </div>
  );
}
