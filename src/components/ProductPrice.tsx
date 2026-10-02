import type { CataloguePrice } from '../data/catalogue'

export function formatGhs(amount: number) {
  return `GHS ${amount.toLocaleString('en-GH')}`
}

export function getPriceLabel(price: CataloguePrice, variantId?: string) {
  if (price.status === 'coming-soon') return 'Coming Soon'
  if (price.status === 'fixed') return formatGhs(price.amount)
  if (price.status === 'range') return `${formatGhs(price.minimum)}–${formatGhs(price.maximum)}`
  const option = price.options.find(({ id }) => id === variantId)
  return option ? `${option.label} — ${formatGhs(option.amount)}` : 'Select capacity'
}

export function ProductPrice({ price }: { price: CataloguePrice }) {
  if (price.status === 'variants') {
    return (
      <span className="product-price-options">
        {price.options.map((option, index) => (
          <span key={option.id}>{index > 0 ? ' · ' : ''}{option.label}: {formatGhs(option.amount)}</span>
        ))}
      </span>
    )
  }
  return <>{getPriceLabel(price)}</>
}
