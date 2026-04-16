"use client";
import React, { useState, useEffect } from "react";
import { User, Bell, Lock, Shield, Globe, CreditCard } from "lucide-react";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import C from "@/constants/colors";
import { supabase } from "@/lib/supabaseClient";
import { sendEmailAlert } from "@/lib/mail/mailer";

export default function SettingsPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "");
        setUserEmail(user.email || "");
      }
    };
    getUser();
  }, []);

  const [prefs, setPrefs] = useState<any>({
    "Email alerts": true,
    "Push notifications": false,
    "Weekly progress report": true,
    "Job interview reminders": false
  });
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrefs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('clients')
          .select('notification_settings')
          .eq('id', user.id)
          .single();
        
        if (profile?.notification_settings) {
          const dbPrefs = profile.notification_settings;
          setPrefs({
            "Email alerts": dbPrefs.email_alerts ?? true,
            "Push notifications": dbPrefs.push_notifications ?? false,
            "Weekly progress report": dbPrefs.weekly_report ?? true,
            "Job interview reminders": dbPrefs.interview_reminders ?? false,
          });
        }
      }
    };
    fetchPrefs();
  }, []);

  const togglePref = async (name: string, value: boolean) => {
    setSaving(name);
    const newPrefs = { ...prefs, [name]: value };
    setPrefs(newPrefs);

    const dbSettings = {
      email_alerts: newPrefs["Email alerts"],
      push_notifications: newPrefs["Push notifications"],
      weekly_report: newPrefs["Weekly progress report"],
      interview_reminders: newPrefs["Job interview reminders"],
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('clients')
        .update({ notification_settings: dbSettings })
        .eq('id', user.id);

      // Trigger a confirmation email if they just enabled it
      if (name === "Email alerts" && value === true) {
        await sendEmailAlert(
          user.email!, 
          "Email Alerts Enabled!", 
          `<h1>Success!</h1><p>Hey ${userName || 'there'}, we've successfully enabled your email alerts. You'll now receive updates directly in your inbox.</p>`
        );
      }
    }
    
    setTimeout(() => setSaving(null), 800);
  };

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
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "block" }}>EMAIL ADDRESS</label>
                <input
                  value={userEmail}
                  readOnly
                  style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, background: "#f9f9f9" }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, display: "block" }}>BIO / HEADLINE</label>
                <textarea
                  placeholder="Passionate Frontend Engineer with a focus on creating beautiful and user-centric interfaces."
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

          {/* Notifications Section */}
          <Card>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 20 }}>Notifications</h3>
            {Object.entries(prefs).map(([item, val], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: i < Object.entries(prefs).length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div>
                  <span style={{ fontSize: 14, color: C.text, fontWeight: 500, display: "block" }}>{item}</span>
                  {saving === item && <span style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>Saving...</span>}
                </div>
                <Toggle defaultOn={val as boolean} onChange={(on) => togglePref(item, on)} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
