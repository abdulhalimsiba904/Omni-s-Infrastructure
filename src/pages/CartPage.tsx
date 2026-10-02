import { Link } from 'react-router-dom'
import { ProductImage } from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { catalogueProducts } from '../data/catalogue'
import { OrderRequestForm } from '../components/OrderRequestForm'
import { formatGhs, getPriceLabel } from '../components/ProductPrice'

export function CartPage() {
  const { items, setQuantity, setVariant, removeFromCart } = useCart()
  const cartProducts = items.flatMap((item) => {
    const product = catalogueProducts.find((entry) => entry.id === item.productId)
    if (!product) return []
    const selected = product.price.status === 'variants'
      ? product.price.options.find(({ id }) => id === item.variantId)
      : undefined
    const minimum = product.price.status === 'fixed' ? product.price.amount
      : product.price.status === 'range' ? product.price.minimum
        : product.price.status === 'variants' ? selected?.amount : undefined
    const maximum = product.price.status === 'fixed' ? product.price.amount
      : product.price.status === 'range' ? product.price.maximum
        : product.price.status === 'variants' ? selected?.amount : undefined
    const unitLabel = product.price.status === 'variants'
      ? selected ? `${selected.label} — ${formatGhs(selected.amount)}` : 'Select capacity to see price'
      : getPriceLabel(product.price)
    const lineLabel = minimum === undefined || maximum === undefined ? unitLabel
      : minimum === maximum ? formatGhs(minimum * item.quantity)
        : `${formatGhs(minimum * item.quantity)}–${formatGhs(maximum * item.quantity)}`
    return [{
      ...item,
      product,
      unitLabel,
      lineLabel,
      totalMinimum: minimum === undefined ? undefined : minimum * item.quantity,
      totalMaximum: maximum === undefined ? undefined : maximum * item.quantity,
    }]
  })

  const pricedItems = cartProducts.filter(({ totalMinimum }) => totalMinimum !== undefined)
  const totalMinimum = pricedItems.reduce((total, item) => total + (item.totalMinimum ?? 0), 0)
  const totalMaximum = pricedItems.reduce((total, item) => total + (item.totalMaximum ?? 0), 0)
  const excludedCount = cartProducts.length - pricedItems.length

  return (
    <main id="main-content" className="page-main content-main cart-main">
      <p className="eyebrow">Your selections</p>
      <h1>Your Cart</h1>

      {cartProducts.length === 0 ? (
        <section className="cart-empty" aria-labelledby="empty-cart-heading">
          <h2 id="empty-cart-heading">Your cart is empty</h2>
          <p>Browse the catalogue and add products you’d like to enquire about.</p>
          <Link className="button button-primary" to="/shop">Shop Products</Link>
        </section>
      ) : (
        <>
          <section className="cart-total-summary" aria-live="polite" aria-label="Cart total">
            {pricedItems.length === 0 ? (
              <p><strong>Total unavailable until prices are confirmed.</strong></p>
            ) : (
              <p><strong>Priced items total:</strong> {totalMinimum === totalMaximum
                ? formatGhs(totalMinimum)
                : `${formatGhs(totalMinimum)}–${formatGhs(totalMaximum)}`}</p>
            )}
            {excludedCount > 0 && <p>Coming Soon items and items without a selected capacity are excluded until priced.</p>}
            <p>Pricing will be confirmed by Omni.</p>
          </section>
          <ul className="cart-items-list" aria-label="Cart items">
            {cartProducts.map(({ product, quantity, variantId, unitLabel, lineLabel }) => (
              <li className="cart-item" key={`${product.id}:${variantId ?? 'unselected'}`}>
                <ProductImage image={product.image} productName={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="product-category">{product.categoryName}</p>
                  <h2 className="cart-item-name">{product.name}</h2>
                  {product.price.status === 'variants' && !variantId && (
                    <label className="capacity-choice cart-capacity-choice">
                      Furnace capacity
                      <select defaultValue="" onChange={(event) => { if (event.target.value) setVariant(product.id, event.target.value) }}>
                        <option value="">Select capacity</option>
                        {product.price.options.map(({ id, label, amount }) => <option key={id} value={id}>{label} — {formatGhs(amount)}</option>)}
                      </select>
                    </label>
                  )}
                  <p className="cart-price-line"><strong>Unit price:</strong> {unitLabel}</p>
                  <p className="cart-price-line"><strong>Line price:</strong> {lineLabel}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control" role="group" aria-label={`Quantity controls for ${product.name}`}>
                    <button type="button" className="quantity-button" aria-label={`Decrease quantity of ${product.name}`} disabled={quantity <= 1} onClick={() => setQuantity(product.id, quantity - 1, variantId)}>−</button>
                    <output className="quantity-value" aria-label={`Quantity: ${quantity}`}>{quantity}</output>
                    <button type="button" className="quantity-button" aria-label={`Increase quantity of ${product.name}`} onClick={() => setQuantity(product.id, quantity + 1, variantId)}>+</button>
                  </div>
                  <button type="button" className="remove-cart-item" onClick={() => removeFromCart(product.id, variantId)}>
                    Remove<span className="visually-hidden"> {product.name} from cart</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <OrderRequestForm items={cartProducts.map(({ product, quantity, variantId, totalMinimum, totalMaximum, unitLabel }) => ({
            productName: product.name,
            quantity,
            variantLabel: product.price.status === 'variants' ? product.price.options.find(({ id }) => id === variantId)?.label : undefined,
            unitPriceLabel: unitLabel,
            totalMinimum,
            totalMaximum,
          }))} />
        </>
      )}
    </main>
  )
}
