'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Trash2, Minus, Plus, Package, ChevronRight, Sparkles, ArrowLeft, Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'
import { useAuth } from '@/lib/context/AuthContext'
import { smmturkClient } from '@/lib/api/smmturk-client'
import { createMultipleOrders } from '@/lib/api/orders'
import Header from '@/components/Header'
import LiveSupport from '@/components/LiveSupport'
import FloatingCartButton from '@/components/FloatingCartButton'
import Link from 'next/link'

const STEP_SMALL = 100
const STEP_LARGE = 1000
const MIN_AMOUNT = 100

function CartItemCard({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: { id: string; packageName: string; serviceName: string; amount: number; totalPrice: number }
  onRemove: () => void
  onQuantityChange: (delta: number) => void
}) {
  const step = item.amount >= STEP_LARGE ? STEP_LARGE : STEP_SMALL
  const canDecrease = item.amount > MIN_AMOUNT

  return (
    <div className="bg-dark-card rounded-2xl p-4 border border-dark-card-light/80 hover:border-primary-green/30 transition-colors w-full max-w-full overflow-hidden">
      <div className="flex gap-3 w-full">
        <div className="w-11 h-11 rounded-xl bg-primary-green/15 flex items-center justify-center flex-shrink-0 border border-primary-green/20">
          <Package className="w-5 h-5 text-primary-green" />
        </div>
        <div className="flex-1 min-w-0 max-w-full overflow-hidden">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-0.5 break-words">
            {item.packageName}
          </h3>
          <p className="text-gray-400 text-xs mb-2 break-words">{item.serviceName}</p>
          {item.url && (
            <div className="mb-2">
              <p className="text-gray-500 text-[10px] mb-1">URL:</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-green hover:text-primary-green-light text-xs break-all line-clamp-1"
              >
                {item.url}
              </a>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-wrap w-full">
            <div className="flex items-center gap-1.5 bg-dark-bg/60 rounded-xl p-1.5 border border-dark-card-light/50">
              <button
                type="button"
                onClick={() => canDecrease && onQuantityChange(-1)}
                disabled={!canDecrease}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-green/20 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation active:scale-95"
                aria-label="Azalt"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-semibold text-sm min-w-[3rem] text-center tabular-nums">
                {item.amount.toLocaleString('tr-TR')}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-green/20 transition-colors touch-manipulation active:scale-95"
                aria-label="Artır"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-green font-bold text-base whitespace-nowrap">
                {Math.round(item.totalPrice)}₺
              </span>
              <button
                type="button"
                onClick={onRemove}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation active:scale-95"
                aria-label="Kaldır"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-6 text-center">
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-green/5 flex items-center justify-center mb-6 border-2 border-primary-green/30 shadow-lg shadow-primary-green/10">
        <Package className="w-12 h-12 text-primary-green/70" />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary-green/20 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-primary-green" />
        </div>
      </div>
      <h3 className="text-white font-bold text-xl mb-2">Sepetiniz boş</h3>
      <p className="text-gray-400 text-sm max-w-[260px] mb-6 leading-relaxed">
        Henüz ürün eklemediniz. Hizmetlerimizi keşfedin ve sepete ekleyin.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 bg-gradient-to-r from-primary-green to-primary-green-dark text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-lg shadow-primary-green/25 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all active:scale-[0.98] touch-manipulation"
      >
        <ArrowLeft className="w-4 h-4" />
        Alışverişe devam et
      </button>
    </div>
  )
}

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeFromCart, clearCart, getTotalPrice, getItemCount, updateQuantity } = useCart()
  
  const [apiKey, setApiKey] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderResults, setOrderResults] = useState<Array<{ orderId: number; success: boolean; error?: string }>>([])

  // Load API key from localStorage or environment variable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('smmturk_api_key')
      if (stored) {
        setApiKey(stored)
      } else {
        // Try to get from environment variable (for development)
        const envKey = process.env.NEXT_PUBLIC_SMMTURK_API_KEY
        if (envKey) {
          setApiKey(envKey)
          localStorage.setItem('smmturk_api_key', envKey)
        } else {
          // Default API key (should be moved to environment variable in production)
          const defaultApiKey = 'daa573901673c824ee8ba916d201bbb2'
          setApiKey(defaultApiKey)
          localStorage.setItem('smmturk_api_key', defaultApiKey)
        }
      }
    }
  }, [])

  const handleQuantityChange = (id: string, delta: number, currentAmount: number) => {
    const step = currentAmount >= STEP_LARGE ? STEP_LARGE : STEP_SMALL
    const next = Math.max(MIN_AMOUNT, currentAmount + delta * step)
    if (next < MIN_AMOUNT) return
    updateQuantity(id, next)
  }

  const handlePlaceOrder = async () => {
    if (!apiKey.trim()) {
      alert('Lütfen API anahtarınızı girin.')
      return
    }

    // Her ürünün URL'si olup olmadığını kontrol et
    const itemsWithoutUrl = items.filter(item => !item.url || !item.url.trim())
    if (itemsWithoutUrl.length > 0) {
      alert('Bazı ürünlerde URL eksik. Lütfen tüm ürünler için URL giriniz.')
      return
    }

    // Tüm URL'leri validate et
    for (const item of items) {
      try {
        new URL(item.url)
      } catch {
        alert(`${item.packageName} için geçersiz URL: ${item.url}`)
        return
      }
    }

    setIsProcessing(true)
    setOrderResults([])

    try {
      // Save API key to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('smmturk_api_key', apiKey)
      }

      const results: Array<{ orderId: number; success: boolean; error?: string }> = []

      // Create orders for each cart item with their own URLs
      for (const item of items) {
        try {
          // packageId SMMTurk servis ID'sini içeriyor (örn: '9403')
          const serviceId = parseInt(item.packageId)
          if (isNaN(serviceId)) {
            results.push({
              orderId: 0,
              success: false,
              error: `${item.packageName}: Geçersiz servis ID (packageId: ${item.packageId})`,
            })
            continue
          }

          const response = await smmturkClient.addOrder(
            apiKey,
            serviceId,
            item.url,
            item.amount
          )

          results.push({
            orderId: response.order,
            success: true,
          })
        } catch (error) {
          results.push({
            orderId: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Bilinmeyen hata',
          })
        }
      }

      setOrderResults(results)

      // If all orders succeeded, clear cart
      const allSuccess = results.every((r) => r.success)
      if (allSuccess) {
        setTimeout(() => {
          clearCart()
          setOrderResults([])
          alert('Tüm siparişler başarıyla oluşturuldu!')
        }, 2000)
      } else {
        const successCount = results.filter((r) => r.success).length
        alert(`${successCount}/${results.length} sipariş başarıyla oluşturuldu.`)
      }
    } catch (error) {
      alert('Sipariş oluşturulurken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'))
    } finally {
      setIsProcessing(false)
    }
  }

  const count = getItemCount()
  const total = getTotalPrice()

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <LiveSupport />
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
          <span className="text-white text-xs sm:text-sm">Sepetim</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-green/20 to-primary-green/10 flex items-center justify-center border border-primary-green/30 shadow-lg shadow-primary-green/10">
              <Package className="w-6 h-6 sm:w-7 sm:h-7 text-primary-green" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl sm:text-3xl">Sepetim</h1>
              <p className="text-gray-400 text-sm font-medium">
                {count === 0 ? 'Henüz ürün yok' : `${count} ${count === 1 ? 'ürün' : 'ürün'}`}
              </p>
            </div>
          </div>
        </div>

        {/* Login Required Message */}
        {!user && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm text-center">
              Sipariş vermek için{' '}
              <Link href="/auth/login?redirect=/cart" className="text-primary-green hover:underline font-semibold">
                giriş yapmanız
              </Link>
              {' '}gerekmektedir.
            </p>
          </div>
        )}

        {/* Cart Content */}
        {items.length === 0 ? (
          <EmptyState onBack={() => router.push('/')} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onQuantityChange={(delta) => handleQuantityChange(item.id, delta, item.amount)}
                />
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-card rounded-2xl p-4 sm:p-6 border border-dark-card-light/80 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-4">Sipariş Özeti</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">Ara Toplam</span>
                    <span className="text-white font-semibold">
                      {Math.round(total)}₺
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">Kargo</span>
                    <span className="text-primary-green font-semibold">Ücretsiz</span>
                  </div>
                  <div className="border-t border-dark-card-light pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-semibold text-lg">Toplam</span>
                      <span className="text-primary-green font-bold text-2xl">
                        {Math.round(total)}₺
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Results */}
                {orderResults.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-dark-card-light space-y-2">
                    <h3 className="text-white font-semibold text-sm mb-2">Sipariş Sonuçları</h3>
                    {orderResults.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          result.success
                            ? 'bg-primary-green/10 border border-primary-green/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        {result.success ? (
                          <CheckCircle2 className="w-4 h-4 text-primary-green flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          {result.success ? (
                            <p className="text-xs text-primary-green">
                              Sipariş #{result.orderId} oluşturuldu
                            </p>
                          ) : (
                            <p className="text-xs text-red-400">
                              {result.error || 'Hata oluştu'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.confirm('Sepeti temizlemek istediğinize emin misiniz?')) {
                        clearCart()
                        setOrderResults([])
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-dark-card-light text-gray-300 font-semibold text-sm hover:bg-dark-card-light/80 hover:text-white transition-all touch-manipulation active:scale-[0.98]"
                  >
                    Sepeti Temizle
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || items.length === 0 || !user || items.some(item => !item.url || !item.url.trim())}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-green to-primary-green-dark text-white font-bold text-sm shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sipariş Oluşturuluyor...
                      </>
                    ) : !user ? (
                      'Giriş Yapın'
                    ) : (
                      'Sipariş Oluştur'
                    )}
                  </button>
                  {user && (
                    <Link
                      href="/orders"
                      className="w-full py-3.5 px-4 rounded-xl bg-dark-card-light text-gray-300 font-semibold text-sm hover:bg-dark-card-light/80 hover:text-white transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      Siparişlerimi Görüntüle
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
