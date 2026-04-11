"use client";
import React from "react";
import C from "@/constants/colors";
import { EventData } from "@/types/dashboard";

export default function EventCard({ title, day, month, tag, tagType = "private", barColor, daysLeft, barPercent }: EventData) {
  const tagStyle = tagType === "public"
    ? { color: "#8B5CF6", fontWeight: 600 }
    : { color: "#9CA3AF", fontWeight: 500 };

  return (
    <div
      className="hover-card"
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid #EBEBEB",
        padding: "14px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${barColor}`,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{title}</span>
        </div>
        <span style={{ fontSize: 11, ...tagStyle }}>{tag}</span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>{day}</span>
        <span style={{ fontSize: 13, color: C.muted }}>{month}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted }}>Days remaining</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{daysLeft} Days</span>
      </div>

      <div style={{ height: 5, background: "#F0F0EC", borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            width: `${barPercent}%`,
            height: "100%",
            background: barColor,
            borderRadius: 99,
          }}
        />
      </div>
    </div>
  );
}
