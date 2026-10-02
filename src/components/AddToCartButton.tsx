import { useState } from 'react'
import type { CatalogueProduct } from '../data/catalogue'
import { useCart } from '../context/CartContext'

export function AddToCartButton({ product }: { product: CatalogueProduct }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [variantId, setVariantId] = useState('')

  function handleAdd() {
    setAdded(addToCart(product.id, variantId || undefined))
  }

  return (
    <>
      {product.price.status === 'variants' && (
        <label className="capacity-choice">
          Furnace capacity
          <select value={variantId} onChange={(event) => setVariantId(event.target.value)}>
            <option value="">Select capacity</option>
            {product.price.options.map(({ id, label, amount }) => (
              <option value={id} key={id}>{label} — GHS {amount.toLocaleString('en-GH')}</option>
            ))}
          </select>
        </label>
      )}
      <button className="button button-primary add-to-cart-button" type="button" onClick={handleAdd} disabled={product.price.status === 'variants' && !variantId} aria-label={`Add ${product.name} to cart`}>
        Add to Cart
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {added ? `${product.name}${variantId ? `, ${product.price.status === 'variants' ? product.price.options.find(({ id }) => id === variantId)?.label : ''}` : ''} added to cart.` : ''}
      </span>
    </>
  )
}
