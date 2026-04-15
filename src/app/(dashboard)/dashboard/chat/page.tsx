"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import C from "@/constants/colors";
import { initialMessages } from "@/data/mockMessages";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const msg = {
      id: Date.now(),
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((p) => [...p, msg]);
    setInput("");

    // Advisor reply logic removed for production-ready state
  };

  return (
    <div style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <Card style={{ flex: 1, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Chat Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar name="T" size={40} online />
            <div>
              <p style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Support Team</p>
              <p style={{ fontSize: 12, color: C.success, fontWeight: 600 }}>Available for support</p>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div style={{ flex: 1, padding: "24px 20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", opacity: 0.5 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.light, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Send size={24} color={C.muted} />
              </div>
              <p style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>No messages yet</p>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Your conversation with the support team will appear here.</p>
            </div>
          ) : (
            messages.map((m: any) => {
              const isUser = m.from === "user";
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    gap: 10,
                  }}
                >
                  {!isUser && <Avatar name="T" size={30} />}
                  <div style={{ maxWidth: "70%" }}>
                    <div
                      style={{
                        background: isUser ? C.teal : C.light,
                        color: isUser ? "white" : C.text,
                        padding: "10px 16px",
                        borderRadius: isUser ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                        fontSize: 14,
                        lineHeight: 1.5,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      }}
                    >
                      {m.text}
                    </div>
                    <p
                      style={{
                        fontSize: 10,
                        color: C.muted,
                        marginTop: 4,
                        textAlign: isUser ? "right" : "left",
                        fontWeight: 600,
                      }}
                    >
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, background: "white" }}>
          <div
            style={{
              background: C.light,
              borderRadius: 14,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
              <Paperclip size={20} />
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
              <Image size={20} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message your support team..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14,
                padding: "6px 0",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={send}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: C.teal,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
