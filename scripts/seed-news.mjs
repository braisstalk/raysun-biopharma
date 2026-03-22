const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const articles = [
  {
    title: 'GMP Re-certification Success',
    slug: 'gmp-re-certification-success',
    excerpt: 'Our facility passed the WHO GMP re-certification audit with zero critical findings.',
    content: `Raysun Biopharma is proud to announce that our manufacturing facility has successfully completed the WHO GMP (Good Manufacturing Practice) re-certification audit with zero critical findings.

This achievement reflects our unwavering commitment to quality and compliance in pharmaceutical manufacturing. Our team has worked diligently to maintain the highest standards across all production lines.

Key highlights of the audit:
- Zero critical findings
- Full compliance with WHO GMP guidelines
- Continued certification for all product categories
- Recognition of our quality management systems

We remain dedicated to delivering safe, effective, and high-quality pharmaceutical products to our customers worldwide.`,
    category: 'quality',
    publishDate: '2026-03-15',
  },
  {
    title: 'New ASEAN Distribution Partnership',
    slug: 'new-asean-distribution-partnership',
    excerpt: 'Strategic partnership expands our presence across Southeast Asian markets.',
    content: `Raysun Biopharma is pleased to announce a strategic partnership with leading pharmaceutical distributors across the ASEAN region.

This collaboration will significantly expand our reach and ensure reliable access to quality medicines for healthcare providers and patients throughout Southeast Asia.

Partnership highlights:
- Distribution network covering 6 ASEAN countries
- Enhanced logistics and supply chain capabilities
- Local market expertise and regulatory support
- Commitment to affordable access to essential medicines

We look forward to building lasting partnerships that improve healthcare outcomes across the region.`,
    category: 'business',
    publishDate: '2026-03-01',
  },
  {
    title: 'R&D Facility Expansion',
    slug: 'rd-facility-expansion',
    excerpt: 'Investment in new research capabilities to drive pharmaceutical innovation.',
    content: `Raysun Biopharma is investing in the expansion of our Research and Development facility to advance pharmaceutical innovation and develop new therapies.

The expansion includes:
- State-of-the-art analytical laboratories
- Pilot plant for formulation development
- Enhanced stability testing capabilities
- Specialized teams for generic drug development

This investment underscores our commitment to innovation and positions us to bring more affordable pharmaceutical products to market.`,
    category: 'innovation',
    publishDate: '2026-02-15',
  },
  {
    title: 'ISO 14001 Certification',
    slug: 'iso-14001-certification',
    excerpt: 'Environmental management system certification achieved.',
    content: `Raysun Biopharma has achieved ISO 14001:2015 certification for our Environmental Management System (EMS).

This certification demonstrates our commitment to environmental sustainability in all aspects of our operations.

Certification scope:
- Manufacturing operations
- Quality control laboratories
- Warehouse and logistics
- Office administration

We continue to implement sustainable practices that minimize our environmental footprint while maintaining our commitment to quality healthcare.`,
    category: 'quality',
    publishDate: '2026-01-20',
  },
  {
    title: 'New Product Launch',
    slug: 'new-product-launch',
    excerpt: 'Introduction of five new softgel products to our portfolio.',
    content: `Raysun Biopharma is excited to announce the launch of five new softgel products, expanding our therapeutic offerings.

New products include:
- Cardiovascular formulations
- Vitamin supplements
- Anti-allergic medications
- Gastrointestinal treatments
- Pain management solutions

All products are manufactured under strict GMP conditions and meet international quality standards.`,
    category: 'products',
    publishDate: '2025-12-10',
  },
  {
    title: 'Sustainability Award',
    slug: 'sustainability-award',
    excerpt: 'Recognized for environmental responsibility in manufacturing.',
    content: `Raysun Biopharma has been recognized for excellence in environmental sustainability at the annual Pharmaceutical Industry Awards.

This award highlights our efforts to implement sustainable manufacturing practices and reduce our environmental impact.

Initiatives recognized:
- Waste reduction programs
- Energy efficiency improvements
- Water conservation measures
- Green packaging solutions

We remain committed to sustainable development while delivering high-quality pharmaceutical products.`,
    category: 'recognition',
    publishDate: '2025-11-05',
  },
]

async function createArticle(article) {
  const body = {
    data: {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      publishDate: article.publishDate,
    }
  }

  const res = await fetch(`${STRAPI_URL}/api/news-articles`, {
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
      console.log(`SKIP (already exists): ${article.title}`)
      return 'skip'
    }
    console.error(`FAIL: ${article.title}`, json.error?.message || json)
    return 'fail'
  }

  const docId = json.data?.documentId
  if (docId) {
    const pubRes = await fetch(`${STRAPI_URL}/api/news-articles/${docId}/actions/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    })
    if (pubRes.ok) {
      console.log(`OK Created & Published: ${article.title}`)
    } else {
      console.log(`OK Created (draft): ${article.title} - publish manually`)
    }
  } else {
    console.log(`OK Created: ${article.title}`)
  }
  return 'ok'
}

async function main() {
  console.log(`Seeding ${articles.length} news articles to ${STRAPI_URL}`)
  let ok = 0, skip = 0, fail = 0
  for (const article of articles) {
    const result = await createArticle(article)
    if (result === 'ok') ok++
    else if (result === 'skip') skip++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  console.log(`Result: ${ok} created, ${skip} skipped, ${fail} failed (total: ${articles.length})`)
}

main().catch(console.error)
