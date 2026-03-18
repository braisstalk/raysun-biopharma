'use client'

import { useRef, useEffect } from 'react'
import type { ProductCategory } from '@/types/product'

interface ProductsCategoryNavProps {
  categories: ProductCategory[]
  activeCategory: string
  onSelect: (id: string) => void
  productCounts: Record<string, number>
}

export default function ProductsCategoryNav({ categories, activeCategory, onSelect, productCounts }: ProductsCategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const el = activeRef.current
      const left = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
      container.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    }
  }, [activeCategory])

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollRef}
          className="flex gap-1.5 py-3 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.id === 'all'
              ? Object.values(productCounts).reduce((a: number, b: number) => a + b, 0)
              : (productCounts[cat.id] || 0)

            return (
              <button
                key={cat.id}
                ref={isActive ? activeRef : undefined}
                onClick={() => onSelect(cat.id)}
                className={[
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0',
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600',
                ].join(' ')}
              >
                <span>{cat.name}</span>
                <span className={[
                  'text-xs px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
                ].join(' ')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
