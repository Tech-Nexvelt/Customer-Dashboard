"use client";

import React, { useState } from "react";
import { Check, X, Download } from "lucide-react";
import Card from "@/components/ui/Card";
import C from "@/constants/colors";

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false);

  const billingPrice = (price: number, id: string) => {
    if (price === 0) return 0;
    if (!isYearly) return price;
    if (id === "pro") return 119; // $1430 / 12 ≈ 119
    if (id === "premium") return 199; // $2390 / 12 ≈ 199
    return Math.round(price * 0.8);
  };

  const plans = [
    {
      id: "free",
      name: "FREE",
      price: 0,
      description: "Self-serve trial — feel the value before you commit.",
      color: C.teal,
      features: [
        "20 job applications / month",
        "12 ATS resume versions",
      ],
      missing: [
        "Custom cover letters",
        "Profile optimization",
        "Mock interviews",
        "OA support",
        "Mentorship",
      ],
    },
    {
      id: "pro",
      name: "PRO",
      price: 149,
      description: "Done-for-you applications with full profile optimization.",
      color: C.teal,
      active: true,
      features: [
        "100 applications / month (done for you)",
        "25–30 ATS resume versions",
        "Tailored cover letters per role",
        "LinkedIn + GitHub optimization",
        "Application tracking dashboard",
        "10 mock interview sessions",
        "Priority support",
      ],
      missing: [
        "OA support",
        "Mentorship",
        "Placement guarantee",
      ],
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: 249,
      description: "White-glove service — from application to offer letter.",
      color: "#7C6FE0",
      features: [
        "Unlimited applications / month",
        "Unlimited resume versions",
        "Tailored cover letters per role",
        "Full profile suite (LinkedIn, GitHub, Portfolio)",
        "Unlimited mock interviews",
        "Online assessment (OA) support ",
        "1-on-1 mentorship sessions ",
        "Dedicated human advisor",
        "Internship access",
        "Placement guarantee",
      ],
      missing: [],
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>My Plan</h1>
        <p style={{ color: C.muted, marginTop: 4 }}>
          You are on the <strong>Pro Plan</strong>. Upgrade anytime.
        </p>
      </div>

      {/* Active plan banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.sidebar}, #1a3a6b)`,
          borderRadius: 16,
          padding: "20px 22px",
          marginBottom: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.08em" }}>CURRENT PLAN</p>
          <h2 style={{ color: "white", fontSize: 20, fontWeight: 800, marginTop: 4 }}>Pro Plan — ${isYearly ? "1,430/yr" : "149/mo"}</h2>
          <p style={{ color: C.teal, fontSize: 13, marginTop: 4 }}>45 days remaining · Renews Apr 30, 2026</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              background: C.teal,
              border: "none",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* Billing toggle to match dashboard style */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <div style={{ background: C.white, padding: 4, borderRadius: 12, border: `1px solid ${C.border}`, display: "flex", gap: 4 }}>
          <button
            onClick={() => setIsYearly(false)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: !isYearly ? C.teal : "transparent",
              color: !isYearly ? "white" : C.muted,
              border: "none",
              cursor: "pointer",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              background: isYearly ? C.teal : "transparent",
              color: isYearly ? "white" : C.muted,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            Yearly
            <span style={{ background: "#DCFCE7", color: C.success, fontSize: 9, padding: "2px 6px", borderRadius: 999 }}>Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plan cards - Restored to original UI structure */}
      <div className="plan-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: 20,
        marginBottom: 28 
      }}>
        {plans.map((p) => (
          <div
            key={p.id}
            style={{
              background: C.white,
              borderRadius: 16,
              padding: 22,
              border: p.active ? `2px solid ${p.color}` : `1px solid ${C.border}`,
              boxShadow: p.active
                ? `0 10px 30px -10px ${p.color}33`
                : "0 1px 3px rgba(0,0,0,0.06)",
              position: "relative",
            }}
          >
            {p.active && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: p.color,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 12px",
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                CURRENT PLAN
              </div>
            )}
            <h3 style={{ fontWeight: 800, fontSize: 18, color: C.text }}>{p.name}</h3>
            <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 12px" }}>{p.description}</p>
            <div style={{ margin: "8px 0 16px" }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: C.text }}>${billingPrice(p.price, p.id)}</span>
              <span style={{ color: C.muted, fontSize: 13 }}>/{isYearly ? "mo" : "mo"}</span>
              {isYearly && p.price > 0 && (
                <p style={{ fontSize: 11, color: C.success, fontWeight: 600, marginTop: 2 }}>
                  ${p.id === "pro" ? "1,430" : "2,390"} billed annually
                </p>
              )}
            </div>

            <div style={{ marginBottom: 16, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, marginBottom: 12, letterSpacing: "0.05em" }}>
                {p.id === "premium" ? "EVERYTHING IN PRO, PLUS" : "WHAT'S INCLUDED"}
              </p>
              {p.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 7 }}>
                  <Check size={14} color={p.color} strokeWidth={3} style={{ marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: C.text }}>{f}</span>
                </div>
              ))}
              {p.missing.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 7, opacity: 0.4 }}>
                  <X size={14} color={C.muted} style={{ marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: C.muted }}>{f}</span>
                </div>
              ))}
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                marginTop: "auto",
                background: p.active ? p.color : "transparent",
                border: `1.5px solid ${p.color}`,
                color: p.active ? "white" : p.color,
                fontSize: 13,
                fontWeight: 700,
                cursor: p.active ? "default" : "pointer",
                transition: "all 0.2s"
              }}
            >
              {p.active ? "Current Plan" : p.id === "premium" ? "Upgrade ↑" : "Select"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment history - Restored original style */}
      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 16 }}>Payment History</h3>
        {([].length === 0) ? (
          <div style={{ padding: "16px 0", textAlign: "center", color: C.muted, fontSize: 14 }}>
            No payment history available.
          </div>
        ) : (
          [].map((p: any, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{p.plan}</p>
                <p style={{ fontSize: 12, color: C.muted }}>{p.date}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontWeight: 700, color: C.text }}>{p.amount}</span>
                <span
                  style={{
                    background: "#F0FDF4",
                    color: C.success,
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "2px 10px",
                    borderRadius: 999,
                  }}
                >
                  Paid
                </span>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
                  <Download size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
