import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { catalogueCategories, catalogueProducts } from '../data/catalogue'

const featuredProductIds = [
  'all-in-one-solar-power-system',
  'portable-electronic-gram-scale',
  'aurorafox-camping-tents',
  'smart-one-piece-bidet-toilet',
]

export function HomePage() {
  const featuredProducts = catalogueProducts.filter((product) => featuredProductIds.includes(product.id))

  return (
    <main id="main-content" className="page-main home-page">
      <section className="hero home-main" aria-labelledby="home-title">
        <div className="hero-content">
          <p className="eyebrow">Waki Industrial and General Supplies</p>
          <h1 id="home-title">Supplies for industry, building, and beyond.</h1>
          <p className="hero-copy">
            Explore products across industrial, building, mining, solar, sanitary, safety, utility, and related categories.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/shop">Shop Products</Link>
            <Link className="button button-secondary" to="/contact">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="home-section category-showcase" aria-labelledby="category-showcase-title">
        <header className="home-section-heading">
          <p className="eyebrow">Browse by category</p>
          <h2 id="category-showcase-title">Find products for your needs</h2>
          <p>Explore the categories in the Waki catalogue.</p>
        </header>
        <ul className="home-category-grid">
          {catalogueCategories.map((category) => (
            <li key={category.id}>
              <Link className="home-category-card" to={`/shop?category=${encodeURIComponent(category.id)}`}>
                <span className="home-category-name">{category.name}</span>
                <span className="home-category-action">Browse category <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section featured-products" aria-labelledby="featured-products-title">
        <header className="home-section-heading featured-heading">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2 id="featured-products-title">Explore selected products</h2>
          </div>
          <Link className="text-link" to="/shop">View all products <span aria-hidden="true">→</span></Link>
        </header>
        <div className="product-grid">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  )
}
