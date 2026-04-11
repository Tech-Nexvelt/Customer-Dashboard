// src/lib/auth-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
  };
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USER: User = {
  id: 'mock-user-id',
  email: 'kishore@example.com',
  user_metadata: {
    full_name: 'Kishore'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [loading, setLoading] = useState(false)

  const signUp = async (email: string, password: string) => {
    console.log('Mock sign up:', email)
  }

  const signIn = async (email: string, password: string) => {
    console.log('Mock sign in:', email)
    setUser(MOCK_USER)
  }

  const signOut = async () => {
    console.log('Mock sign out')
    setUser(null)
  }

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    console.log('Mock OAuth sign in:', provider)
    setUser(MOCK_USER)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

