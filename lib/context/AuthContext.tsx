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

  console.log('🟢 [AUTH] AuthProvider render edildi, user:', user?.email || 'null', 'loading:', loading)

  // Supabase client'ı sadece bir kez oluştur (Performans için önemli)
  const supabase = useMemo(() => {
    console.log('🟢 [AUTH] Supabase client oluşturuluyor...')
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }, [])

  useEffect(() => {
    console.log('🟢 [AUTH] useEffect çalıştı, auth başlatılıyor...')
    
    // 1. Sayfa ilk açıldığında mevcut oturumu kontrol et
    const initializeAuth = async () => {
      try {
        // Önce cookie'leri kontrol et
        const allCookies = document.cookie
        console.log('🟢 [AUTH] Tüm cookie\'ler:', allCookies)
        console.log('🟢 [AUTH] Cookie sayısı:', allCookies.split(';').length)
        
        // Supabase cookie'lerini bul
        const supabaseCookies = allCookies.split(';').filter(c => c.includes('sb-'))
        console.log('🟢 [AUTH] Supabase cookie\'leri:', supabaseCookies)
        
        console.log('🟢 [AUTH] getSession() çağrılıyor...')
        const { data: { session: currentSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ [AUTH] getSession hatası:', error.message)
          console.error('❌ [AUTH] Error details:', error)
        } else {
          console.log('🟢 [AUTH] getSession sonucu:', currentSession ? `User: ${currentSession.user.email}` : 'Session yok')
          if (currentSession) {
            console.log('✅ [AUTH] Session detayları:', {
              user: currentSession.user.email,
              id: currentSession.user.id,
              expires_at: currentSession.expires_at,
              access_token: currentSession.access_token ? 'Var' : 'Yok'
            })
          }
        }
        
        if (currentSession) {
          console.log('✅ [AUTH] Session bulundu, state güncelleniyor...')
          console.log('✅ [AUTH] User email:', currentSession.user.email)
          console.log('✅ [AUTH] User id:', currentSession.user.id)
          setSession(currentSession)
          setUser(currentSession.user)
        } else {
          console.log('⚠️ [AUTH] Session bulunamadı')
          console.log('⚠️ [AUTH] Cookie durumu kontrol ediliyor...')
          
          // Cookie'lerin yüklenmesi için birkaç kez retry yap
          let retryCount = 0
          const maxRetries = 5
          
          const retryInterval = setInterval(async () => {
            retryCount++
            console.log(`🟢 [AUTH] Retry ${retryCount}/${maxRetries}: getSession() tekrar çağrılıyor...`)
            
            // Cookie'leri tekrar kontrol et
            const currentCookies = document.cookie
            const supabaseCookies = currentCookies.split(';').filter(c => c.includes('sb-') && c.includes('auth-token'))
            console.log(`🟢 [AUTH] Retry ${retryCount}: Supabase auth cookie sayısı:`, supabaseCookies.length)
            
            const { data: { session: retrySession }, error: retryError } = await supabase.auth.getSession()
            if (retryError) {
              console.error('❌ [AUTH] Retry getSession hatası:', retryError.message)
            } else if (retrySession) {
              console.log('✅ [AUTH] Retry başarılı! Session bulundu:', retrySession.user.email)
              setSession(retrySession)
              setUser(retrySession.user)
              setLoading(false)
              clearInterval(retryInterval)
            } else if (retryCount >= maxRetries) {
              console.log('⚠️ [AUTH] Max retry sayısına ulaşıldı, session hala yok')
              clearInterval(retryInterval)
            } else {
              console.log(`⚠️ [AUTH] Retry ${retryCount}: Hala session yok, tekrar deneniyor...`)
            }
          }, 200) // Her 200ms'de bir dene
        }
      } catch (error) {
        console.error('❌ [AUTH] Session yüklenirken hata:', error)
      } finally {
        console.log('🟢 [AUTH] Loading false yapılıyor')
        setLoading(false)
      }
    }

    initializeAuth()

    // 2. Auth durum değişikliklerini dinle (Login, Logout, Token Refresh)
    console.log('🟢 [AUTH] onAuthStateChange listener kuruluyor...')
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🟡 [AUTH] onAuthStateChange event:', event)
      console.log('🟡 [AUTH] Session:', session ? `User: ${session.user.email}` : 'null')
      
      // Olay ne olursa olsun state'i güncelle
      console.log('🟡 [AUTH] State güncelleniyor...')
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      console.log('🟡 [AUTH] State güncellendi, user:', session?.user?.email || 'null')

      // KRİTİK NOKTA: Router'ı Yenile
      // Next.js Server Component'lerinin (Middleware, Layout) yeni cookie'yi görmesini sağlar.
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        console.log('🟡 [AUTH] Router refresh çağrılıyor (event:', event, ')')
        router.refresh()
        console.log('🟡 [AUTH] Router refresh çağrıldı')
      }

      // Giriş yapıldıysa session storage'daki redirect bilgisini temizle
      if (event === 'SIGNED_IN') {
        console.log('✅ [AUTH] SIGNED_IN event, redirect bilgisi temizleniyor')
        sessionStorage.removeItem('auth_redirect')
      }
    })

    return () => {
      console.log('🟢 [AUTH] Cleanup: subscription unsubscribe ediliyor')
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signInWithGoogle = async () => {
    console.log('🟢 [AUTH] signInWithGoogle çağrıldı')
    // Kullanıcı giriş yaptıktan sonra döneceği sayfayı belirle
    const redirectPath = sessionStorage.getItem('auth_redirect') || '/'
    const redirectTo = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath)}`
    console.log('🟢 [AUTH] Redirect to:', redirectTo)

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
      console.error('❌ [AUTH] signInWithOAuth hatası:', error.message)
      throw error
    } else {
      console.log('✅ [AUTH] signInWithOAuth başarılı, OAuth yönlendirmesi yapılıyor')
    }
  }

  const signOut = async () => {
    console.log('🟢 [AUTH] signOut çağrıldı')
    await supabase.auth.signOut()
    console.log('✅ [AUTH] signOut tamamlandı')
    // State'i manuel temizle (UI anında tepki versin)
    setUser(null)
    setSession(null)
    console.log('🟢 [AUTH] State temizlendi')
    router.refresh() // Çıkışta da yenile
    router.push('/') // Anasayfaya gönder
    console.log('🟢 [AUTH] Router refresh ve push yapıldı')
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
