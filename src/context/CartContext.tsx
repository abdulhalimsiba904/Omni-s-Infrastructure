import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalogueProducts } from '../data/catalogue'

const CART_STORAGE_KEY = 'omni-cart-v1'

export type CartItem = {
  productId: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  totalQuantity: number
  addToCart: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const knownProductIds = new Set(catalogueProducts.map((product) => product.id))

function readCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    const quantities = new Map<string, number>()
    for (const entry of parsed) {
      if (
        typeof entry === 'object' && entry !== null &&
        'productId' in entry && typeof entry.productId === 'string' &&
        'quantity' in entry && Number.isSafeInteger(entry.quantity) && entry.quantity > 0 &&
        knownProductIds.has(entry.productId)
      ) {
        quantities.set(entry.productId, (quantities.get(entry.productId) ?? 0) + entry.quantity)
      }
    }

    return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // The cart remains usable for this session when browser storage is unavailable.
    }
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (productId: string) => {
      if (!knownProductIds.has(productId)) return
      setItems((current) => {
        const existing = current.find((item) => item.productId === productId)
        return existing
          ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { productId, quantity: 1 }]
      })
    }

    const setQuantity = (productId: string, quantity: number) => {
      if (!Number.isSafeInteger(quantity)) return
      setItems((current) => current.map((item) => item.productId === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item))
    }

    const removeFromCart = (productId: string) => {
      setItems((current) => current.filter((item) => item.productId !== productId))
    }

    return {
      items,
      totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
      addToCart,
      setQuantity,
      removeFromCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
