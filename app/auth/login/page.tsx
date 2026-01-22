'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Loader2, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import Header from '@/components/Header'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, signInWithGoogle, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const redirect = searchParams.get('redirect')
      router.push(redirect || '/')
    }
  }, [user, authLoading, router, searchParams])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const redirect = searchParams.get('redirect')
      await signInWithGoogle()
      // Store redirect URL in sessionStorage for callback
      if (redirect) {
        sessionStorage.setItem('auth_redirect', redirect)
      }
      // Redirect will happen automatically via OAuth flow
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılırken bir hata oluştu')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
        <div className="bg-dark-card rounded-2xl p-6 sm:p-8 border border-dark-card-light/80 shadow-xl">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-green transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-green/20 to-primary-green/10 rounded-2xl flex items-center justify-center border border-primary-green/30">
              <Mail className="w-8 h-8 text-primary-green" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Giriş Yap
            </h1>
            <p className="text-gray-400 text-sm">
              Gmail hesabınızla giriş yaparak devam edin
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading || authLoading}
            className="w-full py-4 px-6 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-semibold text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-h-[56px]"
          >
            {isLoading || authLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Yönlendiriliyor...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Gmail ile Giriş Yap</span>
              </>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              Giriş yaparak{' '}
              <Link href="/corporate/hizmet-sartlari" className="text-primary-green hover:underline">
                Hizmet Şartları
              </Link>
              {' '}ve{' '}
              <Link href="/corporate/kvkk" className="text-primary-green hover:underline">
                KVKK Aydınlatma Metni
              </Link>
              'ni kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
