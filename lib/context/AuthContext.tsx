'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if Supabase is configured
  let supabase: ReturnType<typeof createClient> | null = null
  try {
    supabase = createClient()
  } catch (error) {
    console.warn('Supabase not configured:', error)
    setLoading(false)
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        }
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('Error getting session:', error)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      setUser(session?.user ?? null)
      setLoading(false)
      
      // If signed in, clear any redirect from sessionStorage
      if (event === 'SIGNED_IN' && session) {
        sessionStorage.removeItem('auth_redirect')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signInWithGoogle = async () => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please check your environment variables.')
    }

    const redirect = sessionStorage.getItem('auth_redirect')
    const redirectTo = redirect 
      ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      : `${window.location.origin}/auth/callback`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please check your environment variables.')
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
