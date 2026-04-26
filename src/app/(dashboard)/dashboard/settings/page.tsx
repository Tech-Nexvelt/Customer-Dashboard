"use client";
import React, { useState, useEffect } from "react";
import { User, Bell, Lock, Shield, Globe, CreditCard } from "lucide-react";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import C from "@/constants/colors";
import { useUser } from "@/features/auth/hooks/useUser";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const { user, updateProfile, updateNotifications } = useUser();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setUserEmail(user.email || "");
      setBio(user.bio || "");
      
      if (user.notificationPrefs) {
        setPrefs({
          "Email alerts": user.notificationPrefs.emailAlerts,
          "Push notifications": user.notificationPrefs.pushNotifications,
          "Weekly progress report": user.notificationPrefs.weeklyReports,
          "Job interview reminders": user.notificationPrefs.interviewReminders
        });
      }
    }
  }, [user]);

  const [prefs, setPrefs] = useState<any>({
    "Email alerts": true,
    "Push notifications": false,
    "Weekly progress report": true,
    "Job interview reminders": false
  });
  const [saving, setSaving] = useState<string | null>(null);

  const togglePref = async (name: string, value: boolean) => {
    setSaving(name);
    
    const newPrefs = { ...prefs, [name]: value };
    setPrefs(newPrefs);

    const backendMapping: any = {
      "Email alerts": "emailAlerts",
      "Push notifications": "pushNotifications",
      "Weekly progress report": "weeklyReports",
      "Job interview reminders": "interviewReminders"
    };

    await updateNotifications({
      [backendMapping[name]]: value
    });
    
    toast.success(`${name} updated`);
    setSaving(null);
  };

  const handleSaveProfile = async () => {
    setSaving("profile");
    const success = await updateProfile({ name: userName, bio });
    setSaving(null);
    if (success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
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
                onClick={handleSaveProfile}
                disabled={saving === "profile"}
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
                {saving === "profile" ? "Saving..." : "Save Changes"}
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
