"use client";
import React from "react";
import C from "@/constants/colors";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarCell {
  d: number;
  dim?: boolean;
  dot?: string[];
  today?: boolean;
}

const WEEKS: CalendarCell[][] = [
  [  { d: 27, dim: true }, { d: 28, dim: true }, { d: 29, dim: true }, { d: 30, dim: true }, { d: 31, dim: true }, { d: 1  }, { d: 2  }             ],
  [  { d: 3  }, { d: 4  }, { d: 5, dot: ["#3B82F6"] }, { d: 6  }, { d: 7  }, { d: 8  }, { d: 9, dot: ["#10B981"] }       ],
  [  { d: 10 }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14, dot: ["#EF4444"] }, { d: 15 }, { d: 16 }                        ],
  [  { d: 17 }, { d: 18 }, { d: 19 }, { d: 20, today: true }, { d: 21 }, { d: 22, dot: ["#8B5CF6"] }, { d: 23 }           ],
  [  { d: 24 }, { d: 25 }, { d: 26, dot: ["#3B82F6", "#EF4444"] }, { d: 27 }, { d: 28 }, { d: 1, dim: true }, { d: 2, dim: true } ],
];

export default function CalendarGrid() {
  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>Schedule</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: C.muted }}>
            {d}
          </div>
        ))}
      </div>

      {WEEKS.map((week, wi) => (
        <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 2 }}>
          {week.map((cell, di) => (
            <div key={di} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                className={`cal-day${cell.today ? " today" : ""}${cell.dim ? " dim" : ""}`}
                style={{ fontSize: 13, fontWeight: cell.today ? 700 : 400 }}
              >
                {cell.d}
              </div>
              <div style={{ display: "flex", gap: 2, marginTop: 2, minHeight: 5 }}>
                {(cell.dot || []).map((color, i) => (
                  <div
                    key={i}
                    style={{ width: 4, height: 4, borderRadius: "50%", background: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
