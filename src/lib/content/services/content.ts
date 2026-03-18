// Content Service - Unified API for content access
// Routes to local or strapi/mocksapi adapter based on configuration

import { ContentHomePage } from '../types/content-home'
import { ContentProductsPage, ContentProduct } from '../types/content-products'
import { ContentNewsPage, ContentNewsArticle } from '../types/content-news'
import { ContentResourcesPage, ContentResourceDetail } from '../types/content-resources'
import { ContentVerifyPage } from '../types/content-verify'
import { ContentOrderPage } from '../types/content-order'
import { ContentAiAssistantPage } from '../types/content-ai'
import { ContentCareersPage, ContentJobPosting } from '../types/content-careers'

import * as LocalAdapter from '../adapters/local'
import * as StrapiAdapter from '../adapters/strapi'

// Configuration - set to 'strapi' to switch to CMS
const CONTENT_SOURCE = process.env.CONTENT_SOURCE || 'local'

// For pages that support strapi
const PAGES_WITH_STRAPI = ['home', 'products', 'productDetail']

function isStrapiSource(): boolean {
  return CONTENT_SOURCE === 'strapi'
}

function canUseStrapi(page: string): boolean {
  return isStrapiSource() && PAGES_WITH_STRAPI.includes(page)
}

// Cache for Strapi data (simple in-memory cache)
let strapiHomeCache: ContentHomePage | null = null
let strapiProductsPageCache: ContentProductsPage | null = null
let strapiProductsCache: ContentProduct[] | null = null
const productSlugCache: Map<string, ContentProduct> = new Map()

// Home Page
export function getHomeContent(): ContentHomePage {
  if (canUseStrapi('home')) {
    if (!strapiHomeCache) {
      StrapiAdapter.getHomeContentFromStrapi().then(data => {
        if (data) {
          strapiHomeCache = data
          console.log('[ContentService] ✅ Cached Strapi Home data')
        }
      }).catch(err => {
        console.log('[ContentService] Strapi fetch failed, using local:', err)
      })
    }
    if (strapiHomeCache) {
      console.log('[ContentService] ✅ Using Strapi for Home')
      return strapiHomeCache
    }
  }
  return LocalAdapter.getHomeContent()
}

// Products Page
export function getProductsContent(): ContentProductsPage {
  if (canUseStrapi('products')) {
    if (!strapiProductsPageCache) {
      StrapiAdapter.getProductsContentFromStrapi().then(data => {
        if (data) {
          strapiProductsPageCache = data
          console.log('[ContentService] ✅ Cached Strapi Products Page data')
        }
      }).catch(err => {
        console.log('[ContentService] Strapi fetch failed, using local:', err)
      })
    }
    if (strapiProductsPageCache) {
      console.log('[ContentService] ✅ Using Strapi for Products Page')
      return strapiProductsPageCache
    }
  }
  return LocalAdapter.getProductsContent()
}

// All Products
export function getAllProducts(): ContentProduct[] {
  if (canUseStrapi('products')) {
    if (!strapiProductsCache) {
      StrapiAdapter.getAllProductsFromStrapi().then(data => {
        if (data && data.length > 0) {
          strapiProductsCache = data
          console.log('[ContentService] ✅ Cached Strapi Products data')
        }
      }).catch(err => {
        console.log('[ContentService] Strapi fetch failed, using local:', err)
      })
    }
    if (strapiProductsCache && strapiProductsCache.length > 0) {
      console.log('[ContentService] ✅ Using Strapi for Products')
      return strapiProductsCache
    }
  }
  return LocalAdapter.getAllProducts()
}

// Product by Slug
export function getProductBySlug(slug: string): ContentProduct | undefined {
  if (productSlugCache.has(slug)) {
    return productSlugCache.get(slug)
  }
  
  if (canUseStrapi('productDetail')) {
    StrapiAdapter.getProductBySlugFromStrapi(slug).then(data => {
      if (data) {
        productSlugCache.set(slug, data)
        console.log(`[ContentService] ✅ Cached Strapi Product: ${slug}`)
      }
    }).catch(err => {
      console.log(`[ContentService] Strapi fetch failed for ${slug}, using local:`, err)
    })
  }
  return LocalAdapter.getProductBySlug(slug)
}

// News Page
export function getNewsContent(): ContentNewsPage {
  return LocalAdapter.getNewsContent()
}

// News Article by Slug
export function getNewsArticleBySlug(slug: string): ContentNewsArticle | undefined {
  return LocalAdapter.getNewsArticleBySlug(slug)
}

// All News Articles
export function getAllNewsArticles(): ContentNewsArticle[] {
  return LocalAdapter.getAllNewsArticlesList()
}

// Related News
export function getRelatedNews(articleId: string): ContentNewsArticle[] {
  return LocalAdapter.getRelatedNewsArticles(articleId)
}

// Resources Page
export function getResourcesContent(): ContentResourcesPage {
  return LocalAdapter.getResourcesContent()
}

// Resource by Slug
export function getResourceBySlug(slug: string): ContentResourceDetail | undefined {
  return LocalAdapter.getResourceDetailBySlug(slug)
}

// All Resources
export function getAllResources(): ContentResourceDetail[] {
  return LocalAdapter.getAllResourcesList()
}

// Related Resources
export function getRelatedResources(resourceId: string): ContentResourceDetail[] {
  return LocalAdapter.getRelatedResourceItems(resourceId)
}

// Verify Page
export function getVerifyContent(): ContentVerifyPage {
  return LocalAdapter.getVerifyContent()
}

// Order Page
export function getOrderContent(): ContentOrderPage {
  return LocalAdapter.getOrderContent()
}

// AI Assistant Page
export function getAiAssistantContent(): ContentAiAssistantPage {
  return LocalAdapter.getAiAssistantContent()
}

// Careers functions
export function getCareersPageContent() {
  return LocalAdapter.getCareersPageContent()
}

export function getAllJobPostings() {
  return LocalAdapter.getAllJobPostingsList()
}

export function getJobBySlug(slug: string) {
  return LocalAdapter.getJobBySlugFromList(slug)
}

export function getJobsByDepartment(department: string) {
  return LocalAdapter.getJobsByDepartmentList(department)
}

export function getRelatedJobs(jobId: string) {
  return LocalAdapter.getRelatedJobsList(jobId)
}

// Export jobDepartments directly from mapper
export { jobDepartments } from '../mappers/careers.mapper'

// Also export getCareersContent for convenience
export { getCareersContent } from '../mappers/careers.mapper'

// Utility to check current source
export function getCurrentSource(): string {
  return CONTENT_SOURCE
}

// Test Strapi connection
export async function testStrapiConnection(): Promise<boolean> {
  return StrapiAdapter.testStrapiConnection()
}

// Export cache status for debugging
export function getCacheStatus() {
  return {
    home: !!strapiHomeCache,
    productsPage: !!strapiProductsPageCache,
    products: !!strapiProductsCache && strapiProductsCache.length > 0,
    productCacheSize: productSlugCache.size
  }
}
