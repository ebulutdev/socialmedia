'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  packageId: string
  packageName: string
  serviceId: string
  serviceName: string
  amount: number
  price: string
  totalPrice: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Aynı paket ve miktar varsa güncelle, yoksa ekle
      const existingIndex = prev.findIndex(
        (i) => i.packageId === item.packageId && i.amount === item.amount
      )
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = item
        return updated
      }
      
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, newAmount: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Calculate new price based on original price per 1K
          const pricePer1K = item.totalPrice / (item.amount / 1000)
          const newTotalPrice = (pricePer1K * newAmount) / 1000
          return {
            ...item,
            amount: newAmount,
            totalPrice: newTotalPrice,
            price: newTotalPrice.toFixed(2).replace('.', ',') + '₺',
          }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }

  const getItemCount = () => {
    return items.length
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
