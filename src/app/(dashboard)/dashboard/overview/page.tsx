"use client";
import React from "react";
import { supabase } from "@/lib/supabaseClient";
import C from "@/constants/colors";
import StatCardsRow from "@/components/dashboard/overview/StatCardsRow";
import AssignmentsRow from "@/components/dashboard/prep/AssignmentsRow";
import { useUser } from "@/features/auth/hooks/useUser";

export default function OverviewPage() {
  const { user } = useUser();
  const userName = user?.name || "User";

  return (
    <div>
      {/* ── Greeting ── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1A1A1A", letterSpacing: "-0.03em" }}>
          Good Morning, {userName}{" "}
          <span style={{ fontSize: 28 }}>👋</span>
        </h1>
        <p style={{ color: "#9CA3AF", fontSize: 14, marginTop: 8, fontWeight: 500 }}>
          Here's a look at your career performance and analytics.
        </p>
      </div>

      {/* ── 3 Stat Cards ── */}
      <StatCardsRow />

      {/* ── Assignments Row ── */}
      <AssignmentsRow />

      {/* ── Schedule + Event Cards (Commented out for now) ── */}
      {/* <ScheduleSection /> */}
    </div>
  );
}
