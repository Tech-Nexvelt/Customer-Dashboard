"use client";
import { FileText, Download, Share2, Upload, MessageSquare } from "lucide-react";
import ATSGauge from "@/components/shared/ATSGauge";
import Card from "@/components/ui/Card";
import C from "@/constants/colors";

export default function ResumePage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Resume & Portfolio</h1>
          <p style={{ color: C.muted, marginTop: 4 }}>Last updated by DevSphere on March 12, 2026</p>
        </div>
        <button
          style={{
            background: C.teal,
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
          <Upload size={16} /> Update Resume
        </button>
      </div>

      <div className="two-col" style={{ marginBottom: 20 }}>
        {/* ATS Score */}
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "30px 20px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 20 }}>ATS Score Analysis</h3>
          <ATSGauge score={87} size={150} />
          <div style={{ marginTop: 24 }}>
            <p style={{ color: C.success, fontWeight: 700, fontSize: 14 }}>Excellent Work!</p>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
              Your resume is highly optimized for technical roles. We added strong action verbs and quantified your impact.
            </p>
          </div>
        </Card>

        {/* Portfolio Status */}
        <Card style={{ padding: "30px 20px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 20 }}>Portfolio Website</h3>
          <div
            style={{
              height: 180,
              background: "#F1F5F9",
              borderRadius: 14,
              border: `2px dashed ${C.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: C.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.teal,
                marginBottom: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Share2 size={18} />
            </div>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.text }}>portfolio-sayyad.devsphere.me</p>
            <p style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>Site is online and hosted by DevSphere</p>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button style={{ background: C.teal, color: "white", padding: "6px 14px", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>View Site</button>
              <button style={{ background: "white", color: C.text, padding: "6px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Edit Details</button>
            </div>
          </div>
        </Card>
      </div>

      {/* Resume versions */}
      <Card>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 16 }}>Resume Versions</h3>
        {[
          { name: "Frontend Engineer v3.pdf", date: "Mar 12", type: "Main", active: true },
          { name: "Full Stack Developer v2.pdf", date: "Feb 28", type: "Targeted", active: false },
          { name: "Software Engineer v1.pdf", date: "Jan 15", type: "Draft", active: false },
        ].map((r, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: r.active ? C.teal + "18" : C.light,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} color={r.active ? C.teal : C.muted} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{r.name}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: C.muted }}>Modified {r.date}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: r.active ? C.teal + "18" : C.light,
                      color: r.active ? C.teal : C.muted,
                      padding: "1px 6px",
                      borderRadius: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {r.type}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                title="Download"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: C.light,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.muted,
                }}
              >
                <Download size={15} />
              </button>
              <button
                title="Comment"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: C.light,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.muted,
                }}
              >
                <MessageSquare size={15} />
              </button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
