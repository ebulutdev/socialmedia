'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'

export default function FloatingCartButton() {
  const { getItemCount } = useCart()
  const count = getItemCount()

  return (
    <Link
      href="/cart"
      className="fixed left-3 sm:left-4 bottom-3 sm:bottom-4 z-[102] block"
      aria-label={`Sepet, ${count} ürün`}
    >
      <button className="bg-primary-green text-white p-3 rounded-full shadow-lg shadow-primary-green/30 hover:shadow-primary-green/40 hover:bg-primary-green-dark transition-all min-w-[52px] sm:min-w-[56px] min-h-[52px] sm:min-h-[56px] flex items-center justify-center relative group">
        <ShoppingCart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-primary-green text-[10px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-lg">
            {count}
          </span>
        )}
      </button>
    </Link>
  )
}
