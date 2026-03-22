'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

export interface StrapiNewsArticle {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  category: string
  publishDate: string
  coverImage: {
    id: number
    url: string
    alternativeText: string | null
    formats?: Record<string, { url: string }>
  } | null
}

export interface MappedNewsArticle {
  id: string
  documentId: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  image?: string
  author?: string
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function mapArticle(raw: StrapiNewsArticle): MappedNewsArticle {
  let imageUrl: string | undefined
  if (raw.coverImage) {
    imageUrl = raw.coverImage.url.startsWith('/')
      ? `${STRAPI_URL}${raw.coverImage.url}`
      : raw.coverImage.url
  }

  return {
    id: String(raw.id),
    documentId: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt || '',
    content: raw.content,
    date: formatDate(raw.publishDate),
    category: capitalizeFirst(raw.category),
    image: imageUrl,
  }
}

export function useNews(): {
  articles: MappedNewsArticle[]
  loading: boolean
  error: string | null
} {
  const [articles, setArticles] = useState<MappedNewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchNews() {
      try {
        const url = `${STRAPI_URL}/api/news-articles?populate=coverImage&sort=publishDate:desc&pagination[pageSize]=100&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data) {
          setArticles((json.data as StrapiNewsArticle[]).map(mapArticle))
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn('[useNews] CMS fetch failed:', err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchNews()
    return () => { cancelled = true }
  }, [])

  return { articles, loading, error }
}

export function useNewsBySlug(slug: string): {
  article: MappedNewsArticle | null
  loading: boolean
  error: string | null
} {
  const [article, setArticle] = useState<MappedNewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    let cancelled = false

    async function fetchArticle() {
      try {
        const url = `${STRAPI_URL}/api/news-articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=coverImage&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data && json.data.length > 0) {
          setArticle(mapArticle(json.data[0] as StrapiNewsArticle))
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn(`[useNewsBySlug] CMS fetch failed for "${slug}":`, err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchArticle()
    return () => { cancelled = true }
  }, [slug])

  return { article, loading, error }
}

export function useRelatedNews(
  currentArticle: MappedNewsArticle | null,
  limit = 3
): MappedNewsArticle[] {
  const { articles } = useNews()

  if (!currentArticle || articles.length === 0) return []

  return articles
    .filter(a => a.id !== currentArticle.id)
    .sort((a, b) => {
      let scoreA = 0, scoreB = 0
      if (a.category === currentArticle.category) scoreA += 10
      if (b.category === currentArticle.category) scoreB += 10
      return scoreB - scoreA
    })
    .slice(0, limit)
}
