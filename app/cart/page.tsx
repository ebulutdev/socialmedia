'use client'

import { useRouter } from 'next/navigation'
import { Trash2, Minus, Plus, Package, ChevronRight, Sparkles, ArrowLeft } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'
import Header from '@/components/Header'
import LiveSupport from '@/components/LiveSupport'
import FloatingCartButton from '@/components/FloatingCartButton'

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
  const { items, removeFromCart, clearCart, getTotalPrice, getItemCount, updateQuantity } = useCart()

  const handleQuantityChange = (id: string, delta: number, currentAmount: number) => {
    const step = currentAmount >= STEP_LARGE ? STEP_LARGE : STEP_SMALL
    const next = Math.max(MIN_AMOUNT, currentAmount + delta * step)
    if (next < MIN_AMOUNT) return
    updateQuantity(id, next)
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

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.confirm('Sepeti temizlemek istediğinize emin misiniz?')) {
                        clearCart()
                      }
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-dark-card-light text-gray-300 font-semibold text-sm hover:bg-dark-card-light/80 hover:text-white transition-all touch-manipulation active:scale-[0.98]"
                  >
                    Sepeti Temizle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') window.alert('Ödeme sayfasına yönlendirileceksiniz.')
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-green to-primary-green-dark text-white font-bold text-sm shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:scale-[1.02] transition-all touch-manipulation active:scale-[0.98]"
                  >
                    Ödeme Yap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
