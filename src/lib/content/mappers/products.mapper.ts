// Products Content Mapper - maps old config to new ContentProductsPage type

import { ContentProductsPage, ContentProduct } from '../types/content-products'
import { productsPageConfig } from '@/config/products'

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function mapProductsPage(): ContentProductsPage {
  return {
    hero: {
      title: productsPageConfig.hero.title,
      subtitle: productsPageConfig.hero.subtitle,
      searchPlaceholder: productsPageConfig.hero.searchPlaceholder,
      slides: productsPageConfig.hero.slides.map(slide => ({
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle
      }))
    },
    tabs: productsPageConfig.tabs.map(tab => ({
      id: tab.id,
      label: tab.label
    })),
    categories: productsPageConfig.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon
    })),
    perPage: productsPageConfig.perPage
  }
}

export function mapAllProducts(): ContentProduct[] {
  return productsPageConfig.products.map(product => ({
    id: product.id,
    slug: slugify(product.name),
    name: product.name,
    category: product.category,
    dosageForm: product.dosageForm,
    description: product.description,
    indications: product.indication ? [product.indication] : undefined,
    tags: product.tags,
    type: product.type
  }))
}

export function mapProductBySlug(slug: string): ContentProduct | undefined {
  const product = productsPageConfig.products.find(p => slugify(p.name) === slug)
  if (!product) return undefined
  
  return {
    id: product.id,
    slug: slugify(product.name),
    name: product.name,
    category: product.category,
    dosageForm: product.dosageForm,
    description: product.description,
    indications: product.indication ? [product.indication] : undefined,
    tags: product.tags,
    type: product.type
  }
}
