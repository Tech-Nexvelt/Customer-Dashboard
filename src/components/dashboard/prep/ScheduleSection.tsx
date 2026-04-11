"use client";
import React from "react";
import CalendarGrid from "./CalendarGrid";
import EventCard from "./EventCard";
import { EventData } from "@/types/dashboard";

const EVENTS: EventData[] = [];

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

      <div className="event-cards-grid">
        {EVENTS.map((e, i) => (
          <EventCard key={i} {...e} />
        ))}
      </div>
    </div>
  );
}
