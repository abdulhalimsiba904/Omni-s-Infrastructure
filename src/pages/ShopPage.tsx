import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createMissingProductWhatsAppUrl } from '../config/whatsapp'
import { ProductCard } from '../components/ProductCard'
import { catalogueCategories, catalogueProducts } from '../data/catalogue'

export function ShopPage() {
  const [query, setQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategoryId = searchParams.get('category')
  const categoryId = catalogueCategories.some((category) => category.id === requestedCategoryId)
    ? requestedCategoryId!
    : 'all'
  const normalizedQuery = query.trim().toLowerCase()

  const filteredProducts = useMemo(() => catalogueProducts.filter((product) => {
    const matchesCategory = categoryId === 'all' || product.categoryId === categoryId
    if (!matchesCategory || !normalizedQuery) return matchesCategory

    const searchableText = [
      product.name,
      product.categoryName,
      product.description,
      product.brand,
      ...product.specifications?.flatMap(({ label, value, verification }) => [label, value, verification]) ?? [],
      ...product.includedItems ?? [],
      product.publicationNote,
      ...product.searchKeywords,
    ].filter(Boolean).join(' ').toLowerCase()

    return searchableText.includes(normalizedQuery)
  }), [categoryId, normalizedQuery])

  const hasSearchQuery = query.trim().length > 0
  const missingProductUrl = createMissingProductWhatsAppUrl(query)

  return (
    <main id="main-content" className="page-main content-main catalogue-main">
      <header className="catalogue-heading">
        <p className="eyebrow">Shop</p>
        <h1>Product Catalogue</h1>
        <p className="page-copy">Browse products across the categories below. Prices and availability are subject to confirmation.</p>
      </header>
      <section className="catalogue-controls" aria-label="Catalogue search and filters">
        <div className="catalogue-control">
          <label htmlFor="catalogue-search">Search products</label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by product, brand, or keyword"
          />
        </div>
        <div className="catalogue-control">
          <label htmlFor="catalogue-category">Filter by category</label>
          <select
            id="catalogue-category"
            value={categoryId}
            onChange={(event) => {
              const nextCategoryId = event.target.value
              setSearchParams((current) => {
                const next = new URLSearchParams(current)
                if (nextCategoryId === 'all') next.delete('category')
                else next.set('category', nextCategoryId)
                return next
              })
            }}
          >
            <option value="all">All categories</option>
            {catalogueCategories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </section>
      <p className="catalogue-result-count" role="status" aria-live="polite">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </p>

      {filteredProducts.length > 0 ? catalogueCategories.map((category) => {
        const products = filteredProducts.filter((item) => item.categoryId === category.id)
        if (products.length === 0) return null
        return (
          <section className="catalogue-category" key={category.id} aria-labelledby={`category-${category.id}`}>
            <h2 id={`category-${category.id}`} className="category-heading">{category.name}</h2>
            <div className="product-grid">
              {products.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )
      }) : (
        <section className="catalogue-empty" aria-labelledby="empty-title">
          <h2 id="empty-title">No products found</h2>
          {hasSearchQuery ? (
            <>
              <p>We couldn’t find “{query}” in our online catalogue. Can’t find what you’re looking for?</p>
              <a className="button button-primary" href={missingProductUrl} target="_blank" rel="noreferrer">
                Ask Omni on WhatsApp
              </a>
            </>
          ) : (
            <p>There are no catalogue products in this category yet. Choose another category to continue browsing.</p>
          )}
        </section>
      )}
    </main>
  )
}
