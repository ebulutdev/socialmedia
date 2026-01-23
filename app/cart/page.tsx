'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Trash2, Minus, Plus, Package, ChevronRight, Sparkles, ArrowLeft, Loader2, CheckCircle2, XCircle, AlertCircle, Gift } from 'lucide-react'
import { useCart, type CartItem } from '@/lib/context/CartContext'
import { useAuth } from '@/lib/context/AuthContext'
import { useToast } from '@/lib/context/ToastContext'
import { smmturkClient } from '@/lib/api/smmturk-client'
import { createMultipleOrders } from '@/lib/api/orders'
import { getUserBalance, deductBalance } from '@/lib/api/balance'
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
  isProcessing,
  processingIndex,
  itemIndex,
}: {
  item: CartItem
  onRemove: () => void
  onQuantityChange: (delta: number) => void
  isProcessing?: boolean
  processingIndex?: number
  itemIndex?: number
}) {
  const step = item.amount >= STEP_LARGE ? STEP_LARGE : STEP_SMALL
  const canDecrease = item.amount > MIN_AMOUNT
  const isCurrentlyProcessing = isProcessing && processingIndex === itemIndex

  return (
    <div className={`bg-dark-card rounded-2xl p-4 border border-dark-card-light/80 hover:border-primary-green/30 transition-colors w-full max-w-full overflow-hidden ${isCurrentlyProcessing ? 'ring-2 ring-primary-green/50' : ''}`}>
      <div className="flex gap-3 w-full">
        <div className="w-11 h-11 rounded-xl bg-primary-green/15 flex items-center justify-center flex-shrink-0 border border-primary-green/20">
          {isCurrentlyProcessing ? (
            <Loader2 className="w-5 h-5 text-primary-green animate-spin" />
          ) : (
            <Package className="w-5 h-5 text-primary-green" />
          )}
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
          {isCurrentlyProcessing && (
            <div className="mb-2">
              <p className="text-primary-green text-xs font-medium animate-pulse">
                Sipariş oluşturuluyor...
              </p>
            </div>
          )}
          <div className="flex items-center justify-between gap-2 flex-wrap w-full">
            <div className="flex items-center gap-1.5 bg-dark-bg/60 rounded-xl p-1.5 border border-dark-card-light/50">
              <button
                type="button"
                onClick={() => canDecrease && onQuantityChange(-1)}
                disabled={!canDecrease || isProcessing}
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
                disabled={isProcessing}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-primary-green/20 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation active:scale-95"
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
                disabled={isProcessing}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation active:scale-95"
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
  const { showToast } = useToast()
  const cartItems: CartItem[] = items
  
  const [apiKey, setApiKey] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingIndex, setProcessingIndex] = useState<number | null>(null)
  const [orderResults, setOrderResults] = useState<Array<{ orderId: number; success: boolean; error?: string; packageName?: string }>>([])
  const [userBalance, setUserBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  // Load API key from localStorage or environment variable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Try to get from environment variable first (highest priority)
      const envKey = process.env.NEXT_PUBLIC_SMMTURK_API_KEY
      if (envKey && envKey.trim()) {
        console.log('🔑 API Key environment variable\'dan yüklendi:', {
          prefix: envKey.substring(0, 4) + '...',
          length: envKey.length,
          fullKey: envKey, // Debug için tam key'i göster
        })
        setApiKey(envKey.trim())
        localStorage.setItem('smmturk_api_key', envKey.trim())
        return
      }

      // Check localStorage
      const stored = localStorage.getItem('smmturk_api_key')
      if (stored && stored.trim()) {
        console.log('🔑 API Key localStorage\'dan yüklendi:', {
          prefix: stored.substring(0, 4) + '...',
          length: stored.length,
        })
        setApiKey(stored.trim())
      } else {
        // Default API key from .env.local
        const defaultApiKey = 'bd835f762d9620b2d81555f8ee8c9fd4'
        console.log('🔑 Default API Key kullanılıyor:', {
          prefix: defaultApiKey.substring(0, 4) + '...',
          length: defaultApiKey.length,
        })
        setApiKey(defaultApiKey)
        localStorage.setItem('smmturk_api_key', defaultApiKey)
      }
    }
  }, [])

  // Load user balance when user is logged in
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

  const handleQuantityChange = (id: string, delta: number, currentAmount: number) => {
    const step = currentAmount >= STEP_LARGE ? STEP_LARGE : STEP_SMALL
    const next = Math.max(MIN_AMOUNT, currentAmount + delta * step)
    if (next < MIN_AMOUNT) return
    updateQuantity(id, next)
  }

  const handlePlaceOrder = async () => {
    // API key kontrolü
    const currentApiKey = apiKey.trim()
    if (!currentApiKey) {
      showToast('API anahtarı bulunamadı. Lütfen API anahtarınızı kontrol edin.', 'error')
      return
    }

    console.log('🔑 API Key kontrolü:', {
      hasApiKey: !!currentApiKey,
      apiKeyLength: currentApiKey.length,
      apiKeyPrefix: currentApiKey.substring(0, 4) + '...',
    })

    // Her ürünün URL'si olup olmadığını kontrol et
    const itemsWithoutUrl = cartItems.filter(item => !item.url || !item.url.trim())
    if (itemsWithoutUrl.length > 0) {
      showToast('Bazı ürünlerde URL eksik. Lütfen tüm ürünler için URL giriniz.', 'error')
      return
    }

    // Tüm URL'leri validate et
    for (const item of cartItems) {
      try {
        new URL(item.url)
      } catch {
        showToast(`${item.packageName} için geçersiz URL: ${item.url}`, 'error')
        return
      }
    }

    // Bakiye kontrolü
    if (user) {
      try {
        const balance = await getUserBalance()
        const totalPrice = getTotalPrice()
        
        if (balance < totalPrice) {
          const missing = totalPrice - balance
          showToast(
            `Yetersiz bakiye! Mevcut bakiyeniz: ${balance.toFixed(2)}₺, Eksik: ${missing.toFixed(2)}₺. Lütfen kupon satın alın.`,
            'error'
          )
          router.push('/coupons')
          return
        }
      } catch (error) {
        console.error('Balance check error:', error)
        showToast('Bakiye kontrolü yapılırken bir hata oluştu. Lütfen tekrar deneyin.', 'error')
        return
      }
    }

    setIsProcessing(true)
    setProcessingIndex(null)
    setOrderResults([])

    try {
      // Save API key to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('smmturk_api_key', currentApiKey)
      }

      const results: Array<{ orderId: number; success: boolean; error?: string; packageName?: string }> = []
      const ordersToSave: Array<{
        service_id: string
        service_name: string
        package_id: string
        package_name: string
        quantity: number
        link: string
        price: number
        total_price: number
        smmturk_order_id?: number
      }> = []

      // Create orders for each cart item with their own URLs
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        setProcessingIndex(i)
        
        try {
          // packageId SMMTurk servis ID'sini içeriyor (örn: '9403')
          const serviceId = parseInt(item.packageId)
          if (isNaN(serviceId)) {
            console.error('❌ Geçersiz servis ID:', {
              packageId: item.packageId,
              packageName: item.packageName,
            })
            results.push({
              orderId: 0,
              success: false,
              error: `Geçersiz servis ID (packageId: ${item.packageId})`,
              packageName: item.packageName,
            })
            setOrderResults([...results])
            continue
          }

          // Debug: Sipariş detaylarını logla
          console.log('📦 Sipariş oluşturuluyor:', {
            packageName: item.packageName,
            serviceId: serviceId,
            url: item.url,
            quantity: item.amount,
          })

          const response = await smmturkClient.addOrder(
            currentApiKey,
            serviceId,
            item.url,
            item.amount
          )

          console.log('✅ Sipariş başarılı:', {
            packageName: item.packageName,
            orderId: response.order,
          })

          results.push({
            orderId: response.order,
            success: true,
            packageName: item.packageName,
          })

          // Başarılı siparişleri veritabanına kaydetmek için hazırla
          ordersToSave.push({
            service_id: item.serviceId,
            service_name: item.serviceName,
            package_id: item.packageId,
            package_name: item.packageName,
            quantity: item.amount,
            link: item.url,
            price: item.totalPrice / item.amount, // Birim fiyat
            total_price: item.totalPrice,
            smmturk_order_id: response.order,
          })

          // Her başarılı siparişte sonuçları güncelle
          setOrderResults([...results])
        } catch (error) {
          console.error('❌ Sipariş hatası:', {
            packageName: item.packageName,
            error: error instanceof Error ? error.message : 'Bilinmeyen hata',
          })
          results.push({
            orderId: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Bilinmeyen hata',
            packageName: item.packageName,
          })
          setOrderResults([...results])
        }
      }

      setProcessingIndex(null)

      // Başarılı siparişleri veritabanına kaydet ve bakiyeden düş
      if (ordersToSave.length > 0) {
        try {
          console.log('💾 Veritabanına kaydediliyor:', ordersToSave.length, 'sipariş')
          const savedOrders = await createMultipleOrders(ordersToSave)
          console.log('✅ Siparişler veritabanına kaydedildi')

          // Bakiyeden düş (her sipariş için)
          if (user) {
            for (const order of savedOrders) {
              try {
                await deductBalance(order.total_price, order.id)
                console.log(`✅ Bakiye düşürüldü: ${order.total_price}₺ (Sipariş: ${order.id})`)
              } catch (balanceError) {
                console.error('❌ Bakiye düşürme hatası:', balanceError)
                // Hata olsa bile sipariş kaydedildi, sadece logla
              }
            }
            
            // Bakiye güncelle
            const newBalance = await getUserBalance()
            setUserBalance(newBalance)
          }
        } catch (dbError) {
          console.error('❌ Veritabanı kayıt hatası:', dbError)
          showToast('Siparişler oluşturuldu ancak veritabanına kaydedilirken bir hata oluştu.', 'error')
        }
      }

      // If all orders succeeded, clear cart
      const allSuccess = results.every((r) => r.success)
      if (allSuccess) {
        showToast(`Tüm siparişler başarıyla oluşturuldu! (${results.length} sipariş)`, 'success')
        setTimeout(() => {
          clearCart()
          setOrderResults([])
          router.push('/orders')
        }, 2000)
      } else {
        const successCount = results.filter((r) => r.success).length
        const failedCount = results.length - successCount
        if (successCount > 0) {
          showToast(`${successCount} sipariş başarılı, ${failedCount} sipariş başarısız oldu.`, 'info')
          setTimeout(() => {
            router.push('/orders')
          }, 3000)
        } else {
          showToast('Tüm siparişler başarısız oldu. Lütfen tekrar deneyin.', 'error')
        }
      }
    } catch (error) {
      showToast('Sipariş oluşturulurken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'), 'error')
    } finally {
      setIsProcessing(false)
      setProcessingIndex(null)
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
        {cartItems.length === 0 ? (
          <EmptyState onBack={() => router.push('/')} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onQuantityChange={(delta) => handleQuantityChange(item.id, delta, item.amount)}
                  isProcessing={isProcessing}
                  processingIndex={processingIndex ?? undefined}
                  itemIndex={index}
                />
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-card rounded-2xl p-4 sm:p-6 border border-dark-card-light/80 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-4">Sipariş Özeti</h2>
                
                {/* Balance Display */}
                {user && (
                  <div className="mb-4 p-3 bg-dark-bg/60 rounded-xl border border-dark-card-light/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm font-medium">Mevcut Bakiye</span>
                      {isLoadingBalance ? (
                        <span className="text-gray-400 text-sm">Yükleniyor...</span>
                      ) : (
                        <span className={`font-bold text-base ${
                          userBalance !== null && userBalance < total
                            ? 'text-red-400'
                            : 'text-primary-green'
                        }`}>
                          {userBalance !== null ? `${userBalance.toFixed(2)}₺` : '0.00₺'}
                        </span>
                      )}
                    </div>
                    {userBalance !== null && userBalance < total && (
                      <p className="text-red-400 text-xs mt-2">
                        Yetersiz bakiye! Eksik: {(total - userBalance).toFixed(2)}₺
                      </p>
                    )}
                  </div>
                )}
                
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

                {/* Progress Indicator */}
                {isProcessing && (
                  <div className="mb-4 pb-4 border-b border-dark-card-light">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold text-sm">İlerleme</p>
                      <p className="text-primary-green text-sm font-medium">
                        {orderResults.length} / {cartItems.length}
                      </p>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div
                        className="bg-primary-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(orderResults.length / cartItems.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Order Results */}
                {orderResults.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-dark-card-light space-y-2 max-h-[300px] overflow-y-auto">
                    <h3 className="text-white font-semibold text-sm mb-2">Sipariş Sonuçları</h3>
                    {orderResults.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-2 p-2 rounded-lg ${
                          result.success
                            ? 'bg-primary-green/10 border border-primary-green/30'
                            : 'bg-red-500/10 border border-red-500/30'
                        }`}
                      >
                        {result.success ? (
                          <CheckCircle2 className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          {result.success ? (
                            <div>
                              <p className="text-xs text-primary-green font-medium">
                                Sipariş #{result.orderId}
                              </p>
                              {result.packageName && (
                                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                                  {result.packageName}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div>
                              <p className="text-xs text-red-400 font-medium">
                                {result.packageName || 'Sipariş'}
                              </p>
                              <p className="text-xs text-red-300 mt-0.5">
                                {result.error || 'Hata oluştu'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  {/* Kupon Satın Al Butonu - Her Zaman Görünür */}
                  <Link
                    href="/coupons"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 hover:scale-[1.02] transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    Kupon Satın Al
                  </Link>
                  
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.confirm('Sepeti temizlemek istediğinize emin misiniz?')) {
                        clearCart()
                        setOrderResults([])
                        showToast('Sepet temizlendi', 'success')
                      }
                    }}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-4 rounded-xl bg-dark-card-light text-gray-300 font-semibold text-sm hover:bg-dark-card-light/80 hover:text-white transition-all touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sepeti Temizle
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={
                      isProcessing || 
                      cartItems.length === 0 || 
                      !user || 
                      cartItems.some(item => !item.url || !item.url.trim()) ||
                      (userBalance !== null && userBalance < total)
                    }
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-green to-primary-green-dark text-white font-bold text-sm shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all touch-manipulation active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sipariş Oluşturuluyor...
                      </>
                    ) : !user ? (
                      'Giriş Yapın'
                    ) : userBalance !== null && userBalance < total ? (
                      'Yetersiz Bakiye'
                    ) : (
                      'Sipariş Oluştur'
                    )}
                  </button>
                  {user && userBalance !== null && userBalance < total && (
                    <Link
                      href="/coupons"
                      className="w-full py-3.5 px-4 rounded-xl bg-primary-green/20 text-primary-green font-semibold text-sm hover:bg-primary-green/30 transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2 border border-primary-green/30"
                    >
                      Kupon Satın Al
                    </Link>
                  )}
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
