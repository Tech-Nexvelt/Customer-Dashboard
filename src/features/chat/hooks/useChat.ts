"use client";
import { useState } from "react";
import { initialMessages } from "@/data/mockMessages";

export function useChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      from: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    // Simulate advisor reply after 900ms
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: "team",
        text: "Got it! I'll look into that and respond shortly.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 900);
  };

  return { messages, newMessage, setNewMessage, sendMessage };
}
