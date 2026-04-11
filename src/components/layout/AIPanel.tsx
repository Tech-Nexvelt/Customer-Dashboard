"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, Link2, AlignJustify, Sparkles } from "lucide-react";
import C from "@/constants/colors";

interface AIChipProps {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
  textColor?: string;
}

function AIChip({ icon, label, onClick, color, textColor }: AIChipProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 999,
        border: "1px solid #EBEBEB",
        background: color || "#FAFAF8",
        fontSize: 13,
        color: textColor || "#4B5563",
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        transition: "transform 0.15s, background 0.15s",
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      {label}
    </button>
  );
}

interface Message {
  role: "user" | "ai";
  text: string;
}

const QUICK_ACTIONS = [
  "Optimize my resume",
  "Prepare for interview",
  "Find remote jobs",
];

export default function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text: msg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          role: "ai",
          text: "I'm your personal career assistant. I can help you track your applications, optimize your profile, or prepare for upcoming interviews. How would you like to start today? 🚀",
        },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div
      style={{
        width: 320,
        flexShrink: 0,
        background: "#FFFFFF",
        borderLeft: "1px solid #EBEBEB",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "hidden",
      }}
      suppressHydrationWarning
    >
      <div
        style={{
          padding: "18px 20px 14px",
          borderBottom: "1px solid #EBEBEB",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: "#1A1A1A" }}>Your AI Assistant</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => alert("Pro Account features coming soon!")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "6px 14px",
                background: "#000000",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <Sparkles size={12} fill="white" /> Pro Account
            </button>
            <button 
              onClick={() => alert("Menu opened")}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 4 }}
            >
              <AlignJustify size={18} color="#9CA3AF" />
            </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column" }}>
        {messages.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.02em" }}>
              How can I Help<br />you, <span style={{ color: "#666" }}>Kishore?</span>
            </h2>
            <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 24, maxWidth: 240 }}>
              You can ask anything about your job applications, profile optimization, or career growth.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 10 }}>
              <AIChip icon="💼" label="Applications" onClick={() => send("Show my applications")} color="rgba(16, 185, 129, 0.08)" textColor="#10B981" />
              <AIChip icon="📝" label="Resume" onClick={() => send("Analyze my resume")} color="rgba(139, 92, 246, 0.08)" textColor="#8B5CF6" />
              <AIChip icon="📅" label="Interviews" onClick={() => send("Show upcoming interviews")} color="rgba(245, 158, 11, 0.08)" textColor="#F59E0B" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              <AIChip icon="🚀" label="Growth" onClick={() => send("Career advice")} color="rgba(234, 179, 8, 0.08)" textColor="#EAB308" />
              <AIChip icon="💬" label="Mentors" onClick={() => send("Find a mentor")} color="rgba(59, 130, 246, 0.08)" textColor="#3B82F6" />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: m.role === "user" ? "#1A1A1A" : "#F4F4F1",
                    color: m.role === "user" ? "white" : "#1A1A1A",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: "#9CA3AF", fontSize: 12, paddingLeft: 4 }}>AI is thinking...</div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 10px", display: "flex", gap: 10, overflowX: "auto", flexShrink: 0 }}>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            onClick={() => send(action)}
            style={{
              flex: "0 0 auto",
              padding: "8px 12px",
              background: "#FFFFFF",
              border: "1px solid #EBEBEB",
              borderRadius: 12,
              fontSize: 12,
              color: "#9CA3AF",
              cursor: "pointer",
              textAlign: "left",
              lineHeight: 1.3,
              maxWidth: 100,
            }}
          >
            {action}
          </button>
        ))}
      </div>

      <div style={{ padding: "10px 20px 20px", flexShrink: 0 }}>
        <div style={{ background: "#FDFDFD", borderRadius: 20, border: "1px solid #EBEBEB", padding: "12px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="How can I help you today?"
            style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#1A1A1A", marginBottom: 12 }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <Mic size={20} color="#9CA3AF" />
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <Link2 size={20} color="#9CA3AF" />
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </button>
            </div>
            <button 
              onClick={() => send()} 
              style={{ 
                padding: "8px 20px", 
                background: "#1A1A1A", 
                color: "white", 
                border: "none", 
                borderRadius: 999, 
                fontSize: 14, 
                fontWeight: 600, 
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
