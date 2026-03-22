'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FileText, Download, File, Video, Search, Loader2 } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { useResources, MappedResource } from '@/lib/strapi/useResources'
import { getResourcesContent } from '@/lib/content'

const icons: Record<string, React.ElementType> = {
  document: FileText,
  video: Video,
  link: File,
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'Corporate', label: 'Corporate' },
  { id: 'Facility', label: 'Facility' },
  { id: 'Products', label: 'Products' },
  { id: 'Quality', label: 'Quality' },
  { id: 'Media', label: 'Media' },
]

function generateSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function mapLocalToResource(item: { id: string; title: string; description: string; type: 'document' | 'video' | 'link'; category: string; fileSize?: string }): MappedResource {
  return {
    id: item.id,
    documentId: item.id,
    slug: generateSlug(item.title),
    title: item.title,
    description: item.description,
    category: item.category,
    resourceType: item.type,
    status: 'public',
    fileSize: item.fileSize || '',
    updatedDate: '',
    sortOrder: 0,
  }
}

export default function Resources() {
  const { t } = useTranslation()
  const { resources: cmsResources, loading, error } = useResources()
  const localContent = getResourcesContent()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Use CMS data if available, fallback to local config
  const resources = useMemo(() => {
    if (cmsResources.length > 0) return cmsResources
    return localContent.items.map(mapLocalToResource)
  }, [cmsResources, localContent.items])

  // Filter resources by category and search
  const filteredResources = useMemo(() => {
    let filtered = resources

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [resources, selectedCategory, searchQuery])

  const hero = localContent.hero

  return (
    <>
      <StrapiHeroCarousel
        page="resources"
        badge="RESOURCES"
        badgeColor="text-blue-300"
        heading={hero.title}
        description={hero.subtitle}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-slate-600">Loading resources...</span>
            </div>
          )}

          {/* Error State - Silent fallback to local data */}
          {error && cmsResources.length === 0 && (
            <div className="text-sm text-slate-500 mb-4">
              Using local data (CMS unavailable)
            </div>
          )}

          {/* Resources Grid */}
          {!loading && (
            <>
              <div className="mb-4 text-sm text-slate-500">
                Showing {filteredResources.length} of {resources.length} resources
              </div>

              {filteredResources.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No resources found matching your criteria.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((res) => {
                    const Icon = icons[res.resourceType] || File
                    return (
                      <Link
                        key={res.id}
                        href={`/resources/${res.slug}`}
                        className="bg-slate-50 rounded-xl p-6 text-left hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <Icon className="w-10 h-10 text-blue-600" />
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase">
                            {res.resourceType}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                          {res.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                          {res.description}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{res.category}</span>
                            {res.fileSize && (
                              <span className="text-xs text-slate-400">• {res.fileSize}</span>
                            )}
                          </div>
                          <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="mb-6">Contact us for specific documents or additional information.</p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
