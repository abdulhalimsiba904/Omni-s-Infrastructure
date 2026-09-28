import { useState } from 'react'
import type { CatalogueProduct } from '../data/catalogue'
import { useCart } from '../context/CartContext'

export function AddToCartButton({ product }: { product: CatalogueProduct }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product.id)
    setAdded(true)
  }

  return (
    <>
      <button className="button button-primary add-to-cart-button" type="button" onClick={handleAdd} aria-label={`Add ${product.name} to cart`}>
        Add to Cart
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {added ? `${product.name} added to cart.` : ''}
      </span>
    </>
  )
}
