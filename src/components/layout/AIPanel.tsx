"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mic, Link2, Sparkles } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useUser";
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
  suggestedReplies?: string[];
}

const QUICK_ACTIONS = [
  "Billing issue",
  "Feature request",
  "Technical support",
];

export default function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const userName = user?.name || "User";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    
    const newMessages = [...messages, { role: "user" as const, text: msg }];
    setMessages(newMessages);
    setLoading(true);
    
    // Mock response for pure frontend
    setTimeout(() => {
      const responseText = "Thanks for your message! As this is a frontend demo, I'm currently in offline mode. How else can I help you explore the interface?\n\nSuggested Replies:\n1. Show me the dashboard\n2. View job leads\n3. Settings";
      
      let cleanText = responseText;
      let suggested: string[] = [];
      
      if (cleanText.includes("Suggested Replies:")) {
        const parts = cleanText.split("Suggested Replies:");
        cleanText = parts[0].trim();
        suggested = parts[1]
          .split("\n")
          .filter(line => /^\d\./.test(line.trim()))
          .map(line => line.replace(/^\d\.\s*/, "").trim());
      }

      setMessages((p) => [
        ...p,
        {
          role: "ai",
          text: cleanText,
          suggestedReplies: suggested
        },
      ]);
      setLoading(false);
    }, 1000);
  };


  return (
    <div
      style={{
        width: 380,
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
          padding: "18px 64px 14px 24px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 16 }}>👋</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 14, color: C.text, display: "block" }}>Aria</span>
            <span style={{ fontSize: 11, color: C.teal, fontWeight: 600 }}>Support Specialist • Online</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => alert("Premium access active")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                background: C.text,
                color: C.white,
                border: "none",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Sparkles size={11} fill={C.teal} color={C.teal} /> Priority Support
            </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column" }}>
        {messages.length === 0 ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 24, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${C.border}` }}>
              <img src="/NV-logo-short.png" alt="Nexvelt Aria" style={{ width: 32, height: 32, opacity: 0.8 }} />
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.02em" }}>
              Hey {userName.split(' ')[0]},<br />how can I <span style={{ color: C.teal }}>help?</span>
            </h2>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 28, maxWidth: 260 }}>
              I'm Aria, your dedicated support specialist. I'm here to ensure everything runs smoothly for you.
            </p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 10 }}>
              <AIChip icon="💸" label="Billing Issue" onClick={() => send("I have a billing question")} color={C.iconActiveBg} textColor={C.teal} />
              <AIChip icon="🛠️" label="Tech Support" onClick={() => send("Something isn't working")} color={`${C.purple}15`} textColor={C.purple} />
              <AIChip icon="🚀" label="Feature Request" onClick={() => send("I have an idea for a feature")} color={`${C.amber}15`} textColor={C.amber} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {messages.map((m, i) => (
              <div key={`msg-${i}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      maxWidth: "90%",
                      padding: "14px 18px",
                      borderRadius: m.role === "user" ? "24px 24px 4px 24px" : "24px 24px 24px 4px",
                      background: m.role === "user" ? C.text : C.bg,
                      color: m.role === "user" ? C.white : C.text,
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      boxShadow: m.role === "user" ? "0 4px 16px rgba(15, 23, 42, 0.08)" : "none",
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {m.text}
                  </div>
                </div>
                
                {m.role === "ai" && m.suggestedReplies && m.suggestedReplies.length > 0 && i === messages.length - 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4, paddingLeft: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Suggested Replies:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {m.suggestedReplies.map((reply, idx) => (
                        <button
                          key={`reply-${idx}`}
                          onClick={() => send(reply)}
                          style={{
                            padding: "8px 14px",
                            background: "white",
                            border: `1px solid ${C.border}`,
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            color: C.text,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.teal)}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 12 }}>
                <div style={{ display: "flex", gap: 3 }}>
                  <div className="animate-bounce" style={{ width: 4, height: 4, background: C.teal, borderRadius: "50%" }}></div>
                  <div className="animate-bounce" style={{ width: 4, height: 4, background: C.teal, borderRadius: "50%", animationDelay: "0.2s" }}></div>
                  <div className="animate-bounce" style={{ width: 4, height: 4, background: C.teal, borderRadius: "50%", animationDelay: "0.4s" }}></div>
                </div>
                <span style={{ color: C.muted, fontSize: 11, fontWeight: 600 }}>Aria is typing...</span>
              </div>
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
