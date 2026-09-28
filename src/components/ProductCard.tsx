import type { CatalogueProduct } from '../data/catalogue'
import { Link } from 'react-router-dom'
import { ProductImage } from './ProductImage'
import { AddToCartButton } from './AddToCartButton'

type ProductCardProps = {
  product: CatalogueProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card" aria-labelledby={`product-${product.id}`}>
      <ProductImage image={product.image} productName={product.name} />
      <div className="product-card-content">
        <p className="product-category">{product.categoryName}</p>
        <h3 id={`product-${product.id}`} className="product-title">{product.name}</h3>
        {product.brand && <p className="product-detail"><strong>Brand:</strong> {product.brand}</p>}
        <p className="product-description">{product.description}</p>
        {product.specifications && (
          <dl className="product-specifications">
            {product.specifications.map(({ label, value, verification }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}{verification && <span className="verification-note"> {verification}</span>}</dd>
              </div>
            ))}
          </dl>
        )}
        {product.includedItems && (
          <div className="product-included">
            <p><strong>Included items</strong></p>
            <ul>{product.includedItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        )}
        {product.publicationNote && <p className="publication-note">{product.publicationNote}</p>}
        <div className="product-statuses" aria-label="Price and availability">
          <p><strong>Price:</strong> Price on Request</p>
          <p><strong>Availability:</strong> Unconfirmed</p>
        </div>
        <Link className="button button-secondary product-details-link" to={`/products/${product.id}`}>
          View Details<span className="visually-hidden">: {product.name}</span>
        </Link>
        <AddToCartButton product={product} />
      </div>
    </article>
  )
}
