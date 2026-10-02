import type { CatalogueImage } from '../data/catalogue'

type ProductImageProps = {
  image: CatalogueImage
  productName: string
  className?: string
}

export function ProductImage({ image, productName, className = '' }: ProductImageProps) {
  if (image.status === 'development-placeholder') {
    return (
      <div className={`product-image-placeholder ${className}`} role="img" aria-label={`${image.label} for ${productName}`}>
        <span aria-hidden="true">Image</span>
        <small>{image.label}</small>
      </div>
    )
  }

  if (image.status === 'temporary-pinterest-reference') {
    return (
      <figure className={`product-visual ${className}`}>
        <img className="product-image-asset" src={image.src} alt={image.alt} loading="lazy" />
        <figcaption className="representative-image-note">
          Illustrative reference — not verified as the supplied product.
        </figcaption>
      </figure>
    )
  }

  if (image.status === 'pinterest-local-reference') {
    return (
      <figure className={`product-visual ${className}`}>
        <img className="product-image-asset" src={image.src} alt={image.alt} loading="lazy" />
        <figcaption className="representative-image-note">
          Reference image — supplied product match and reuse rights are unverified.
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className={`product-visual ${className}`}>
      <img className="product-image-asset" src={image.src} alt={image.alt} loading="lazy" />
      {image.representation === 'representative' && (
        <figcaption className="representative-image-note">Representative image — not verified as the supplied product.</figcaption>
      )}
      {image.credit && (
        <figcaption className="image-attribution">
          Photo by <a href={image.credit.creatorUrl} target="_blank" rel="noreferrer">{image.credit.creator}</a>
          {' · '}<a href={image.credit.sourceUrl} target="_blank" rel="noreferrer">Source</a>
          {' · '}<a href={image.credit.licenseUrl} target="_blank" rel="noreferrer">{image.credit.license}</a>
          {` · ${image.credit.changes}`}
        </figcaption>
      )}
    </figure>
  )
}
