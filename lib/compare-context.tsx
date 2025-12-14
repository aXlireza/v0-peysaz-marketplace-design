"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CompareProduct {
  id: string
  name: string
  nameFA: string
  image: string
  price: number
  category: string
  rating: number
  reviews: number
  supplier: string
  verified: boolean
  inStock: boolean
  specs?: Record<string, string>
}

interface CompareContextType {
  items: CompareProduct[]
  addItem: (product: CompareProduct) => boolean
  removeItem: (id: string) => void
  clearAll: () => void
  isInCompare: (id: string) => boolean
  maxItems: number
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareProduct[]>([])
  const maxItems = 4

  useEffect(() => {
    const saved = localStorage.getItem("peysaz-compare")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("peysaz-compare", JSON.stringify(items))
  }, [items])

  const addItem = (product: CompareProduct): boolean => {
    if (items.length >= maxItems) return false
    if (items.some((i) => i.id === product.id)) return false
    setItems((prev) => [...prev, product])
    return true
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearAll = () => {
    setItems([])
  }

  const isInCompare = (id: string) => items.some((i) => i.id === id)

  return (
    <CompareContext.Provider value={{ items, addItem, removeItem, clearAll, isInCompare, maxItems }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
