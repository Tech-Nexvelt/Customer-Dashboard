"use client";
import { BookOpen, Play, CheckCircle, Clock, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Chip from "@/components/ui/Chip";
import C from "@/constants/colors";

const topics = [
  { name: "Arrays & Hashing", progress: 95, solved: 19, total: 20, difficulty: "Easy/Medium" },
  { name: "Linked Lists", progress: 70, solved: 14, total: 20, difficulty: "Medium" },
  { name: "Trees & Graphs", progress: 45, solved: 9, total: 20, difficulty: "Hard" },
  { name: "Dynamic Programming", progress: 30, solved: 6, total: 20, difficulty: "Hard" },
  { name: "System Design", progress: 15, solved: 3, total: 20, difficulty: "Very Hard" },
];

const sessions = [
  { title: "Behavioral Interview Prep", date: "Today, 4:00 PM", status: "Upcoming", color: C.purple },
  { title: "System Design Deep Dive", date: "Mar 18, 10:00 AM", status: "Upcoming", color: C.blue },
  { title: "Mock Interview - DSA", date: "Mar 15, 2:00 PM", status: "Completed", color: C.teal },
];

export default function PrepPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Interview Prep</h1>
          <p style={{ color: C.muted, marginTop: 4 }}>Sharpen your technical and behavioral skills.</p>
        </div>
        <button
          style={{
            background: C.text,
            color: "white",
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Play size={15} fill="white" /> Start Practice
        </button>
      </div>

      <div className="two-col" style={{ marginBottom: 20 }}>
        {/* Topic Progress */}
        <Card>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>Technical Proficiency</h3>
          {topics.map((t, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{t.name}</span>
                  <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>• {t.difficulty}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                  {t.solved}/{t.total}
                </span>
              </div>
              <ProgressBar value={t.progress} color={t.progress > 80 ? C.teal : t.progress > 40 ? C.blue : C.yellow} height={8} />
            </div>
          ))}
        </Card>

        {/* Practice Sessions */}
        <Card>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>Live Sessions</h3>
          {sessions.map((s, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                marginBottom: i < sessions.length - 1 ? 12 : 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: s.color + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.status === "Completed" ? (
                    <CheckCircle size={20} color={s.color} />
                  ) : (
                    <Clock size={20} color={s.color} />
                  )}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.date}</p>
                </div>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: C.muted,
                }}
              >
                <ExternalLink size={16} />
              </button>
            </div>
          ))}
        </Card>
      </div>

      {/* Resources */}
      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 16 }}>Curated Resources</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {[
            { tag: "PDF Guide", title: "Top 50 Frontend Interview Questions", color: C.teal },
            { tag: "Cheat Sheet", title: "System Design Component Guide", color: C.blue },
            { tag: "Checklist", title: "Final Round Behavioral Strategies", color: C.purple },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                padding: 18,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                background: C.bg,
                cursor: "pointer",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Chip label={r.tag} color={r.color} />
              <h4 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginTop: 12, lineHeight: 1.4 }}>{r.title}</h4>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, color: C.muted, fontSize: 12 }}>
                <Clock size={12} /> 15 min read
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
