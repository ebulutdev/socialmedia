'use client'

import { useState } from 'react'
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'

export default function Cart() {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-green text-white text-[10px] sm:text-xs font-semibold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg shadow-primary-green/30">
          0
        </span>
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-green text-white text-[10px] sm:text-xs font-semibold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg shadow-primary-green/30">
          {items.length}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Sidebar - Mobile Full Screen */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-[90vw] md:w-96 max-w-md bg-dark-bg border-l border-dark-card z-50 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-dark-card p-3 sm:p-4 border-b border-dark-card-light flex items-center justify-between">
              <h2 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 text-primary-green" />
                Sepetim ({items.length})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-dark-card rounded-lg p-3 border border-dark-card-light"
                >
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2">
                        {item.packageName}
                      </h3>
                      <p className="text-gray-400 text-[10px] sm:text-xs mb-1">
                        {item.serviceName}
                      </p>
                      <p className="text-primary-green text-[10px] sm:text-xs font-semibold">
                        Miktar: {item.amount.toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-400 transition ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-dark-card-light">
                    <span className="text-gray-400 text-[10px] sm:text-xs">Fiyat:</span>
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {item.totalPrice.toFixed(2).replace('.', ',')}₺
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-dark-card p-3 sm:p-4 border-t border-dark-card-light space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-semibold text-sm sm:text-base">Toplam:</span>
                <span className="text-primary-green font-bold text-lg sm:text-xl">
                  {getTotalPrice().toFixed(2).replace('.', ',')}₺
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-dark-card-light text-gray-300 py-3 px-4 rounded-lg hover:bg-dark-card-light/80 transition text-sm font-medium min-h-[44px]"
                >
                  Sepeti Temizle
                </button>
                <button
                  onClick={() => {
                    // Ödeme sayfasına yönlendir
                    alert('Ödeme sayfasına yönlendirileceksiniz')
                  }}
                  className="flex-1 bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-3 px-4 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 font-semibold text-sm min-h-[44px]"
                >
                  Ödeme Yap
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
