// Mock Strapi API - Simulates Strapi responses for testing dual-source mechanism
// This replaces the need for a full Strapi installation

import { NextResponse } from 'next/server'

// Mock data that differs from local config to verify Strapi source
const mockStrapiData = {
  homePage: {
    id: 1,
    attributes: {
      heroTitle: "🌿 STRAPI TEST: What Science Can Do",
      heroSubtitle: "🌿 This content is from Strapi CMS - verifying dual-source works!",
      heroPrimaryCtaLabel: "Explore Science (Strapi)",
      heroPrimaryCtaHref: "/what-science-can-do",
      heroSecondaryCtaLabel: "Contact Us (Strapi)",
      heroSecondaryCtaHref: "/contact",
      stats: '[{"value":"999+","label":"Products (Strapi)"},{"value":"99+","label":"Countries (Strapi)"},{"value":"25+","label":"Years (Strapi)"},{"value":"✅","label":"Strapi Verified"}]',
      aboutTitle: "About Raysun (Strapi Test)",
      aboutDescription: "This description is from Strapi CMS - verifying dual-source mechanism works correctly!",
      aboutCtaLabel: "Learn More",
      aboutCtaHref: "/about",
      videoTitle: "Our Manufacturing Facility (Strapi)",
      videoDescription: "Strapi test content - video section description",
      videoCtaLabel: "Watch Now",
      videoCtaHref: "/manufacturing",
      features: '[{"id":"f1","title":"Feature 1 (Strapi)","description":"From Strapi CMS","icon":"Shield"},{"id":"f2","title":"Feature 2 (Strapi)","description":"From Strapi CMS","icon":"Factory"},{"id":"f3","title":"Feature 3 (Strapi)","description":"From Strapi CMS","icon":"FlaskConical"}]',
      aiAssistantTitle: "AI Assistant (Strapi Test)",
      aiAssistantDescription: "This is from Strapi - dual-source verification!",
      aiAssistantCtaLabel: "Try AI",
      aiAssistantCtaHref: "/ai-assistant"
    }
  },
  productCategories: [
    { id: 1, attributes: { name: "Antibiotics (Strapi)", slug: "antibiotics-strapi", description: "Antibiotic products", icon: "Shield", order: 1 } },
    { id: 2, attributes: { name: "Cardiovascular (Strapi)", slug: "cardiovascular-strapi", description: "Heart medications", icon: "Heart", order: 2 } },
    { id: 3, attributes: { name: "Pain Relief (Strapi)", slug: "pain-relief-strapi", description: "Pain management", icon: "Shield", order: 3 } },
  ],
  products: [
    { 
      id: 1, 
      attributes: { 
        name: "Amoxicillin 500mg (STRAPI TEST)", 
        slug: "amoxicillin-500mg-strapi",
        genericName: "Amoxicillin",
        dosageForm: "Tablet",
        strength: "500mg",
        description: "STRAPI TEST PRODUCT - This is from Strapi CMS to verify dual-source mechanism!",
        indications: '["Bacterial infections"]',
        features: '["Broad spectrum","Fast acting"]',
        tags: '["antibiotic","oral"]',
        type: "generic",
        packSize: "100 tablets",
        storage: "Store below 25°C",
        shelfLife: "24 months",
        route: "Oral",
        regulatoryNote: "GMP certified",
        availabilityNote: "In stock",
        category: { data: { id: 1, attributes: { name: "Antibiotics (Strapi)" } } }
      } 
    },
    { 
      id: 2, 
      attributes: { 
        name: "Omeprazole 20mg", 
        slug: "omeprazole-20mg-strapi",
        genericName: "Omeprazole",
        dosageForm: "Capsule",
        strength: "20mg",
        description: "Proton pump inhibitor",
        indications: '["GERD","Acid reflux"]',
        features: '["Once daily","Long lasting"]',
        tags: '["gastro","capsule"]',
        type: "generic",
        packSize: "30 capsules",
        storage: "Store below 30°C",
        shelfLife: "36 months",
        route: "Oral",
        category: { data: { id: 2, attributes: { name: "Cardiovascular (Strapi)" } } }
      } 
    },
    { 
      id: 3, 
      attributes: { 
        name: "Ibuprofen 400mg", 
        slug: "ibuprofen-400mg-strapi",
        genericName: "Ibuprofen",
        dosageForm: "Tablet",
        strength: "400mg",
        description: "Pain reliever",
        indications: '["Pain","Inflammation"]',
        features: '["Fast relief","Anti-inflammatory"]',
        tags: '["pain","nsaid"]',
        type: "generic",
        packSize: "50 tablets",
        storage: "Store below 25°C",
        shelfLife: "24 months",
        route: "Oral",
        category: { data: { id: 3, attributes: { name: "Pain Relief (Strapi)" } } }
      } 
    },
  ]
}

// API Routes for mock Strapi
export async function GET(request: Request) {
  const { pathname } = new URL(request.url)
  
  // Home Page
  if (pathname === '/api/home-page' || pathname === '/api/home-page?populate=*') {
    return NextResponse.json({ data: mockStrapiData.homePage })
  }
  
  // Product Categories
  if (pathname === '/api/product-categories' || pathname.includes('/product-categories')) {
    return NextResponse.json({ data: mockStrapiData.productCategories })
  }
  
  // Products
  if (pathname === '/api/products' || pathname.includes('/products')) {
    return NextResponse.json({ data: mockStrapiData.products })
  }
  
  // Single product by slug
  if (pathname.match(/\/api\/products\?filters\[slug\]/)) {
    const slugMatch = pathname.match(/\[slug\]\[\$eq\]=([^&]+)/)
    if (slugMatch) {
      const slug = slugMatch[1]
      const product = mockStrapiData.products.find(p => p.attributes.slug === slug)
      if (product) {
        return NextResponse.json({ data: [product] })
      }
    }
    return NextResponse.json({ data: [] })
  }
  
  // Default - return 404 for unknown endpoints
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
