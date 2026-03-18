'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HeroSlide } from '@/types/product'

interface ProductsHeroProps {
  title: string
  subtitle: string
  slides: HeroSlide[]
  searchBar: React.ReactNode
}

export default function ProductsHero({ title, subtitle, slides, searchBar }: ProductsHeroProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={[
            'absolute inset-0 bg-gradient-to-br transition-opacity duration-700 ease-in-out',
            s.gradient,
            i === current ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      ))}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      {/* Content - mobile optimized */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-[10px] sm:text-xs font-medium text-white/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden xs:inline">200+ Products Available</span>
            <span className="xs:hidden">200+ Products</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-2">
            {subtitle}
          </p>

          {/* Search box */}
          <div className="relative max-w-md mx-auto px-2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl blur-xl" />
            <div className="relative">
              {searchBar}
            </div>
          </div>

          {/* Slide tagline */}
          <div className="mt-6 h-6 flex items-center justify-center">
            <div key={slide.id} className="animate-fade-up">
              <p className="text-[10px] sm:text-xs font-medium text-white/40 tracking-wide">{slide.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows - smaller on mobile */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={[
              'transition-all duration-300 rounded-full',
              i === current ? 'w-4 sm:w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60',
            ].join(' ')}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
