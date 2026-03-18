'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, ArrowRight } from 'lucide-react'
import { getNewsContent } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'

export default function News() {
  const content = getNewsContent()
  const { t } = useTranslation()
  const { hero, categories, items } = content
  
  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')

  const categoryLabels = categories.map(c => c.label)
  
  const filtered = items.filter(n => {
    const matchCat = activeCat === 'All' || n.category === activeCat
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      {/* Hero - mobile optimized */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">NEWS & MEDIA</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{hero.title}</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Filter bar - mobile optimized */}
      <section className="py-4 md:py-8 bg-slate-50 sticky top-[60px] md:top-16 z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            {/* Category chips - horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
              {categoryLabels.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap shrink-0 ${
                    activeCat === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search - full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No news found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article key={item.id} className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-blue-600 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">{item.excerpt}</p>
                    <Link href={`/news/${item.slug}`} className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
