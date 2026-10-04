import type { CatalogueImage } from '../data/catalogue'

type ProductImageProps = {
  image: CatalogueImage
  productName: string
  className?: string
  showReferenceCaption?: boolean
}

export function ProductImage({ image, productName, className = '', showReferenceCaption = true }: ProductImageProps) {
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
      </figure>
    )
  }

  if (image.status === 'image-set') {
    return (
      <figure className={`product-visual product-image-set ${className}`} aria-label={`${productName} image references`}>
        <div className="product-image-set-grid">
          {image.images.map(({ src, alt }) => <img key={src} src={src} alt={alt} loading="lazy" />)}
        </div>
      </figure>
    )
  }

  if (image.status === 'unverified-local-reference') {
    return (
      <figure className={`product-visual ${className}`}>
        <img className="product-image-asset" src={image.src} alt={image.alt} loading="lazy" />
        {showReferenceCaption && <figcaption className="representative-image-note">{image.caption}</figcaption>}
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
