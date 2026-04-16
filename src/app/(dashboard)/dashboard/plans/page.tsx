"use client";
import React from "react";
import C from "@/constants/colors";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { PLAN_LIMITS, PLAN_PRICES, PlanType } from "@/constants/planLimits";

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');
  // Mock current user plan (will be replaced with real data later)
  const currentPlan: PlanType = 'basic';

  const calculatePrice = (monthlyPrice: number) => {
    if (billingCycle === 'yearly') {
      return Math.floor(monthlyPrice * 0.8); // 20% discount
    }
    return monthlyPrice;
  };

  const plans = [
    {
      type: 'basic' as PlanType,
      name: "Basic",
      price: 0,
      description: "Ideal for beginners starting their job search.",
      features: [
        "20 Job Applications/month",
        "12 ATS Resume Versions",
        "Real-time Job Tracker",
        "Basic Search Filters",
      ],
      icon: <Zap size={24} color="#64748B" />,
      highlight: false,
    },
    {
      type: 'pro' as PlanType,
      name: "Pro",
      price: PLAN_PRICES.pro,
      description: "Done-for-you automation for serious applicants.",
      features: [
        "300 Job Applications (Done-for-you)",
        "30 ATS Resume Versions",
        "Tailored Cover Letters",
        "10 Mock Interview Sessions",
        "Priority Support",
      ],
      icon: <Sparkles size={24} color="#F59E0B" />,
      highlight: true,
      badge: "Most Popular",
    },
    {
      type: 'premium' as PlanType,
      name: "Premium",
      price: PLAN_PRICES.premium,
      description: "The ultimate concierge placement suite.",
      features: [
        "Unlimited Applications",
        "Unlimited Resume Versions",
        "Full Profile Suite (LinkedIn, Portfolio)",
        "Unlimited Mock Interviews",
        "Online Assessment (OA) Support",
        "1-on-1 Mentorship Sessions",
        "Placement Guarantee",
      ],
      icon: <ShieldCheck size={24} color={C.teal} />,
      highlight: false,
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: C.text, letterSpacing: "-0.03em" }}>
          Choose Your Career Velocity
        </h1>
        <p style={{ color: C.muted, fontSize: 16, marginTop: 12, maxWidth: 600, margin: "12px auto" }}>
          Select the perfect plan to accelerate your job search and landing your dream offer with Nexvelt AI.
        </p>

        {/* Billing Switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 40 }}>
          <span style={{ fontSize: 14, fontWeight: billingCycle === 'monthly' ? 700 : 500, color: billingCycle === 'monthly' ? C.text : C.muted }}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            style={{
              width: 50,
              height: 26,
              borderRadius: 99,
              background: C.teal,
              position: "relative",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
          >
            <div 
              style={{ 
                width: 20, 
                height: 20, 
                borderRadius: "50%", 
                background: "white", 
                position: "absolute",
                top: 3,
                left: billingCycle === 'monthly' ? 3 : 27,
                transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
              }}
            />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: billingCycle === 'yearly' ? 700 : 500, color: billingCycle === 'yearly' ? C.text : C.muted }}>Yearly</span>
            <span style={{ 
              background: "#ECFDF5", 
              color: C.teal, 
              padding: "2px 8px", 
              borderRadius: 99, 
              fontSize: 11, 
              fontWeight: 800 
            }}>
              SAVE 20%
            </span>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 30 }}>
        {plans.map((plan) => (
          <div
            key={plan.type}
            style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "40px 32px",
              border: plan.highlight ? `2px solid ${C.teal}` : `1px solid ${C.border}`,
              boxShadow: plan.highlight ? "0 20px 40px rgba(45, 212, 167, 0.1)" : "0 4px 6px rgba(0,0,0,0.02)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {plan.badge && (
              <div
                style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: C.teal,
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {plan.badge}
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: plan.highlight ? "#F0FDFA" : "#F8FAFC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                {plan.icon}
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{plan.name}</h2>
              <p style={{ color: C.muted, fontSize: 14, marginTop: 8 }}>{plan.description}</p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: C.text }}>${calculatePrice(plan.price)}</span>
                <span style={{ color: C.muted, fontSize: 14 }}>/mo</span>
              </div>
              {billingCycle === 'yearly' && plan.price > 0 && (
                <p style={{ color: C.teal, fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                  Billed annually (${calculatePrice(plan.price) * 12}/year)
                </p>
              )}
            </div>

            <div style={{ flex: 1, marginBottom: 40 }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#475569" }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: plan.highlight ? "#ECFDF5" : "#F1F5F9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} color={plan.highlight ? C.teal : "#64748B"} strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: currentPlan === plan.type ? "#F8FAFC" : plan.highlight ? C.teal : "#0F172A",
                color: currentPlan === plan.type ? "#64748B" : "white",
                border: "none",
                pointerEvents: currentPlan === plan.type ? "none" : "auto",
              }}
            >
              {currentPlan === plan.type ? "Current Plan" : (
                <>
                  Get Started <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
