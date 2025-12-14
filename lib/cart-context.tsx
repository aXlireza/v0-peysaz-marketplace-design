"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  nameFA: string
  image: string
  price: number
  quantity: number
  supplier: string
  inStock: boolean
  maxQty: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  isInCart: (id: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("peysaz-cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("peysaz-cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxQty) } : i,
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxQty)) } : i)),
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const getItemCount = () => items.reduce((sum, i) => sum + i.quantity, 0)

  const isInCart = (id: string) => items.some((i) => i.id === id)

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, getTotal, getItemCount, isInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
