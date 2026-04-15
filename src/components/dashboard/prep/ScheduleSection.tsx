"use client";
import React from "react";
import CalendarGrid from "./CalendarGrid";
import EventCard from "./EventCard";
import { EventData } from "@/types/dashboard";
import C from "@/constants/colors";

const EVENTS: EventData[] = [
  {
    title: "Project Review",
    day: "16",
    month: "April",
    tag: "Internal",
    tagType: "private",
    barColor: C.purple,
    daysLeft: 1,
    barPercent: 80
  },
  {
    title: "Spotify Technical",
    day: "17",
    month: "April",
    tag: "External",
    tagType: "public",
    barColor: C.teal,
    daysLeft: 2,
    barPercent: 40
  }
];

export default function ScheduleSection() {
  return (
    <div className="schedule-grid">
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid #EBEBEB",
          padding: "18px 18px 14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <CalendarGrid />
      </div>

      <div className="event-cards-grid" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {EVENTS.map((e, i) => (
          <EventCard key={i} {...e} />
        ))}
      </div>
    </div>
  );
}
