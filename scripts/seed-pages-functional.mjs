const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const pages = [
  {
    slug: 'contact',
    title: 'Contact Us',
    description: 'Get in touch with Raysun Biopharma',
    seoTitle: 'Contact Us - Raysun Biopharma',
    seoDescription: 'Contact Raysun Biopharma for product inquiries, partnerships, and business opportunities.',
    content: {
      inquiryTypes: [
        { id: 'business', label: 'Business Inquiry', description: 'Product inquiries, pricing, distribution' },
        { id: 'partnership', label: 'Partnership', description: 'Joint ventures, licensing, strategic alliances' },
        { id: 'supplier', label: 'Supplier', description: 'Raw materials, packaging, services' },
        { id: 'general', label: 'General Contact', description: 'General inquiries, media, other' },
      ],
      countries: [
        'Laos', 'Thailand', 'Vietnam', 'Cambodia', 'Myanmar', 'Malaysia', 'Singapore',
        'Indonesia', 'Philippines', 'UAE', 'Saudi Arabia', 'Egypt', 'Nigeria', 'Kenya', 'Other'
      ],
      officeInfo: {
        headquarters: 'Raysun Biopharma Headquarters',
        address: 'Vientiane Capital, Lao PDR',
        email: 'info@raysunpharma.com',
        phone: 'Available upon request',
        businessHours: 'Mon-Fri: 8:00 AM - 5:30 PM (ICT, UTC+7)',
      },
      quickLinks: [
        { label: 'Products', href: '/products' },
        { label: 'Verify', href: '/verify' },
        { label: 'Resources', href: '/resources' },
        { label: 'Careers', href: '/careers' },
      ],
    },
  },
  {
    slug: 'verify',
    title: 'Product Verification',
    description: 'Verify the authenticity of Raysun Biopharma products',
    seoTitle: 'Product Verification - Raysun Biopharma',
    seoDescription: 'Verify the authenticity of Raysun Biopharma products, certificates, and authorized distributors.',
    content: {
      types: [
        { id: 'product', label: 'Product', placeholder: 'Enter batch number (e.g., RS-2025-001234)' },
        { id: 'certificate', label: 'Certificate', placeholder: 'Enter certificate ID' },
        { id: 'distributor', label: 'Distributor', placeholder: 'Enter distributor code' },
      ],
      mockResults: [
        {
          code: 'RS-2025-001234',
          status: 'success',
          message: 'Verified Authentic - This is a genuine Raysun Biopharma product.',
          details: 'Manufacturing Date: 2025-01-15 | Batch: RS-2025-001234 | Product: Amoxicillin Tablets 500mg | Expiry: 2028-01 | Distribution: Southeast Asia Region',
        },
        {
          code: 'RS-2025-005678',
          status: 'success',
          message: 'Verified Authentic - This is a genuine Raysun Biopharma product.',
          details: 'Manufacturing Date: 2025-02-20 | Batch: RS-2025-005678 | Product: Omega-3 Fish Oil Softgels | Expiry: 2027-02 | Distribution: Middle East Region',
        },
        {
          code: 'RS-2024',
          status: 'warning',
          message: 'Expired Product - This batch has expired. Please contact us for verification.',
          details: 'Manufacturing Date: 2024-03-01 | Expiry: 2025-03 | Note: Product may no longer be safe for use',
        },
      ],
      helpSection: {
        title: 'Need Help?',
        description: 'Contact our quality team for product verification assistance.',
      },
      reportSection: {
        title: 'Report Counterfeits',
        description: 'If you suspect counterfeit products, please report to our quality assurance team.',
      },
    },
  },
  {
    slug: 'order-now',
    title: 'Order Now',
    description: 'Place your order or request a quote for pharmaceutical products',
    seoTitle: 'Order Now - Raysun Biopharma',
    seoDescription: 'Place orders and request quotes for pharmaceutical products from Raysun Biopharma.',
    content: {
      orderTypes: [
        { id: 'quick', title: 'Quick Order', description: 'Browse and add products directly to cart', icon: 'ShoppingCart' },
        { id: 'bulk', title: 'Bulk / B2B Orders', description: 'Request quote for large quantities and custom pricing', icon: 'Package' },
        { id: 'rfq', title: 'Request Quotation', description: 'Submit requirements for personalized quote', icon: 'FileText' },
      ],
      paymentMethods: [
        { id: 'online', name: 'Online Payment', status: 'coming' },
        { id: 'tt', name: 'Bank Transfer (TT)', status: 'available' },
        { id: 'account', name: 'Account Terms', status: 'available' },
      ],
      trackingPlaceholder: 'Enter order number (e.g., ORD-2026-XXXXXX)',
      helpText: 'Need assistance? Contact our sales team for personalized support.',
      countries: [
        'Laos', 'Thailand', 'Vietnam', 'Cambodia', 'Myanmar', 'Malaysia',
        'Indonesia', 'Philippines', 'Singapore', 'UAE', 'Saudi Arabia', 'Egypt', 'Nigeria', 'Kenya', 'Other'
      ],
    },
  },
]

async function createPage(page) {
  const body = {
    data: {
      slug: page.slug,
      title: page.title,
      description: page.description,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      content: page.content,
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    if (json?.error?.message?.includes('unique') || json?.error?.message?.includes('already')) {
      console.log(`SKIP (already exists): ${page.slug}`)
      return 'skip'
    }
    console.error(`FAIL: ${page.slug}`, json.error?.message || json)
    return 'fail'
  }

  const docId = json.data?.documentId
  if (docId) {
    const pubRes = await fetch(`${STRAPI_URL}/api/pages/${docId}/actions/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    })
    if (pubRes.ok) {
      console.log(`OK Created & Published: ${page.slug}`)
    } else {
      console.log(`OK Created (draft): ${page.slug} - publish manually`)
    }
  } else {
    console.log(`OK Created: ${page.slug}`)
  }
  return 'ok'
}

async function main() {
  console.log(`Seeding ${pages.length} functional pages to ${STRAPI_URL}`)
  let ok = 0, skip = 0, fail = 0
  for (const page of pages) {
    const result = await createPage(page)
    if (result === 'ok') ok++
    else if (result === 'skip') skip++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  console.log(`Result: ${ok} created, ${skip} skipped, ${fail} failed (total: ${pages.length})`)
}

main().catch(console.error)
