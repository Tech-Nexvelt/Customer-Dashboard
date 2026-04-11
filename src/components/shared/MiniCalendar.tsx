"use client";
import { useState } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Days with events (in current month) — customize per user
const EVENT_DAYS = [14, 18, 22, 25];

export default function MiniCalendar() {
  const today = new Date();
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const totalDays = new Date(view.year, view.month + 1, 0).getDate();
  const firstDay = new Date(view.year, view.month, 1).getDay();

  // Build cells array: nulls for empty leading cells, then 1..totalDays
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const prevMonth = () =>
    setView((v) =>
      v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }
    );

  const nextMonth = () =>
    setView((v) =>
      v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }
    );

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {["‹", "›"].map((arrow, i) => (
            <button
              key={arrow}
              onClick={i === 0 ? prevMonth : nextMonth}
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                border: "1px solid #E5E7EB",
                background: "white",
                cursor: "pointer",
                fontSize: 14,
                color: "#6B7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {arrow}
            </button>
          ))}
        </div>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 6 }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: "#9CA3AF", padding: "2px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((day, i) => {
          const isToday =
            day === today.getDate() &&
            view.month === today.getMonth() &&
            view.year === today.getFullYear();
          const hasEvent = day && EVENT_DAYS.includes(day);

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "5px 2px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: isToday ? 700 : 400,
                background: isToday ? "#00C896" : hasEvent ? "#EFF6FF" : "transparent",
                color: isToday ? "white" : hasEvent ? "#3B82F6" : day ? "#111827" : "transparent",
                cursor: day ? "pointer" : "default",
                position: "relative",
              }}
            >
              {day || ""}
              {hasEvent && !isToday && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#3B82F6",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
