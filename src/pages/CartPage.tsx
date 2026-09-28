import { Link } from 'react-router-dom'
import { ProductImage } from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { catalogueProducts } from '../data/catalogue'
import { OrderRequestForm } from '../components/OrderRequestForm'

export function CartPage() {
  const { items, setQuantity, removeFromCart } = useCart()
  const cartProducts = items.flatMap((item) => {
    const product = catalogueProducts.find((entry) => entry.id === item.productId)
    return product ? [{ product, quantity: item.quantity }] : []
  })

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
          <p className="cart-pricing-note">All products are Price on Request. Pricing will be confirmed by Omni; no numeric subtotal or total is available.</p>
          <ul className="cart-items-list" aria-label="Cart items">
            {cartProducts.map(({ product, quantity }) => (
              <li className="cart-item" key={product.id}>
                <ProductImage image={product.image} productName={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="product-category">{product.categoryName}</p>
                  <h2 className="cart-item-name">{product.name}</h2>
                  <p className="cart-price-line"><strong>Unit price:</strong> Price on Request</p>
                  <p className="cart-price-line"><strong>Line price:</strong> Price on Request</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control" role="group" aria-label={`Quantity controls for ${product.name}`}>
                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >−</button>
                    <output className="quantity-value" aria-label={`Quantity: ${quantity}`}>{quantity}</output>
                    <button
                      type="button"
                      className="quantity-button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >+</button>
                  </div>
                  <button type="button" className="remove-cart-item" onClick={() => removeFromCart(product.id)}>
                    Remove<span className="visually-hidden"> {product.name} from cart</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <OrderRequestForm items={cartProducts.map(({ product, quantity }) => ({ productName: product.name, quantity }))} />
        </>
      )}
    </main>
  )
}
