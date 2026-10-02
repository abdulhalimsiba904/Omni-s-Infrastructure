import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalogueProducts } from '../data/catalogue'

const CART_STORAGE_KEY = 'omni-cart-v1'

export type CartItem = {
  productId: string
  quantity: number
  variantId?: string
}

type CartContextValue = {
  items: CartItem[]
  totalQuantity: number
  addToCart: (productId: string, variantId?: string) => boolean
  setQuantity: (productId: string, quantity: number, variantId?: string) => void
  setVariant: (productId: string, variantId: string) => void
  removeFromCart: (productId: string, variantId?: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const knownProductIds = new Set(catalogueProducts.map((product) => product.id))
const itemKey = (productId: string, variantId?: string) => `${productId}::${variantId ?? ''}`

function readCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    const quantities = new Map<string, CartItem>()
    for (const entry of parsed) {
      if (
        typeof entry === 'object' && entry !== null &&
        'productId' in entry && typeof entry.productId === 'string' &&
        'quantity' in entry && Number.isSafeInteger(entry.quantity) && entry.quantity > 0 &&
        knownProductIds.has(entry.productId)
      ) {
        const product = catalogueProducts.find(({ id }) => id === entry.productId)!
        const variantId = 'variantId' in entry && typeof entry.variantId === 'string' ? entry.variantId : undefined
        const validVariant = product.price.status !== 'variants' || product.price.options.some((option) => option.id === variantId)
        const retainedVariantId = validVariant ? variantId : undefined
        const key = itemKey(entry.productId, retainedVariantId)
        const existing = quantities.get(key)
        quantities.set(key, {
          productId: entry.productId,
          quantity: (existing?.quantity ?? 0) + entry.quantity,
          ...(retainedVariantId ? { variantId: retainedVariantId } : {}),
        })
      }
    }

    return Array.from(quantities.values())
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
    const addToCart = (productId: string, variantId?: string) => {
      const product = catalogueProducts.find((entry) => entry.id === productId)
      if (!product) return false
      if (product.price.status === 'variants' && !product.price.options.some((option) => option.id === variantId)) return false
      setItems((current) => {
        const existing = current.find((item) => itemKey(item.productId, item.variantId) === itemKey(productId, variantId))
        return existing
          ? current.map((item) => itemKey(item.productId, item.variantId) === itemKey(productId, variantId) ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { productId, quantity: 1, ...(variantId ? { variantId } : {}) }]
      })
      return true
    }

    const setQuantity = (productId: string, quantity: number, variantId?: string) => {
      if (!Number.isSafeInteger(quantity)) return
      setItems((current) => current.map((item) => itemKey(item.productId, item.variantId) === itemKey(productId, variantId)
        ? { ...item, quantity: Math.max(1, quantity) }
        : item))
    }

    const setVariant = (productId: string, variantId: string) => {
      setItems((current) => current.map((item) => item.productId === productId && !item.variantId
        ? { ...item, variantId }
        : item))
    }

    const removeFromCart = (productId: string, variantId?: string) => {
      setItems((current) => current.filter((item) => itemKey(item.productId, item.variantId) !== itemKey(productId, variantId)))
    }

    return {
      items,
      totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
      addToCart,
      setQuantity,
      setVariant,
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
