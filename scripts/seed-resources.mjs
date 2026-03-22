const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const resources = [
  { title: 'Company Brochure', slug: 'company-brochure', description: 'Comprehensive overview of Raysun Biopharma, our manufacturing capabilities, certifications, and product portfolio.', category: 'corporate', resourceType: 'document', status: 'public', fileSize: '2.4 MB', updatedDate: 'Jan 2026', sortOrder: 1 },
  { title: 'Factory Overview', slug: 'factory-overview', description: 'Detailed information about our state-of-the-art manufacturing facility in Vientiane, Laos.', category: 'facility', resourceType: 'document', status: 'public', fileSize: '3.1 MB', updatedDate: 'Dec 2025', sortOrder: 2 },
  { title: 'Product Catalog', slug: 'product-catalog', description: 'Complete catalog of our pharmaceutical products including formulations, strengths, and packaging options.', category: 'products', resourceType: 'document', status: 'request', fileSize: '5.8 MB', updatedDate: 'Feb 2026', sortOrder: 3 },
  { title: 'Quality Certifications', slug: 'quality-certifications', description: 'Overview of our quality certifications including WHO GMP, ISO 9001, and ISO 14001.', category: 'quality', resourceType: 'document', status: 'public', fileSize: '1.2 MB', updatedDate: 'Mar 2026', sortOrder: 4 },
  { title: 'GMP Certificate', slug: 'gmp-certificate', description: 'WHO GMP certification document for our manufacturing facility.', category: 'quality', resourceType: 'document', status: 'public', fileSize: '0.8 MB', updatedDate: 'Mar 2026', sortOrder: 5 },
  { title: 'ISO 9001 Certificate', slug: 'iso-9001-certificate', description: 'ISO 9001:2015 Quality Management System certification.', category: 'quality', resourceType: 'document', status: 'public', fileSize: '0.5 MB', updatedDate: 'Jan 2026', sortOrder: 6 },
  { title: 'Corporate Logo Pack', slug: 'corporate-logo-pack', description: 'Official Raysun Biopharma logos and brand guidelines for authorized partners.', category: 'media', resourceType: 'link', status: 'restricted', fileSize: '4.2 MB', updatedDate: 'Nov 2025', sortOrder: 7 },
  { title: 'Product Images', slug: 'product-images', description: 'High-resolution product images for marketing and promotional materials.', category: 'media', resourceType: 'link', status: 'request', fileSize: '12.5 MB', updatedDate: 'Oct 2025', sortOrder: 8 },
  { title: 'Factory Tour Video', slug: 'factory-tour-video', description: 'Virtual tour of our GMP-certified manufacturing facility.', category: 'media', resourceType: 'video', status: 'public', fileSize: '45 MB', updatedDate: 'Sep 2025', sortOrder: 9 },
]

async function createResource(resource) {
  const body = {
    data: {
      title: resource.title,
      slug: resource.slug,
      description: resource.description,
      category: resource.category,
      resourceType: resource.resourceType,
      status: resource.status,
      fileSize: resource.fileSize,
      updatedDate: resource.updatedDate,
      sortOrder: resource.sortOrder,
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/resources`, {
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
      console.log(`SKIP (already exists): ${resource.title}`)
      return 'skip'
    }
    console.error(`FAIL: ${resource.title}`, json.error?.message || json)
    return 'fail'
  }

  const docId = json.data?.documentId
  if (docId) {
    const pubRes = await fetch(`${STRAPI_URL}/api/resources/${docId}/actions/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    })
    if (pubRes.ok) {
      console.log(`OK Created & Published: ${resource.title}`)
    } else {
      console.log(`OK Created (draft): ${resource.title} - publish manually`)
    }
  } else {
    console.log(`OK Created: ${resource.title}`)
  }
  return 'ok'
}

async function main() {
  console.log(`Seeding ${resources.length} resources to ${STRAPI_URL}`)
  let ok = 0, skip = 0, fail = 0
  for (const resource of resources) {
    const result = await createResource(resource)
    if (result === 'ok') ok++
    else if (result === 'skip') skip++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  console.log(`Result: ${ok} created, ${skip} skipped, ${fail} failed (total: ${resources.length})`)
}

main().catch(console.error)
