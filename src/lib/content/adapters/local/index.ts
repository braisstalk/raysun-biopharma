// Content Local Adapter - provides content from local config files

import { ContentHomePage } from '../../types/content-home'
import { ContentProductsPage, ContentProduct } from '../../types/content-products'
import { ContentNewsPage, ContentNewsArticle } from '../../types/content-news'
import { ContentResourcesPage, ContentResourceDetail } from '../../types/content-resources'
import { ContentVerifyPage } from '../../types/content-verify'
import { ContentOrderPage } from '../../types/content-order'
import { ContentAiAssistantPage } from '../../types/content-ai'
import { ContentCareersPage, ContentJobPosting } from '../../types/content-careers'

// Home Mapper
import { mapHomeContent } from '../../mappers/home.mapper'
import { mapProductsPage, mapAllProducts, mapProductBySlug } from '../../mappers/products.mapper'

// Careers Mapper
import { getCareersContent, getAllJobPostings, getJobBySlug, getJobsByDepartment, getRelatedJobs } from '../../mappers/careers.mapper'

// News Mapper - with aliases to avoid conflicts
import { mapNewsContent, getNewsArticleBySlug as fetchNewsArticle, getAllNewsArticles as fetchAllNews, getRelatedNews as fetchRelatedNews } from '../../mappers/news.mapper'

// Resources Mapper - with aliases
import { mapResourcesContent, getResourceBySlug as fetchResource, getAllResources as fetchAllRes, getRelatedResources as fetchRelatedRes } from '../../mappers/resources.mapper'

import { mapVerifyContent } from '../../mappers/verify.mapper'
import { mapOrderContent } from '../../mappers/order.mapper'
import { mapAiAssistantContent } from '../../mappers/ai.mapper'

// Home Page Content
export function getHomeContent(): ContentHomePage {
  return mapHomeContent()
}

// Products Page Content
export function getProductsContent(): ContentProductsPage {
  return mapProductsPage()
}

// All Products
export function getAllProducts(): ContentProduct[] {
  return mapAllProducts()
}

// Product by Slug
export function getProductBySlug(slug: string): ContentProduct | undefined {
  return mapProductBySlug(slug)
}

// News Page Content
export function getNewsContent(): ContentNewsPage {
  return mapNewsContent()
}

// News Article by Slug
export function getNewsArticleBySlug(slug: string): ContentNewsArticle | undefined {
  return fetchNewsArticle(slug)
}

// All News Articles
export function getAllNewsArticlesList(): ContentNewsArticle[] {
  return fetchAllNews()
}

// Related News
export function getRelatedNewsArticles(articleId: string): ContentNewsArticle[] {
  return fetchRelatedNews(articleId)
}

// Resources Page Content
export function getResourcesContent(): ContentResourcesPage {
  return mapResourcesContent()
}

// Resource by Slug
export function getResourceDetailBySlug(slug: string): ContentResourceDetail | undefined {
  return fetchResource(slug)
}

// All Resources
export function getAllResourcesList(): ContentResourceDetail[] {
  return fetchAllRes()
}

// Related Resources
export function getRelatedResourceItems(resourceId: string): ContentResourceDetail[] {
  return fetchRelatedRes(resourceId)
}

// Verify Page Content
export function getVerifyContent(): ContentVerifyPage {
  return mapVerifyContent()
}

// Order Page Content
export function getOrderContent(): ContentOrderPage {
  return mapOrderContent()
}

// AI Assistant Page Content
export function getAiAssistantContent(): ContentAiAssistantPage {
  return mapAiAssistantContent()
}

// Careers Page Content
export function getCareersPageContent(): ContentCareersPage {
  return getCareersContent()
}

// All Job Postings
export function getAllJobPostingsList(): ContentJobPosting[] {
  return getAllJobPostings()
}

// Job by Slug
export function getJobBySlugFromList(slug: string): ContentJobPosting | undefined {
  return getJobBySlug(slug)
}

// Jobs by Department
export function getJobsByDepartmentList(department: string): ContentJobPosting[] {
  return getJobsByDepartment(department)
}

// Related Jobs
export function getRelatedJobsList(jobId: string): ContentJobPosting[] {
  return getRelatedJobs(jobId)
}
