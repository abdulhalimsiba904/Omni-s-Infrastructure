import { Link, useParams } from 'react-router-dom'
import { ProductImage } from '../components/ProductImage'
import { createProductAvailabilityWhatsAppUrl } from '../config/whatsapp'
import { catalogueProducts } from '../data/catalogue'
import { AddToCartButton } from '../components/AddToCartButton'
import { PinterestPinEmbed } from '../components/PinterestPinEmbed'

export function ProductDetailPage() {
  const { productId } = useParams()
  const product = catalogueProducts.find((item) => item.id === productId)

  if (!product) {
    return (
      <main id="main-content" className="page-main content-main product-not-found">
        <p className="eyebrow">Product</p>
        <h1>Product not found</h1>
        <p className="page-copy">We couldn’t find that product in the catalogue.</p>
        <Link className="button button-primary" to="/shop">Back to Shop</Link>
      </main>
    )
  }

  const whatsAppUrl = createProductAvailabilityWhatsAppUrl(product.name)
  const hasLocalPinterestImage = product.image.status === 'pinterest-local-reference'

  return (
    <main id="main-content" className="page-main content-main product-detail-main">
      <Link className="back-to-shop" to="/shop">← Back to Shop</Link>
      <article className="product-detail-layout" aria-labelledby="product-detail-title">
        {hasLocalPinterestImage && product.pinterestReference ? (
          <div className="product-detail-media">
            <ProductImage
              image={product.image}
              productName={product.name}
              className="product-detail-image"
            />
            <details className="product-detail-pin-reference">
              <summary>View existing Pinterest reference</summary>
              <PinterestPinEmbed pinUrl={product.pinterestReference.pinUrl} productName={product.name} />
            </details>
          </div>
        ) : product.pinterestReference ? (
          <PinterestPinEmbed pinUrl={product.pinterestReference.pinUrl} productName={product.name} />
        ) : (
          <ProductImage
            image={product.image}
            productName={product.name}
            className="product-detail-image"
          />
        )}
        <div className="product-detail-content">
          <p className="eyebrow">{product.categoryName}</p>
          <h1 id="product-detail-title">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>

          {product.brand && <p className="detail-brand"><strong>Brand:</strong> {product.brand}</p>}

          {product.specifications && (
            <section className="detail-section" aria-labelledby="specifications-heading">
              <h2 id="specifications-heading">Specifications</h2>
              <dl className="product-specifications detail-specifications">
                {product.specifications.map(({ label, value, verification }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}{verification && <span className="verification-note"> {verification}</span>}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {product.includedItems && (
            <section className="detail-section" aria-labelledby="included-items-heading">
              <h2 id="included-items-heading">Included items</h2>
              <ul className="detail-included-list">
                {product.includedItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {product.publicationNote && <p className="publication-note detail-publication-note">{product.publicationNote}</p>}

          <dl className="detail-statuses">
            <div><dt>Price</dt><dd>Price on Request</dd></div>
            <div><dt>Availability</dt><dd>Unconfirmed</dd></div>
          </dl>

          <a className="button button-primary product-whatsapp-link" href={whatsAppUrl} target="_blank" rel="noreferrer">
            Ask about this product on WhatsApp
          </a>
          <AddToCartButton product={product} />
        </div>
      </article>
    </main>
  )
}
