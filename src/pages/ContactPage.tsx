import { createGeneralWhatsAppUrl } from '../config/whatsapp'

export function ContactPage() {
  const whatsAppUrl = createGeneralWhatsAppUrl()

  return (
    <main id="main-content" className="page-main content-main information-page">
      <p className="eyebrow">Contact</p>
      <h1>Contact Waki</h1>
      <section className="contact-card" aria-labelledby="whatsapp-heading">
        <h2 id="whatsapp-heading">WhatsApp enquiries</h2>
        <p>Send a general enquiry to Waki Industrial and General Supplies on WhatsApp.</p>
        <p className="contact-number"><span>WhatsApp number</span><strong>0536437017</strong></p>
        <a className="button button-primary" href={whatsAppUrl} target="_blank" rel="noreferrer">
          Contact Waki on WhatsApp
        </a>
      </section>
      <p className="contact-details-note">Other contact details will be added when confirmed.</p>
    </main>
  )
}
