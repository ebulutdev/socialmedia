'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Gift, ArrowLeft, Loader2, CheckCircle2, ExternalLink, Wallet, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'
import { getCoupons, type Coupon } from '@/lib/api/coupons'
import { getUserBalance } from '@/lib/api/balance'
import Header from '@/components/Header'
import FloatingCartButton from '@/components/FloatingCartButton'
import Link from 'next/link'

export default function CouponsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userBalance, setUserBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const data = await getCoupons()
        setCoupons(data)
      } catch (error) {
        console.error('Error loading coupons:', error)
        showToast('Kuponlar yüklenirken bir hata oluştu.', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    loadCoupons()
  }, [showToast])

  useEffect(() => {
    const loadBalance = async () => {
      if (!user) {
        setUserBalance(null)
        return
      }

      setIsLoadingBalance(true)
      try {
        const balance = await getUserBalance()
        setUserBalance(balance)
      } catch (error) {
        console.error('Error loading balance:', error)
        setUserBalance(null)
      } finally {
        setIsLoadingBalance(false)
      }
    }

    loadBalance()
  }, [user])

  const handlePurchase = (coupon: Coupon) => {
    // Open Sophier link in new tab
    window.open(coupon.sophier_link, '_blank')
    
    // Show success message
    showToast(
      `Kupon satın alma sayfasına yönlendiriliyorsunuz. Ödeme tamamlandıktan sonra bakiyeniz otomatik olarak yüklenecektir.`,
      'info'
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <FloatingCartButton />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-primary-green transition text-xs sm:text-sm min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-white text-xs sm:text-sm">Kuponlar</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-green/20 to-primary-green/10 flex items-center justify-center border border-primary-green/30 shadow-lg shadow-primary-green/10">
              <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-primary-green" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Kupon Satın Al</h1>
              <p className="text-gray-400 text-sm font-medium">
                Bakiyenizi yüklemek için kupon satın alın
              </p>
            </div>
          </div>
        </div>

        {/* Balance Display */}
        {user && (
          <div className="mb-6 p-4 bg-dark-card rounded-2xl border border-dark-card-light/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green/15 flex items-center justify-center border border-primary-green/20">
                  <Wallet className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Mevcut Bakiye</p>
                  {isLoadingBalance ? (
                    <p className="text-gray-400 text-sm">Yükleniyor...</p>
                  ) : (
                    <p className="text-primary-green font-bold text-lg">
                      {userBalance !== null ? `${userBalance.toFixed(2)}₺` : '0.00₺'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setIsLoadingBalance(true)
                  getUserBalance().then(balance => {
                    setUserBalance(balance)
                    setIsLoadingBalance(false)
                  }).catch(() => {
                    setIsLoadingBalance(false)
                  })
                }}
                disabled={isLoadingBalance}
                className="px-4 py-2 rounded-xl bg-dark-bg text-gray-300 hover:text-white hover:bg-dark-card-light transition text-sm font-medium disabled:opacity-50"
              >
                {isLoadingBalance ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Yenile'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Login Required Message */}
        {!user && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm text-center">
              Kupon satın almak için{' '}
              <Link href="/auth/login?redirect=/coupons" className="text-primary-green hover:underline font-semibold">
                giriş yapmanız
              </Link>
              {' '}gerekmektedir.
            </p>
          </div>
        )}

        {/* E-posta uyarısı: Shopier = hesap e-postası */}
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm font-medium text-amber-200">
              <p className="mb-1">
                Shopier ödeme sayfasında yazacağınız e-posta adresi, hesabınızdaki e-posta ile <span className="font-semibold text-amber-100">aynen aynı</span> olmalıdır. Aksi halde bakiye yüklenemez.
              </p>
              {user?.email && (
                <p className="text-amber-100/90 mt-2">
                  Hesap e-postanız: <span className="font-mono text-amber-50">{user.email}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary-green animate-spin" />
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Henüz kupon bulunmuyor</h3>
            <p className="text-gray-400 text-sm">
              Yakında yeni kuponlar eklenecektir.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-dark-card rounded-2xl p-6 border border-dark-card-light/80 hover:border-primary-green/30 transition-all hover:shadow-lg hover:shadow-primary-green/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-green/20 to-primary-green/10 flex items-center justify-center border border-primary-green/30">
                    <Gift className="w-6 h-6 text-primary-green" />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Değer</p>
                    <p className="text-primary-green font-bold text-xl">
                      {coupon.value.toFixed(0)}₺
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {coupon.value.toFixed(0)}₺ Kupon
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Bu kuponu satın alarak hesabınıza {coupon.value.toFixed(0)}₺ bakiye yükleyebilirsiniz.
                  </p>
                </div>

                <button
                  onClick={() => handlePurchase(coupon)}
                  disabled={!user}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-green to-primary-green-dark text-white font-bold text-sm shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  {user ? 'Satın Al' : 'Giriş Yapın'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-300">
              <p className="font-semibold mb-1">Kupon Kullanımı</p>
              <ul className="list-disc list-inside space-y-1 text-blue-200/80">
                <li>Kupon satın aldıktan sonra bakiyeniz otomatik olarak yüklenecektir.</li>
                <li>Bakiyenizi siparişlerinizde kullanabilirsiniz.</li>
                <li>Yetersiz bakiye durumunda kupon satın almanız gerekmektedir.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
