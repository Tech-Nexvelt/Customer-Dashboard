// src/hooks/useApplications.ts
'use client'

import { useState, useEffect } from 'react'

const MOCK_APPLICATIONS = [
  { id: '1', company: 'Google', title: 'Frontend Engineer', status: 'Applied', createdAt: new Date().toISOString() },
  { id: '2', company: 'Meta', title: 'Product Designer', status: 'Interviewing', createdAt: new Date().toISOString() },
];

export function useApplications(status?: string) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setData(MOCK_APPLICATIONS)
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return {
    applications: data,
    total: data.length,
    error: null,
    isLoading,
    mutate: () => {},
  }
}

