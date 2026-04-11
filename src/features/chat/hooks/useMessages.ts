// src/hooks/useMessages.ts
'use client'

import { useState, useEffect } from 'react'

const MOCK_INITIAL_MESSAGES = [
  { id: '1', text: 'Hello! How can I help you today?', senderRole: 'ai', createdAt: new Date().toISOString() },
];

export function useMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial fetch
    const timer = setTimeout(() => {
      setMessages(MOCK_INITIAL_MESSAGES)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      senderRole: 'user',
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, newMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "This is a mock response since the backend has been removed.",
        senderRole: 'ai',
        createdAt: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  return { messages, loading, sendMessage }
}

