import { useState, useEffect, useCallback, useMemo } from 'react'
import { fetchStrapi, fetchStrapiList, STRAPI_URL } from './client'

// ── Types ──

export interface StrapiMedia {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: {
    thumbnail?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
  } | null
}

export interface StrapiProduct {
  id: number
  documentId: string
  name: string
  slug: string
  genericName: string | null
  category: 'antibiotics' | 'cardiovascular' | 'pain' | 'dermatology' | 'vitamins' | 'gastrointestinal' | 'respiratory' | 'traditional' | 'other'
  dosageForm: string
  strength: string | null
  description: string | null
  indication: string | null
  composition: string | null
  packaging: string | null
  shelfLife: string | null
  storageConditions: string | null
  productType: 'brand' | 'generic'
  tags: string | null
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  images?: { data: StrapiMedia[] } | null
  dataSheet?: { data: StrapiMedia | null } | null
  coa?: { data: StrapiMedia | null } | null
}

export interface MappedProduct {
  id: string
  name: string
  slug: string
  category: string
  dosageForm: string
  description: string
  indication: string
  tags: string[]
  type: 'brand' | 'generic'
  strength: string | null
  packaging: string | null
  shelfLife: string | null
  storageConditions: string | null
  images: Array<{
    url: string
    thumbnail: string | null
    alt: string
  }>
  documents: {
    dataSheet: string | null
    coa: string | null
  }
}

// ── Helper Functions ──

function mapStrapiProduct(product: StrapiProduct): MappedProduct {
  const images = product.images?.data || []
  const dataSheet = product.dataSheet?.data
  const coa = product.coa?.data

  return {
    id: product.documentId,
    name: product.name,
    slug: product.slug,
    category: product.category,
    dosageForm: product.dosageForm,
    description: product.description || '',
    indication: product.indication || '',
    tags: product.tags ? product.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    type: product.productType,
    strength: product.strength,
    packaging: product.packaging,
    shelfLife: product.shelfLife,
    storageConditions: product.storageConditions,
    images: images.map(img => ({
      url: img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`,
      thumbnail: img.formats?.thumbnail?.url 
        ? (img.formats.thumbnail.url.startsWith('http') ? img.formats.thumbnail.url : `${STRAPI_URL}${img.formats.thumbnail.url}`)
        : null,
      alt: img.alternativeText || product.name,
    })),
    documents: {
      dataSheet: dataSheet?.url 
        ? (dataSheet.url.startsWith('http') ? dataSheet.url : `${STRAPI_URL}${dataSheet.url}`)
        : null,
      coa: coa?.url 
        ? (coa.url.startsWith('http') ? coa.url : `${STRAPI_URL}${coa.url}`)
        : null,
    },
  }
}

// ── Fetch Functions ──

export async function getProducts(options?: {
  category?: string
  type?: 'brand' | 'generic'
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ products: MappedProduct[]; pagination: { page: number; pageSize: number; pageCount: number; total: number } }> {
  const params: Record<string, string> = {
    'sort': 'sortOrder:asc,name:asc',
    'pagination[pageSize]': String(options?.pageSize || 50),
  }

  if (options?.page) {
    params['pagination[page]'] = String(options.page)
  }

  if (options?.category && options.category !== 'all') {
    params['filters[category][$eq]'] = options.category
  }

  if (options?.type) {
    params['filters[productType][$eq]'] = options.type
  }

  if (options?.search) {
    params['filters[$or][0][name][$containsi]'] = options.search
    params['filters[$or][1][genericName][$containsi]'] = options.search
    params['filters[$or][2][description][$containsi]'] = options.search
    params['filters[$or][3][indication][$containsi]'] = options.search
    params['filters[$or][4][tags][$containsi]'] = options.search
  }

  const response = await fetchStrapi<{ data: StrapiProduct[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }>('/products', params)

  if (!response) {
    return { products: [], pagination: { page: 1, pageSize: 50, pageCount: 0, total: 0 } }
  }

  const products = (response.data || []).map(mapStrapiProduct)
  return { products, pagination: response.meta?.pagination || { page: 1, pageSize: 50, pageCount: 0, total: 0 } }
}

export async function getProductBySlug(slug: string): Promise<MappedProduct | null> {
  const products = await fetchStrapiList<StrapiProduct>('/products', {
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': '1',
  })

  if (!products || products.length === 0) {
    return null
  }

  return mapStrapiProduct(products[0])
}

export async function getRelatedProducts(product: MappedProduct, limit: number = 4): Promise<MappedProduct[]> {
  const params: Record<string, string> = {
    'filters[documentId][$ne]': product.id,
    'filters[category][$eq]': product.category,
    'pagination[pageSize]': String(limit),
    'sort': 'sortOrder:asc',
  }

  let products = await fetchStrapiList<StrapiProduct>('/products', params)

  // If not enough products in same category, include other categories
  if (products.length < limit) {
    const excludeIds = new Set(products.map(p => p.documentId))
    excludeIds.add(product.id)
    
    const additional = await fetchStrapiList<StrapiProduct>('/products', {
      'filters[documentId][$notIn]': Array.from(excludeIds).join(','),
      'pagination[pageSize]': String(limit - products.length),
      'sort': 'sortOrder:asc',
    })
    
    products = [...products, ...additional]
  }

  return products.slice(0, limit).map(mapStrapiProduct)
}

// ── React Hooks ──

export function useProducts(options?: {
  category?: string
  type?: 'brand' | 'generic'
  search?: string
  page?: number
  pageSize?: number
}) {
  const [products, setProducts] = useState<MappedProduct[]>([])
  const [pagination, setPagination] = useState({ page: 1, pageSize: 50, pageCount: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getProducts(options)
      setProducts(result.products)
      setPagination(result.pagination)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'))
    } finally {
      setLoading(false)
    }
  }, [options?.category, options?.type, options?.search, options?.page, options?.pageSize])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, pagination, loading, error, refetch: fetchProducts }
}

export function useProductBySlug(slug: string | null) {
  const [product, setProduct] = useState<MappedProduct | null>(null)
  const [loading, setLoading] = useState(!!slug)
  const [error, setError] = useState<Error | null>(null)

  const fetchProduct = useCallback(async () => {
    if (!slug) {
      setProduct(null)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await getProductBySlug(slug)
      setProduct(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch product'))
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return { product, loading, error, refetch: fetchProduct }
}

export function useRelatedProducts(product: MappedProduct | null, limit: number = 4) {
  const [related, setRelated] = useState<MappedProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchRelated = useCallback(async () => {
    if (!product) {
      setRelated([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await getRelatedProducts(product, limit)
      setRelated(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch related products'))
    } finally {
      setLoading(false)
    }
  }, [product, limit])

  useEffect(() => {
    fetchRelated()
  }, [fetchRelated])

  return { related, loading, error, refetch: fetchRelated }
}

// Types are already exported via 'export interface' above
