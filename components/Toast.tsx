'use client'

import { useEffect } from 'react'
import { Check, X, ShoppingCart } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const bgColor =
    type === 'success'
      ? 'bg-gradient-to-r from-primary-green to-primary-green-dark'
      : type === 'error'
      ? 'bg-gradient-to-r from-red-500 to-red-600'
      : 'bg-gradient-to-r from-blue-500 to-blue-600'

  return (
    <div className="animate-slide-in">
      <div
        className={`${bgColor} text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md border border-white/20 backdrop-blur-sm relative`}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          {type === 'success' ? (
            <ShoppingCart className="w-5 h-5" />
          ) : type === 'error' ? (
            <X className="w-5 h-5" />
          ) : (
            <Check className="w-5 h-5" />
          )}
        </div>
        <p className="flex-1 font-semibold text-sm leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1.5 transition"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
