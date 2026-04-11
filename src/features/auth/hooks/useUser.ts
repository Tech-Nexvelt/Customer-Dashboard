// src/hooks/useUser.ts
'use client'

import { useState, useEffect } from 'react'

const MOCK_PROFILE = {
  id: 'mock-user-id',
  email: 'kishore@example.com',
  name: 'Kishore',
  subscription: {
    planType: 'PRO',
    renewalDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
  }
}

export function useUser() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData(MOCK_PROFILE)
      setLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return {
    user: data,
    loading,
    error: null,
  }
}

