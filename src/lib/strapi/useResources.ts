'use client'

import { useState, useEffect } from 'react'
import { STRAPI_URL } from './client'

export interface StrapiResource {
  id: number
  documentId: string
  title: string
  slug: string
  description: string | null
  category: string
  resourceType: 'document' | 'video' | 'link'
  status: 'public' | 'request' | 'restricted' | 'pending'
  fileSize: string | null
  updatedDate: string | null
  sortOrder: number
  file: {
    id: number
    url: string
    name: string
    alternativeText: string | null
  } | null
}

export interface MappedResource {
  id: string
  documentId: string
  slug: string
  title: string
  description: string
  type: 'document' | 'video' | 'link'
  category: string
  status: 'public' | 'request' | 'restricted' | 'pending'
  fileSize?: string
  updatedDate?: string
  sortOrder: number
  downloadUrl?: string
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function mapResource(raw: StrapiResource): MappedResource {
  let downloadUrl: string | undefined
  if (raw.file) {
    downloadUrl = raw.file.url.startsWith('/')
      ? `${STRAPI_URL}${raw.file.url}`
      : raw.file.url
  }

  return {
    id: String(raw.id),
    documentId: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    description: raw.description || '',
    type: raw.resourceType || 'document',
    category: capitalizeFirst(raw.category),
    status: raw.status || 'public',
    fileSize: raw.fileSize || undefined,
    updatedDate: raw.updatedDate || undefined,
    sortOrder: raw.sortOrder,
    downloadUrl,
  }
}

export function useResources(): {
  resources: MappedResource[]
  loading: boolean
  error: string | null
} {
  const [resources, setResources] = useState<MappedResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchResources() {
      try {
        const url = `${STRAPI_URL}/api/resources?populate=file&sort=sortOrder:asc&pagination[pageSize]=100&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data) {
          setResources((json.data as StrapiResource[]).map(mapResource))
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn('[useResources] CMS fetch failed:', err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchResources()
    return () => { cancelled = true }
  }, [])

  return { resources, loading, error }
}

export function useResourceBySlug(slug: string): {
  resource: MappedResource | null
  loading: boolean
  error: string | null
} {
  const [resource, setResource] = useState<MappedResource | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    let cancelled = false

    async function fetchResource() {
      try {
        const url = `${STRAPI_URL}/api/resources?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=file&publicationState=live`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled && json.data && json.data.length > 0) {
          setResource(mapResource(json.data[0] as StrapiResource))
        }
      } catch (err: any) {
        if (!cancelled) {
          console.warn(`[useResourceBySlug] CMS fetch failed for "${slug}":`, err.message)
          setError(err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchResource()
    return () => { cancelled = true }
  }, [slug])

  return { resource, loading, error }
}

export function useRelatedResources(
  currentResource: MappedResource | null,
  limit = 3
): MappedResource[] {
  const { resources } = useResources()

  if (!currentResource || resources.length === 0) return []

  return resources
    .filter(r => r.id !== currentResource.id)
    .sort((a, b) => {
      let scoreA = 0, scoreB = 0
      if (a.category === currentResource.category) scoreA += 10
      if (b.category === currentResource.category) scoreB += 10
      if (a.type === currentResource.type) scoreA += 5
      if (b.type === currentResource.type) scoreB += 5
      return scoreB - scoreA
    })
    .slice(0, limit)
}
