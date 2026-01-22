'use client'

import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabase = useMemo(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ), 
  [])

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error.message)
        }
        
        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
        } else {
          // Cookie'lerin yüklenmesi için retry mekanizması
          let retryCount = 0
          const maxRetries = 5
          
          const retryInterval = setInterval(async () => {
            retryCount++
            const { data: { session: retrySession }, error: retryError } = await supabase.auth.getSession()
            
            if (retryError) {
              console.error('Error getting session on retry:', retryError.message)
            } else if (retrySession) {
              setSession(retrySession)
              setUser(retrySession.user)
              setLoading(false)
              clearInterval(retryInterval)
            } else if (retryCount >= maxRetries) {
              clearInterval(retryInterval)
            }
          }, 200)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Router'ı yenile - Next.js Server Component'lerinin yeni cookie'yi görmesini sağlar
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        router.refresh()
      }

      if (event === 'SIGNED_IN') {
        sessionStorage.removeItem('auth_redirect')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signInWithGoogle = async () => {
    const redirectPath = sessionStorage.getItem('auth_redirect') || '/'
    const redirectTo = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}`

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
      throw error
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    router.refresh()
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGoogle, signOut }}>
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
