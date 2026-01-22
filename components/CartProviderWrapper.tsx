'use client'

import { CartProvider } from '@/lib/context/CartContext'
import { ToastProvider } from '@/lib/context/ToastContext'

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  )
}
