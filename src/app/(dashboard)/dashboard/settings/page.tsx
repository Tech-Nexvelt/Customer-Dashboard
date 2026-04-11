"use client";
import { User, Bell, Lock, Shield, Globe, CreditCard } from "lucide-react";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import C from "@/constants/colors";

export default function SettingsPage() {
  const sections = [
    { title: "Notifications", items: ["Email alerts", "Push notifications", "Weekly progress report", "Job interview reminders"] },
    { title: "Privacy", items: ["Public profile", "Show activity status", "Allow recruiters to message", "Anonymous data sharing"] },
  ];

  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Settings</h1>
        <p style={{ color: C.muted, marginTop: 4 }}>Manage your account and preferences.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, alignItems: "start" }}>
        {/* Navigation */}
        <Card style={{ padding: 10 }}>
          {[
            { label: "General", Icon: User, active: true },
            { label: "Notifications", Icon: Bell },
            { label: "Security", Icon: Lock },
            { label: "Billing", Icon: CreditCard },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                background: item.active ? C.teal + "12" : "transparent",
                color: item.active ? C.teal : C.text,
                fontWeight: item.active ? 700 : 500,
                fontSize: 14,
              }}
            >
              <item.Icon size={18} />
              {item.label}
            </div>
          ))}
        </Card>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Profile Section */}
          <Card>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>Profile Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "block" }}>FULL NAME</label>
                <input
                  defaultValue="Kishore"
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "block" }}>EMAIL ADDRESS</label>
                <input
                  defaultValue="kishore@example.com"
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14 }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "block" }}>BIO / HEADLINE</label>
                <textarea
                  defaultValue="Passionate Frontend Engineer with a focus on creating beautiful and user-centric interfaces."
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, height: 80, resize: "none" }}
                />
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{
                  background: C.teal,
                  color: "white",
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          </Card>

          {/* Preferences Sections */}
          {sections.map((sec, idx) => (
            <Card key={idx}>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>{sec.title}</h3>
              {sec.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: i < sec.items.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{item}</span>
                  <Toggle defaultOn={i % 2 === 0} />
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
