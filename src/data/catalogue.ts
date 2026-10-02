export type ProductSpecification = {
  label: string
  value: string
  verification?: string
}

export type CatalogueCategory = {
  id: string
  name: string
}

export type CatalogueProduct = {
  id: string
  name: string
  categoryId: string
  categoryName: string
  description: string
  brand?: string
  specifications?: ProductSpecification[]
  includedItems?: string[]
  image: CatalogueImage
  price: CataloguePrice
  availabilityStatus: 'unconfirmed'
  publicationNote?: string
  pinterestReference?: { searchQuery: string; pinUrl: string; accessedAt: string }
  searchKeywords: string[]
}

export type CataloguePrice =
  | { status: 'coming-soon' }
  | { status: 'fixed'; amount: number }
  | { status: 'range'; minimum: number; maximum: number }
  | { status: 'variants'; options: { id: string; label: string; amount: number }[] }

export type CatalogueImage =
  | { status: 'development-placeholder'; label: string }
  | {
      status: 'pinterest-local-reference'
      src: string
      alt: string
    }
  | {
      status: 'temporary-pinterest-reference'
      src: string
      alt: string
      pinterestUrl: string
      originalSourceUrl?: string
    }
  | {
      status: 'catalogue-image'
      src: string
      alt: string
      representation: 'exact' | 'representative'
      credit?: {
        creator: string
        creatorUrl: string
        sourceUrl: string
        license: string
        licenseUrl: string
        changes: string
      }
    }

export const catalogueCategories: CatalogueCategory[] = [
  { id: 'mining-workshop', name: 'Mining, Gold Processing & Workshop Tools' },
  { id: 'solar-energy', name: 'Solar Energy Equipment & Gadgets' },
  { id: 'scales-measuring', name: 'Scales, Measuring & Business Equipment' },
  { id: 'communication-lighting', name: 'Communication & Lighting Equipment' },
  { id: 'sanitary-ware', name: 'Sanitary Ware & Bathroom Equipment' },
  { id: 'furniture-comfort', name: 'Furniture & Home Comfort' },
  { id: 'outdoor-camping', name: 'Outdoor & Camping Equipment' },
  { id: 'industrial-utility', name: 'Industrial & Utility Equipment' },
  { id: 'safety-medical', name: 'Safety & Medical Equipment' },
]

const developmentImage = { status: 'development-placeholder' as const, label: 'Development image placeholder' }
const productPrices: Record<string, CataloguePrice> = {
  'small-high-temperature-melting-furnace': { status: 'variants', options: [
    { id: '1kg', label: '1 kg', amount: 6800 },
    { id: '2kg', label: '2 kg', amount: 7500 },
    { id: '3kg', label: '3 kg', amount: 7999 },
  ] },
  'gold-melting-torch-kit': { status: 'coming-soon' },
  'melting-tongs-crucible-pliers': { status: 'coming-soon' },
  'forged-iron-blacksmith-tongs': { status: 'fixed', amount: 200 },
  'graphite-carbon-crucibles-molds': { status: 'fixed', amount: 150 },
  'borax-powder': { status: 'fixed', amount: 50 },
  'aluminum-alloy-igniter-torch': { status: 'fixed', amount: 150 },
  'solar-power-system-kit': { status: 'fixed', amount: 6999 },
  'all-in-one-solar-power-system': { status: 'coming-soon' },
  'portable-outdoor-solar-generator': { status: 'fixed', amount: 2500 },
  'foldable-monocrystalline-solar-panels': { status: 'fixed', amount: 299 },
  'pure-sine-wave-power-inverter': { status: 'coming-soon' },
  'portable-electronic-gram-scale': { status: 'fixed', amount: 500 },
  'high-precision-digital-scale': { status: 'fixed', amount: 299 },
  'business-calculator-handwriting-pad': { status: 'fixed', amount: 250 },
  'banknote-counter': { status: 'coming-soon' },
  'baofeng-888s-walkie-talkies': { status: 'fixed', amount: 700 },
  'rechargeable-led-headlamps': { status: 'fixed', amount: 199 },
  'flashlights-searchlights': { status: 'fixed', amount: 200 },
  'smart-one-piece-bidet-toilet': { status: 'fixed', amount: 1600 },
  'standard-one-piece-flush-toilet': { status: 'fixed', amount: 499 },
  'bathroom-shower-faucet-system': { status: 'fixed', amount: 500 },
  'foldable-compact-sofa-beds': { status: 'range', minimum: 900, maximum: 2000 },
  mattresses: { status: 'fixed', amount: 2300 },
  'aurorafox-camping-tents': { status: 'fixed', amount: 2599 },
  'outdoor-camping-shower-kit': { status: 'fixed', amount: 600 },
  'portable-pressure-washer': { status: 'fixed', amount: 350 },
  'portable-refrigeration-ac-welding-torch-kit': { status: 'fixed', amount: 799 },
  'medical-oxygen-tank-gas-cylinder-kit': { status: 'coming-soon' },
  'disposable-protective-hazmat-suit': { status: 'coming-soon' },
}
const product = (
  id: string,
  name: string,
  categoryId: string,
  categoryName: string,
  description: string,
  searchKeywords: string[],
  extra: Partial<Pick<CatalogueProduct, 'brand' | 'specifications' | 'includedItems' | 'publicationNote' | 'image' | 'pinterestReference'>> = {},
): CatalogueProduct => ({
  id, name, categoryId, categoryName, description, searchKeywords,
  image: developmentImage,
  price: productPrices[id],
  availabilityStatus: 'unconfirmed',
  ...extra,
})

