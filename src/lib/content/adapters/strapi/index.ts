// Strapi CMS Adapter - Real implementation for CMS integration
// Connects to local Strapi at http://localhost:1337

import { ContentHomePage, ContentHero, ContentStat, ContentFeature, ContentIntro, ContentVideoSection, ContentCTA } from '../../types/content-home'
import { ContentProductsPage, ContentProduct, ContentProductCategory } from '../../types/content-products'

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const USE_MOCK = false // Set to true only for testing without real Strapi

// Helper for fetch implementation
async function fetchFromStrapi<T>(endpoint: string): Promise<T | null> {
  try {
    const url = USE_MOCK 
      ? `http://localhost:3000/api/mock-strapi${endpoint}`
      : `${STRAPI_URL}/api${endpoint}`
    console.log(`[StrapiAdapter] Fetching: ${url}`)
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.error(`[StrapiAdapter] Error fetching ${endpoint}:`, response.status, response.statusText)
      return null
    }
    
    const data = await response.json()
    return data.data as T
  } catch (error) {
    console.error(`[StrapiAdapter] Failed to fetch ${endpoint}:`, error)
    return null
  }
}

// Map Strapi product category to ContentProductCategory
function mapStrapiCategory(data: any): ContentProductCategory {
  const attrs = data?.attributes || {}
  return {
    id: String(data?.id || ''),
    name: attrs.name || '',
    description: attrs.description || '',
    icon: attrs.icon || ''
  }
}

// Map Strapi product to ContentProduct
function mapStrapiProduct(data: any): ContentProduct {
  const attrs = data?.attributes || {}
  
  return {
    id: String(data?.id || ''),
    slug: attrs.slug || '',
    name: attrs.name || '',
    genericName: attrs.genericName,
    category: attrs.product_category?.data?.attributes?.name || '',
    dosageForm: attrs.dosageForm || '',
    strength: attrs.strength,
    description: attrs.description || '',
    indications: [],
    features: [],
    tags: [],
    type: attrs.type,
    packSize: attrs.packSize,
    storage: attrs.storage,
    shelfLife: attrs.shelfLife,
    route: attrs.route,
    regulatory: attrs.regulatoryNote,
    availability: attrs.availabilityNote,
    packaging: attrs.packaging,
    relatedProducts: []
  }
}

// Home Page - returns default since we don't have Home in Strapi yet
export async function getHomeContentFromStrapi(): Promise<ContentHomePage | null> {
  console.log('[StrapiAdapter] getHomeContentFromStrapi called - using default')
  return null // No home page in Strapi yet
}

// Products Page - get categories
export async function getProductsContentFromStrapi(): Promise<ContentProductsPage | null> {
  const categoriesData = await fetchFromStrapi<any[]>('/product-categories?sort=order:asc')
  const categories: ContentProductCategory[] = categoriesData?.map(mapStrapiCategory) || []
  
  return {
    hero: {
      title: 'Our Products',
      subtitle: 'Explore our comprehensive portfolio of high-quality pharmaceutical products.',
      searchPlaceholder: 'Search products...',
      slides: []
    },
    tabs: [
      { id: 'all', label: 'All' },
      { id: 'brand', label: 'Brand' },
      { id: 'generic', label: 'Generic' }
    ],
    categories,
    perPage: 12
  }
}

// All Products
export async function getAllProductsFromStrapi(): Promise<ContentProduct[]> {
  const data = await fetchFromStrapi<any[]>('/products')
  if (!data) {
    console.log('[StrapiAdapter] No products found')
    return []
  }
  return data.map(mapStrapiProduct)
}

// Product by Slug
export async function getProductBySlugFromStrapi(slug: string): Promise<ContentProduct | null> {
  const data = await fetchFromStrapi<any[]>(`/products?filters[slug][$eq]=${slug}`)
  if (!data || data.length === 0) {
    console.log(`[StrapiAdapter] No product found for slug: ${slug}`)
    return null
  }
  return mapStrapiProduct(data[0])
}

// Test connection
export async function testStrapiConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${STRAPI_URL}/api`, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
