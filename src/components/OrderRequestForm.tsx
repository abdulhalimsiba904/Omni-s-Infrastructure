import { useState, type FormEvent } from 'react'
import { createOrderRequestWhatsAppUrl } from '../config/whatsapp'

type OrderRequestFormProps = {
  items: {
    productName: string
    quantity: number
    variantLabel?: string
    unitPriceLabel: string
    totalMinimum?: number
    totalMaximum?: number
  }[]
}

export function OrderRequestForm({ items }: OrderRequestFormProps) {
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [location, setLocation] = useState('')
  const [note, setNote] = useState('')
  const [touched, setTouched] = useState({ name: false, phone: false, location: false })

  const nameError = touched.name && !customerName.trim()
  const phoneError = touched.phone && !phoneNumber.trim()
  const locationError = touched.location && !location.trim()
  const canSend = items.length > 0 && Boolean(customerName.trim() && phoneNumber.trim() && location.trim())

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSend) return

    const url = createOrderRequestWhatsAppUrl({ items, customerName, phoneNumber, location, note })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="order-request" aria-labelledby="order-request-heading">
      <h2 id="order-request-heading">Send Order via WhatsApp</h2>
      <p className="order-request-intro">
        Send an order enquiry to Omni. This is a request only; pricing and availability are not confirmed here.
      </p>
      <form className="order-request-form" onSubmit={handleSubmit}>
        <div className="order-form-field">
          <label htmlFor="order-customer-name">Your name <span aria-hidden="true">*</span></label>
          <input
            id="order-customer-name"
            name="customerName"
            autoComplete="name"
            required
            value={customerName}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? 'order-name-error' : undefined}
            onChange={(event) => setCustomerName(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
          />
          {nameError && <span className="order-field-error" id="order-name-error">Enter your name.</span>}
        </div>
        <div className="order-form-field">
          <label htmlFor="order-phone-number">Phone number <span aria-hidden="true">*</span></label>
          <input
            id="order-phone-number"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            required
            value={phoneNumber}
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? 'order-phone-error' : undefined}
            onChange={(event) => setPhoneNumber(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
          />
          {phoneError && <span className="order-field-error" id="order-phone-error">Enter your phone number.</span>}
        </div>
        <div className="order-form-field">
          <label htmlFor="order-location">Location or delivery address <span aria-hidden="true">*</span></label>
          <textarea
            id="order-location"
            name="location"
            autoComplete="street-address"
            rows={3}
            required
            value={location}
            aria-invalid={Boolean(locationError)}
            aria-describedby={locationError ? 'order-location-error' : undefined}
            onChange={(event) => setLocation(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, location: true }))}
          />
          {locationError && <span className="order-field-error" id="order-location-error">Enter your location or address.</span>}
        </div>
        <div className="order-form-field">
          <label htmlFor="order-additional-note">Additional note <span className="optional-label">(optional)</span></label>
          <textarea
            id="order-additional-note"
            name="note"
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
        {!canSend && <p className="order-form-hint" id="order-form-hint">Enter your name, phone number, and location/address to enable WhatsApp.</p>}
        <button className="button button-primary order-submit" type="submit" disabled={!canSend} aria-describedby={!canSend ? 'order-form-hint' : undefined}>
          Send Order via WhatsApp
        </button>
      </form>
    </section>
  )
}
