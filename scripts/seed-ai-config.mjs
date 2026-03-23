const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const aiContent = {
  welcomeMessage: "Hello! I'm the Raysun Biopharma AI Assistant. I can help you with product information, verification, ordering, and more. How can I assist you today?",
  quickPrompts: [
    'Tell me about your products',
    'How can I verify a product?',
    'How do I place an order?',
    'Show me your certifications',
    'How can I contact sales?',
  ],
  disclaimer: 'AI responses are for reference only. Consult healthcare professionals for medical advice.',
  defaultAnswer: 'Thank you for your question! I can help you with information about our products, manufacturing capabilities, verification, ordering, and partnerships. Please select a quick question above or browse our website for more details.',
  mockAnswers: [
    {
      keywords: ['manufacturing', 'production', 'facility', 'capabilities', 'gmp', 'factory'],
      answer: 'Our state-of-the-art manufacturing facility is WHO GMP certified and located in Vientiane, Laos. We specialize in oral solid doses (tablets, capsules, softgels), topical preparations (creams, ointments), and sterile injectables. Our production lines adhere to international quality standards with rigorous QC/QA processes.',
      relatedLinks: [
        { label: 'View Manufacturing', href: '/manufacturing' },
        { label: 'Quality Certifications', href: '/quality-compliance' },
        { label: 'Contact Sales', href: '/contact' },
      ],
    },
    {
      keywords: ['verify', 'verification', 'authentic', 'batch', 'product', 'check'],
      answer: "You can verify product authenticity using our Verification Center. Enter the batch number found on your product packaging to check if it's an authentic Raysun Biopharma product. We also verify GMP certificates and authorized distributors.",
      relatedLinks: [
        { label: 'Go to Verification', href: '/verify' },
        { label: 'Report Counterfeit', href: '/contact' },
      ],
    },
    {
      keywords: ['order', 'bulk', 'quote', 'purchase', 'buy', 'b2b'],
      answer: 'To place an order, you can: 1) Browse our product catalog and add items to your cart, 2) Use our Order Now page for quick ordering with quote requests, 3) Contact our sales team directly for partnership opportunities. We typically respond to quote requests within 24-48 hours.',
      relatedLinks: [
        { label: 'Order Now', href: '/order-now' },
        { label: 'Browse Products', href: '/products' },
        { label: 'Contact Sales', href: '/contact' },
      ],
    },
    {
      keywords: ['products', 'catalog', 'categories', 'list', 'medicines', 'drugs'],
      answer: 'We offer 200+ pharmaceutical products across categories: Antibiotics, Cardiovascular, Pain & Inflammation, Dermatology, Vitamins & Supplements, Gastrointestinal, Respiratory, and Traditional/Herbal medicines. Our formulations include tablets, capsules, softgels, creams, ointments, and injections.',
      relatedLinks: [
        { label: 'Browse Products', href: '/products' },
        { label: 'Order Now', href: '/order-now' },
      ],
    },
    {
      keywords: ['contact', 'sales', 'reach', 'phone', 'email', 'support'],
      answer: 'You can reach our team through: Email: info@raysunpharma.com | Phone: Available upon request | Our business hours are Monday-Friday, 9:00 AM - 6:00 PM (GMT+7). We typically respond within 24-48 hours.',
      relatedLinks: [
        { label: 'Contact Page', href: '/contact' },
        { label: 'Order Now', href: '/order-now' },
      ],
    },
    {
      keywords: ['certificate', 'certification', 'gmp', 'iso', 'quality', 'compliance'],
      answer: 'Raysun Biopharma holds WHO GMP certification, ISO 9001:2015, and ISO 14001:2015. Our facility undergoes regular audits to ensure compliance with international pharmaceutical manufacturing standards.',
      relatedLinks: [
        { label: 'Quality & Compliance', href: '/quality-compliance' },
        { label: 'Resources', href: '/resources' },
      ],
    },
  ],
}

async function main() {
  // First find the ai-assistant page
  console.log('Finding ai-assistant page...')
  const findRes = await fetch(`${STRAPI_URL}/api/pages?filters[slug][$eq]=ai-assistant&pagination[pageSize]=1`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
  })
  const findJson = await findRes.json()

  if (findJson.data && findJson.data.length > 0) {
    // Update existing page
    const docId = findJson.data[0].documentId
    console.log(`Found page, documentId: ${docId}. Updating content...`)

    const updateRes = await fetch(`${STRAPI_URL}/api/pages/${docId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { content: aiContent } }),
    })
    const updateJson = await updateRes.json()

    if (updateRes.ok) {
      console.log('OK Updated content')
      // Publish
      const pubRes = await fetch(`${STRAPI_URL}/api/pages/${docId}/actions/publish`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
      })
      if (pubRes.ok) console.log('OK Published')
      else console.log('Note: publish may need manual action')
    } else {
      console.error('FAIL:', updateJson.error?.message || updateJson)
    }
  } else {
    // Create new page
    console.log('Page not found, creating new...')
    const createRes = await fetch(`${STRAPI_URL}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          slug: 'ai-assistant',
          title: 'AI Assistant',
          seoTitle: 'AI Assistant - Raysun Biopharma',
          seoDescription: 'Get instant answers about Raysun Biopharma products and services.',
          content: aiContent,
        },
      }),
    })
    const createJson = await createRes.json()
    if (createRes.ok) {
      console.log('OK Created')
      const docId = createJson.data?.documentId
      if (docId) {
        const pubRes = await fetch(`${STRAPI_URL}/api/pages/${docId}/actions/publish`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
        })
        if (pubRes.ok) console.log('OK Published')
      }
    } else {
      console.error('FAIL:', createJson.error?.message || createJson)
    }
  }
}

main().catch(console.error)
