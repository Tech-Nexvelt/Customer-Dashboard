"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, Link2, Sparkles } from "lucide-react";
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
          padding: "18px 24px 14px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Your AI Assistant</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => alert("Premium features coming soon!")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                background: C.text,
                color: C.white,
                border: "none",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <Sparkles size={12} fill={C.teal} color={C.teal} /> Unlock Premium
            </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column" }}>
        {messages.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.02em" }}>
              How can I help<br />you, <span style={{ color: C.muted }}>Kishore?</span>
            </h2>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 28, maxWidth: 240 }}>
              Ask anything about your job applications, profile optimization, or career growth.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 10 }}>
              <AIChip icon="💼" label="Applications" onClick={() => send("Show my applications")} color={C.iconActiveBg} textColor={C.teal} />
              <AIChip icon="📝" label="Resume" onClick={() => send("Analyze my resume")} color={`${C.purple}15`} textColor={C.purple} />
              <AIChip icon="📅" label="Interviews" onClick={() => send("Show upcoming interviews")} color={`${C.amber}15`} textColor={C.amber} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((m, i) => (
              <div key={`msg-${i}`} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    background: m.role === "user" ? C.text : C.bg,
                    color: m.role === "user" ? C.white : C.text,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    boxShadow: m.role === "user" ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: C.muted, fontSize: 12, paddingLeft: 4, fontStyle: "italic" }}>AI is thinking...</div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div style={{ padding: "0 20px 10px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0, scrollbarWidth: "none" }}>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={`action-${action}`}
            onClick={() => send(action)}
            style={{
              flex: "0 0 auto",
              padding: "10px 16px",
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              color: C.muted,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {action}
          </button>
        ))}
      </div>

      <div style={{ padding: "10px 20px 20px", flexShrink: 0 }}>
        <div style={{ background: C.white, borderRadius: 24, border: `1px solid ${C.border}`, padding: "8px", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="How can I help you today?"
            style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 14, color: C.text, padding: "12px 16px" }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px 8px" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 6, borderRadius: 8 }} className="hover:bg-slate-50 transition-colors">
                <Mic size={19} color={C.muted} />
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 6, borderRadius: 8 }} className="hover:bg-slate-50 transition-colors">
                <Link2 size={19} color={C.muted} />
              </button>
            </div>
            <button 
              onClick={() => send()} 
              style={{ 
                padding: "10px 24px", 
                background: C.text, 
                color: C.white, 
                border: "none", 
                borderRadius: 16, 
                fontSize: 13, 
                fontWeight: 800, 
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
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
