export const omniWhatsAppNumber = '233536437017'

export function createGeneralWhatsAppUrl() {
  const message = 'Hello Omni Industrial and Building Supplies, I have a general enquiry.'
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

export function createMissingProductWhatsAppUrl(query: string) {
  const message = `Hello Omni Industrial and Building Supplies, I'm looking for "${query}", but I couldn't find it on your website. Do you have it available?`
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

export function createProductAvailabilityWhatsAppUrl(productName: string) {
  const message = `Hello Omni Industrial and Building Supplies, is the "${productName}" available?`
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

type OrderRequestDetails = {
  items: { productName: string; quantity: number }[]
  customerName: string
  phoneNumber: string
  location: string
  note?: string
}

export function createOrderRequestWhatsAppUrl(details: OrderRequestDetails) {
  const productLines = details.items
    .map(({ productName, quantity }) => `- ${productName} × ${quantity} — Price: Price on Request`)
    .join('\n')
  const noteLine = details.note?.trim() ? `\nAdditional note: ${details.note.trim()}` : ''
  const message = [
    'ORDER REQUEST / ENQUIRY (not a confirmed order)',
    'Hello Omni Industrial and Building Supplies,',
    'I would like to enquire about these products:',
    productLines,
    '',
    'Pricing is not yet confirmed by Omni. Please confirm pricing and availability. This enquiry does not confirm an order.',
    '',
    `Customer name: ${details.customerName.trim()}`,
    `Phone number: ${details.phoneNumber.trim()}`,
    `Location/address: ${details.location.trim()}${noteLine}`,
  ].join('\n')

  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}
