import { useEffect } from 'react'

declare global {
  interface Window {
    PinUtils?: { build: () => void }
  }
}

type PinterestPinEmbedProps = {
  pinUrl: string
  productName: string
}

let pinterestScriptPromise: Promise<void> | undefined

function loadPinterestWidget(): Promise<void> {
  if (window.PinUtils?.build) return Promise.resolve()
  if (pinterestScriptPromise) return pinterestScriptPromise

  pinterestScriptPromise = new Promise<void>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>('script[data-pinterest-pin-widget]')

    if (!script) {
      script = document.createElement('script')
      script.src = 'https://assets.pinterest.com/js/pinit.js'
      script.async = true
      script.defer = true
      script.dataset.pinterestPinWidget = 'true'
    }

    if (script.dataset.loaded === 'true' && window.PinUtils?.build) {
      resolve()
      return
    }

    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('Pinterest widget could not be loaded.')), { once: true })

    if (!script.isConnected) document.body.append(script)
  })

  return pinterestScriptPromise
}

export function PinterestPinEmbed({ pinUrl, productName }: PinterestPinEmbedProps) {
  useEffect(() => {
    let mounted = true

    void loadPinterestWidget()
      .then(() => {
        if (mounted) window.PinUtils?.build()
      })
      .catch(() => {
        // Keep the original Pin link available when Pinterest blocks the widget script.
      })

    return () => {
      mounted = false
    }
  }, [pinUrl])

  return (
    <figure className="pinterest-reference-figure product-detail-image">
      <figcaption className="pinterest-reference-note">
        Pinterest reference — not verified as the supplied product
      </figcaption>
      <div className="pinterest-reference-embed">
        <a
          href={pinUrl}
          data-pin-do="embedPin"
          aria-label={`Open Pinterest reference for ${productName}; it is not verified as the supplied product.`}
        >
          View Pinterest reference for {productName}
        </a>
      </div>
    </figure>
  )
}