const pinterestReference = (searchQuery: string, pinId: string) => ({
  searchQuery,
  pinUrl: `https://www.pinterest.com/pin/${pinId}/`,
  accessedAt: '2026-09-27',
})

export const catalogueProducts: CatalogueProduct[] = [
  product('small-high-temperature-melting-furnace', 'Small High-Temperature Electric Melting Furnace', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'For melting gold, silver, copper, and aluminum.', ['furnace', 'melting', 'gold', 'silver', 'copper', 'aluminum'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/small-high-temperature-melting-furnace-pinterest-reference.jpg", alt: "Pinterest reference showing an electric metal-melting furnace; supplied brand, model and rating are not verified." },  brand: 'KCUTE', includedItems: ['Graphite crucibles', 'Clamps', 'Heat-resistant gloves', 'Instruction manual'], pinterestReference: pinterestReference('KCUTE small high-temperature electric melting furnace', '4592193957730794368') }),
  product('gold-melting-torch-kit', 'Gold Melting Torch / Gas Torch Kit', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'Intended for gold and related metal melting applications.', ['torch', 'gas torch', 'gold', 'metal melting'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/gold-melting-torch-kit-pinterest-reference.jpg", alt: "Pinterest reference showing a handheld gas torch; its intended use and supplied kit contents are not verified." },  pinterestReference: pinterestReference('Gold Melting Torch Gas Torch Kit', '4604508530264254528') }),
  product('melting-tongs-crucible-pliers', 'Melting Tongs / Crucible Pliers', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'For handling gold, silver, and jewelry crucibles.', ['tongs', 'pliers', 'crucible', 'gold', 'silver', 'jewelry'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/melting-tongs-crucible-pliers-pinterest-reference.jpg", alt: "Pinterest reference showing long crucible-style tongs; supplied size and model are not verified." } }),
  product('forged-iron-blacksmith-tongs', 'Forged Iron Blacksmith Tongs', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'Heavy-duty forged iron tongs for workshop and blacksmith applications.', ['forged iron', 'blacksmith', 'tongs', 'workshop'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/forged-iron-blacksmith-tongs-pinterest-reference.jpg", alt: "Pinterest reference showing blacksmith tongs; supplied form and size are not verified." },  pinterestReference: pinterestReference('Forged Iron Blacksmith Tongs', '1548181166236217') }),
  product('graphite-carbon-crucibles-molds', 'Graphite / Carbon Crucibles & Molds', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'For metal melting and casting applications.', ['graphite', 'carbon', 'crucibles', 'molds', 'casting'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/graphite-carbon-crucibles-molds-pinterest-reference.jpg", alt: "Pinterest reference showing metal pouring and bar molds; it does not verify Omni crucibles or mold specifications." } }),
  product('borax-powder', 'Borax Powder', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'Flux for gold and silver smelting and welding applications.', ['borax', 'powder', 'flux', 'smelting', 'welding'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/borax-powder-pinterest-reference.jpg", alt: "Pinterest reference showing a borax flux package; supplied brand and package details are not verified." },  pinterestReference: pinterestReference('Borax Powder', '4590997713151930112') }),
  product('aluminum-alloy-igniter-torch', 'Full Aluminum Alloy Igniter / Torch', 'mining-workshop', 'Mining, Gold Processing & Workshop Tools', 'Portable aluminum-alloy ignition and torch equipment.', ['aluminum alloy', 'igniter', 'torch', 'portable'], { image: { status: 'pinterest-local-reference', src: '/images/products/client-pinterest-reference/aluminum-alloy-igniter-torch-pinterest-reference.jpg', alt: 'Pinterest reference showing a handheld torch attached to a gas canister; product application, fuel type and kit contents are not verified.' }, pinterestReference: pinterestReference('Full Aluminum Alloy Igniter Torch', '4591419908831470464') }),
  product('solar-power-system-kit', 'Solar Power System Kit', 'solar-energy', 'Solar Energy Equipment & Gadgets', 'A solar power system kit.', ['solar', 'power system', 'kit'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/solar-power-system-kit-pinterest-reference.jpg", alt: "Pinterest reference showing a residential solar installation; supplied brand, configuration and included components are not verified." },  includedItems: ['Solar panels', 'Inverter', 'Power battery station'], pinterestReference: pinterestReference('Solar Power System Kit solar panels inverter battery station', '704109723042339712') }),
  product('all-in-one-solar-power-system', 'All-in-One Solar Power System', 'solar-energy', 'Solar Energy Equipment & Gadgets', 'An all-in-one solar power system.', ['solar', 'all-in-one', 'power system'], { image: { status: 'pinterest-local-reference', src: '/images/products/client-pinterest-reference/all-in-one-solar-power-system-pinterest-reference.webp', alt: 'Pinterest reference showing solar panels, an inverter and battery units as a system; pictured brand, capacity and configuration are not verified for the supplied product.' }, specifications: [{ label: 'Capacity', value: '5.5kW / 5.12kWh' }], includedItems: ['Inverter', 'Storage battery'], pinterestReference: pinterestReference('All-in-One Solar Power System', '307722587062477142') }),
  product('portable-outdoor-solar-generator', 'Portable Outdoor Solar Generator / Power Station', 'solar-energy', 'Solar Energy Equipment & Gadgets', 'Designed for outdoor and backup-power applications.', ['portable', 'outdoor', 'solar generator', 'power station', 'backup power'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/portable-outdoor-solar-generator-pinterest-reference.jpg", alt: "Pinterest reference showing a portable power station with solar panels and accessories; supplied capacity and included items are not verified." },  pinterestReference: pinterestReference('Portable Outdoor Solar Generator Power Station', '598767713002964817') }),
  product('foldable-monocrystalline-solar-panels', 'Foldable Portable Monocrystalline Solar Panels', 'solar-energy', 'Solar Energy Equipment & Gadgets', 'High-efficiency photovoltaic panel designed for portable use.', ['foldable', 'portable', 'monocrystalline', 'solar panels', 'photovoltaic'], { image: { status: 'pinterest-local-reference', src: '/images/products/client-pinterest-reference/foldable-monocrystalline-solar-panels-pinterest-reference.webp', alt: 'Pinterest reference showing a portable folding solar panel; pictured brand and displayed rating are not verified for the supplied product.' }, specifications: [{ label: 'Power', value: '200W' }], pinterestReference: pinterestReference('Foldable Portable Monocrystalline Solar Panels 200W', '4609645450517179456') }),
  product('pure-sine-wave-power-inverter', 'Pure Sine Wave Power Inverter', 'solar-energy', 'Solar Energy Equipment & Gadgets', 'Pure sine wave power inverter.', ['pure sine wave', 'power inverter', 'solar'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/pure-sine-wave-power-inverter-pinterest-reference.jpg", alt: "Pinterest reference showing a power inverter; its rating and configuration are not verified." },  specifications: [{ label: 'Client-supplied specification', value: '40000W / 5000W', verification: 'Unverified; must be confirmed before publication.' }], publicationNote: 'The client-supplied 40000W / 5000W specification is unverified and must be confirmed before publication.', pinterestReference: pinterestReference('Pure Sine Wave Power Inverter', '69524387998096194') }),
  product('portable-electronic-gram-scale', 'Precise Portable Electronic Scale / High-Precision Gram Scale', 'scales-measuring', 'Scales, Measuring & Business Equipment', 'Suitable for jewelry, minerals, and other small items.', ['portable', 'electronic scale', 'gram scale', 'jewelry', 'minerals'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/portable-electronic-gram-scale-pinterest-reference.jpg", alt: "Pinterest reference showing a compact digital weighing scale; supplied model and precision are not verified." },  specifications: [{ label: 'Precision', value: '0.01g' }] }),
  product('high-precision-digital-scale', 'High-Precision Digital Scale', 'scales-measuring', 'Scales, Measuring & Business Equipment', 'Portable digital weighing equipment.', ['digital scale', 'weighing', 'portable'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/high-precision-digital-scale-pinterest-reference.jpg", alt: "Pinterest reference showing a tabletop digital scale; supplied model and precision are not verified." },  specifications: [{ label: 'Precision', value: '1g' }] }),
  product('business-calculator-handwriting-pad', 'Business Calculator with Dual Power & Handwriting Pad', 'scales-measuring', 'Scales, Measuring & Business Equipment', 'For business and general commercial use.', ['business calculator', 'dual power', 'handwriting pad', 'commercial'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/business-calculator-handwriting-pad-pinterest-reference.jpg", alt: "Pinterest reference showing a desk calculator with an electronic writing pad; supplied model and features are not verified." },  pinterestReference: pinterestReference('Business Calculator Dual Power Handwriting Pad', '931471135425281864') }),
  product('banknote-counter', 'Banknote Counter / Money Counting Machine', 'scales-measuring', 'Scales, Measuring & Business Equipment', 'Multi-currency bill counter and validator.', ['banknote', 'money counting machine', 'bill counter', 'validator', 'multi-currency'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/banknote-counter-pinterest-reference.jpg", alt: "Pinterest reference showing a banknote counting machine; model, currency and capabilities are not verified." } }),
  product('baofeng-888s-walkie-talkies', 'Walkie Talkies / Two-Way Radio Set', 'communication-lighting', 'Communication & Lighting Equipment', 'Walkie talkies / two-way radio set.', ['walkie talkies', 'two-way radio', 'radio'], { specifications: [{ label: 'Model', value: 'BAOFENG 888S' }], image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/baofeng-888s-walkie-talkies-pinterest-reference.jpg", alt: "Pinterest reference showing two handheld two-way radios; supplied brand, model and specifications are not verified." } }),
  product('rechargeable-led-headlamps', 'Rechargeable LED Headlamps', 'communication-lighting', 'Communication & Lighting Equipment', 'High-intensity multi-LED / COB rechargeable headlamps.', ['rechargeable', 'LED', 'headlamp', 'COB', 'lighting'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/rechargeable-led-headlamps-pinterest-reference.jpg", alt: "Pinterest reference showing a multi-LED headlamp with accessories; supplied features and included items are not verified." },  pinterestReference: pinterestReference('Rechargeable LED Headlamps multi-LED COB', '4605352942656549760') }),
  product('flashlights-searchlights', 'Super Bright Flashlights & Searchlights', 'communication-lighting', 'Communication & Lighting Equipment', 'Portable high-intensity flashlights and searchlights with USB-C rechargeable functionality.', ['flashlight', 'searchlight', 'USB-C', 'rechargeable', 'lighting'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/flashlights-searchlights-pinterest-reference.jpg", alt: "Pinterest reference showing several handheld flashlights; supplied model and features are not verified." } }),
  product('smart-one-piece-bidet-toilet', 'Smart / Intelligent One-Piece Bidet Toilet', 'sanitary-ware', 'Sanitary Ware & Bathroom Equipment', 'Integrated one-piece bidet toilet.', ['smart toilet', 'intelligent toilet', 'bidet', 'one-piece'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/smart-one-piece-bidet-toilet-pinterest-reference.jpg", alt: "Pinterest reference showing a one-piece toilet; supplied features and model are not verified." },  pinterestReference: pinterestReference('Smart Intelligent One-Piece Bidet Toilet', '127508233194962936') }),
  product('standard-one-piece-flush-toilet', 'Standard One-Piece Flush Toilet', 'sanitary-ware', 'Sanitary Ware & Bathroom Equipment', 'Standard one-piece toilet.', ['standard toilet', 'one-piece', 'flush toilet'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/standard-one-piece-flush-toilet-pinterest-reference.jpg", alt: "Pinterest reference showing a one-piece toilet; supplied brand and features are not verified." },  pinterestReference: pinterestReference('Standard One-Piece Flush Toilet', '4590575529069271936') }),
  product('bathroom-shower-faucet-system', 'Bathroom Shower Faucet System', 'sanitary-ware', 'Sanitary Ware & Bathroom Equipment', 'Wall-mounted rainfall shower head and hand-sprayer set.', ['bathroom', 'shower', 'faucet', 'rainfall', 'hand sprayer'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/bathroom-shower-faucet-system-pinterest-reference.jpg", alt: "Pinterest reference showing a bathroom shower area; supplied system arrangement and finish are not verified." },  pinterestReference: pinterestReference('Bathroom Shower Faucet System rainfall hand sprayer', '4596627221998528896') }),
  product('foldable-compact-sofa-beds', 'Foldable Compact Sofa Beds & Sofas', 'furniture-comfort', 'Furniture & Home Comfort', 'Examples listed: vacuum-sealed compressed sofas, inflatable lazy sofas, and pumpkin-shaped chairs.', ['foldable', 'compact', 'sofa bed', 'sofa', 'inflatable', 'chair'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/foldable-compact-sofa-beds-pinterest-reference.jpg", alt: "Pinterest reference showing a sofa bed in two configurations; supplied model and catalogue variants are not verified." } }),
  product('mattresses', 'Mattresses', 'furniture-comfort', 'Furniture & Home Comfort', 'Examples listed: individually wrapped spring mattresses, hotel memory foam mattresses, and compressed rolled mattresses.', ['mattress', 'spring', 'memory foam', 'compressed rolled'], { image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/mattresses-pinterest-reference.jpg", alt: "Pinterest reference showing a spring mattress; Omni’s listed mattress variants may differ." }, pinterestReference: pinterestReference('Mattresses spring memory foam compressed rolled', '231583605835401660') }),
  product('aurorafox-camping-tents', 'Inflatable & Setup Outdoor Camping Tents', 'outdoor-camping', 'Outdoor & Camping Equipment', 'Family camping tents.', ['inflatable', 'setup', 'outdoor', 'camping', 'tent', 'family'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/aurorafox-camping-tents-pinterest-reference.jpg", alt: "Pinterest reference showing a dome-style camping tent; supplied brand and setup type are not verified." },  brand: 'AURORAFOX', pinterestReference: pinterestReference('Inflatable Setup Outdoor Camping Tents AURORAFOX', '985231165688219') }),
  product('outdoor-camping-shower-kit', 'Outdoor Camping Shower Kit', 'outdoor-camping', 'Outdoor & Camping Equipment', 'Outdoor camping shower kit.', ['outdoor', 'camping', 'shower kit'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/outdoor-camping-shower-kit-pinterest-reference.jpg", alt: "Pinterest reference showing a portable camping shower with a bucket and pump; supplied power source and kit contents are not verified." },  includedItems: ['Self-priming pump', 'Bucket', 'Shower head'], pinterestReference: pinterestReference('Outdoor Camping Shower Kit self-priming pump bucket', '6051780744779906') }),
  product('portable-pressure-washer', 'Portable Pressure Washer / High-Pressure Car Washer', 'industrial-utility', 'Industrial & Utility Equipment', 'Suitable for vehicle and general cleaning applications.', ['portable', 'pressure washer', 'car washer', 'vehicle', 'cleaning'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/portable-pressure-washer-pinterest-reference.jpg", alt: "Pinterest reference showing a pressure washer in use; supplied brand, model and pressure are not verified." },  pinterestReference: pinterestReference('Portable Pressure Washer High-Pressure Car Washer', '892557219921682153') }),
  product('portable-refrigeration-ac-welding-torch-kit', 'Portable Refrigeration & AC Welding Torch Kit', 'industrial-utility', 'Industrial & Utility Equipment', 'Portable refrigeration and AC welding torch kit.', ['portable', 'refrigeration', 'AC', 'welding torch'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/portable-refrigeration-ac-welding-torch-kit-pinterest-reference.jpg", alt: "Pinterest reference showing a portable welding torch set; supplied use and kit components are not verified." },  specifications: [{ label: 'Capacity', value: '2L' }], includedItems: ['Carrying case'] }),
  product('medical-oxygen-tank-gas-cylinder-kit', 'Medical Oxygen Tank / Gas Cylinder Kit', 'safety-medical', 'Safety & Medical Equipment', 'Medical oxygen tank / gas cylinder kit.', ['medical oxygen', 'tank', 'gas cylinder', 'kit'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/medical-oxygen-tank-gas-cylinder-kit-pinterest-reference.jpg", alt: "Pinterest reference showing a gas cylinder with attached equipment; specifications, components and intended use are not verified." },  publicationNote: 'Product specifications and intended use must be confirmed with the client before publication.', pinterestReference: pinterestReference('Medical Oxygen Tank Gas Cylinder Kit', '28429041394390865') }),
  product('disposable-protective-hazmat-suit', 'Disposable Protective / Hazmat Suit', 'safety-medical', 'Safety & Medical Equipment', 'Full protective suit with hood.', ['disposable', 'protective suit', 'hazmat', 'hood'], {image: { status: 'pinterest-local-reference', src: "/images/products/client-pinterest-reference/disposable-protective-hazmat-suit-pinterest-reference.jpg", alt: "Pinterest reference showing a protective coverall with other protective equipment; supplied components and protection claims are not verified." },  pinterestReference: pinterestReference('Disposable Protective Hazmat Suit hood', '36310340742091370') }),
]
