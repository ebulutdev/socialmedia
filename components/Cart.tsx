'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'

export default function CartButton() {
  const { getItemCount } = useCart()
  const count = getItemCount()

  return (
    <Link
      href="/cart"
      className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-dark-card/80 transition-colors touch-manipulation"
      aria-label={`Sepet, ${count} ürün`}
    >
      <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
      <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 bg-primary-green text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 flex items-center justify-center px-1 shadow-lg shadow-primary-green/30">
        {count}
      </span>
    </Link>
  )
}
