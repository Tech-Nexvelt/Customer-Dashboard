"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useUser() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Fetch additional profile data from the clients table
        const { data: profile } = await supabase
          .from('clients')
          .select('access_level')
          .eq('id', user.id)
          .single();

        setData({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0],
          accessLevel: profile?.access_level || 'client',
          subscription: {
            planType: 'PRO', // Default to PRO for now
            renewalDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
          }
        })
      }
      setLoading(false)
    }
    getUser()
  }, [])

  return {
    user: data,
    loading,
    error: null,
  }
}

