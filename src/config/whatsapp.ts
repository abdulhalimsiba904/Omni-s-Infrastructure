export const omniWhatsAppNumber = '233536437017'

export function createGeneralWhatsAppUrl() {
  const message = 'Hello Waki Industrial and General Supplies, I have a general enquiry.'
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

export function createMissingProductWhatsAppUrl(query: string) {
  const message = `Hello Waki Industrial and General Supplies, I'm looking for "${query}", but I couldn't find it on your website. Do you have it available?`
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

export function createProductAvailabilityWhatsAppUrl(productName: string) {
  const message = `Hello Waki Industrial and General Supplies, is the "${productName}" available?`
  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}

type OrderRequestDetails = {
  items: {
    productName: string
    quantity: number
    variantLabel?: string
    unitPriceLabel: string
    totalMinimum?: number
    totalMaximum?: number
  }[]
  customerName: string
  phoneNumber: string
  location: string
  note?: string
}

export function createOrderRequestWhatsAppUrl(details: OrderRequestDetails) {
  const productLines = details.items
    .map(({ productName, quantity, variantLabel, unitPriceLabel }) => `- ${productName}${variantLabel ? ` (${variantLabel})` : ''} × ${quantity} — Unit price: ${unitPriceLabel}`)
    .join('\n')
  const pricedLines = details.items.filter(({ totalMinimum }) => totalMinimum !== undefined)
  const totalMinimum = pricedLines.reduce((sum, item) => sum + (item.totalMinimum ?? 0), 0)
  const totalMaximum = pricedLines.reduce((sum, item) => sum + (item.totalMaximum ?? 0), 0)
  const formatGhs = (amount: number) => `GHS ${amount.toLocaleString('en-GH')}`
  const totalLine = pricedLines.length === 0
    ? 'Priced items total: Total unavailable until prices are confirmed.'
    : `Priced items total: ${totalMinimum === totalMaximum ? formatGhs(totalMinimum) : `${formatGhs(totalMinimum)}–${formatGhs(totalMaximum)}`}`
  const comingSoonCount = details.items.reduce((count, item) => count + (item.unitPriceLabel === 'Coming Soon' ? item.quantity : 0), 0)
  const capacityCount = details.items.reduce((count, item) => count + (item.unitPriceLabel === 'Select capacity to see price' ? item.quantity : 0), 0)
  const noteLine = details.note?.trim() ? `\nAdditional note: ${details.note.trim()}` : ''
  const message = [
    'ORDER REQUEST / ENQUIRY (not a confirmed order)',
    'Hello Waki Industrial and General Supplies,',
    'I would like to enquire about these products:',
    productLines,
    '',
    totalLine,
    `Coming Soon items are excluded from the priced-items total${comingSoonCount > 0 ? ` (${comingSoonCount} item${comingSoonCount === 1 ? '' : 's'})` : ''}.`,
    ...(capacityCount > 0 ? [`Items without a selected capacity are excluded from the priced-items total (${capacityCount} item${capacityCount === 1 ? '' : 's'}).`] : []),
    'Amounts are based on the client-provided catalogue and should be confirmed by Waki. Availability is unconfirmed. This enquiry does not confirm an order or payment.',
    '',
    `Customer name: ${details.customerName.trim()}`,
    `Phone number: ${details.phoneNumber.trim()}`,
    `Location/address: ${details.location.trim()}${noteLine}`,
  ].join('\n')

  return `https://wa.me/${omniWhatsAppNumber}?text=${encodeURIComponent(message)}`
}
