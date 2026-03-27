'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'


export interface HeroCarouselSlide {
 id: string
 title: string
 subtitle: string
 gradient: string
}

interface HeroCarouselProps {
 badge?: string
 badgeColor?: string
 heading: string
 description: string
 slides: HeroCarouselSlide[]
 interval?: number
 children?: React.ReactNode
 icon?: React.ReactNode
 align?: 'left' | 'center'
}

export default function HeroCarousel({
 badge,
 badgeColor = 'text-blue-300',
 heading,
 description,
 slides,
 interval = 6000,
 children,
 icon,
 align = 'left',
}: HeroCarouselProps) {
 const [current, setCurrent] = useState(0)

 const next = useCallback(() => {
 setCurrent((c) => (c + 1) % slides.length)
 }, [slides.length])

 const prev = useCallback(() => {
 setCurrent((c) => (c - 1 + slides.length) % slides.length)
 }, [slides.length])

 useEffect(() => {
 if (slides.length <= 1) return
 const timer = setInterval(next, interval)
 return () => clearInterval(timer)
 }, [next, interval, slides.length])

 const isCenter = align === 'center'

 return (
 <section className="relative overflow-hidden">
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

 <div
 className="absolute inset-0 opacity-[0.04]"
 style={{
 backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
 backgroundSize: '32px 32px',
 }}
 />

 <div
 className={[
 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20',
 isCenter ? 'text-center' : '',
 ].join(' ')}
 >
 <div className={isCenter ? 'max-w-3xl mx-auto' : 'max-w-3xl'}>
 {(icon || badge) && (
 <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
 {icon}
 {badge && (
 <p className={`${badgeColor} font-medium text-sm tracking-widest uppercase`}>
 {badge}
 </p>
 )}
 </div>
 )}

 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
 {heading}
 </h1>
 <p className="text-base md:text-lg text-slate-300 max-w-2xl mb-6">
 {description}
 </p>

 {children}
 </div>

 <div className={`mt-6 h-5 flex items-center ${isCenter ? 'justify-center' : ''}`}>
 <div key={slides[current]?.id} className="animate-fade-up">
 <p className="text-[11px] font-medium text-white/35 tracking-wide">
 {slides[current]?.title}
 </p>
 </div>
 </div>
 </div>

 {slides.length > 1 && (
 <>
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
 </>
 )}

 {slides.length > 1 && (
 <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2">
 {slides.map((_, i) => (
 <button
 key={i}
 onClick={() => setCurrent(i)}
 className={[
 'transition-all duration-300 rounded-full',
 i === current
 ? 'w-4 sm:w-5 h-1.5 bg-white'
 : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60',
 ].join(' ')}
 aria-label={`Go to slide ${i + 1}`}
 />
 ))}
 </div>
 )}
 </section>
 )
}
