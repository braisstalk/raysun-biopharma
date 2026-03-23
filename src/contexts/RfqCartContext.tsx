'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface RfqItem {
  productId: string
  productName: string
  slug: string
  quantity: number
}

interface RfqCartContextType {
  items: RfqItem[]
  itemCount: number
  addItem: (item: Omit<RfqItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const RfqCartContext = createContext<RfqCartContextType | null>(null)

export function RfqCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RfqItem[]>([])

  const addItem = (item: Omit<RfqItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId)
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setItems([])

  return (
    <RfqCartContext.Provider
      value={{
        items,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </RfqCartContext.Provider>
  )
}

export function useRfqCart() {
  const context = useContext(RfqCartContext)
  if (!context) {
    throw new Error('useRfqCart must be used within RfqCartProvider')
  }
  return context
}
