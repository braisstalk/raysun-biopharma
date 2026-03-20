'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export interface HeroSlide {
  id: string
  type: 'image' | 'video' | 'gradient'
  // For image type
  imageUrl?: string
  // For video type
  videoUrl?: string
  posterImage?: string
  // For gradient fallback
  gradient?: string
  // Content
  label?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  autoPlayInterval?: number // milliseconds, default 6000
  minHeight?: string // default 'min-h-[500px]'
}

export default function HeroCarousel({
  slides,
  autoPlayInterval = 6000,
  minHeight = 'min-h-[500px]',
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  const totalSlides = slides.length
  const currentSlide = slides[currentIndex]

  // Auto-play logic
  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (totalSlides <= 1) return

    timerRef.current = setTimeout(() => {
      if (!isPaused) {
        goToNext()
      }
    }, autoPlayInterval)
  }, [isPaused, autoPlayInterval, totalSlides])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, isPaused, startTimer])

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [currentIndex, isTransitioning])

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % totalSlides)
  }, [currentIndex, totalSlides, goToSlide])

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides)
  }, [currentIndex, totalSlides, goToSlide])

  // Set video ref callback
  const setVideoRef = useCallback((index: number, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el)
    } else {
      videoRefs.current.delete(index)
    }
  }, [])

  // Handle video playback for active slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === currentIndex) {
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [currentIndex])

  if (!slides || slides.length === 0) return null

  return (
    <section
      className={`relative bg-slate-900 text-white pt-16 overflow-hidden ${minHeight}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background */}
          {slide.type === 'video' && slide.videoUrl ? (
            <>
              <video
                ref={(el) => setVideoRef(index, el)}
                className="w-full h-full object-cover opacity-50"
                muted
                loop
                playsInline
                poster={slide.posterImage}
              >
                <source src={slide.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-blue-900/30" />
            </>
          ) : slide.type === 'image' && slide.imageUrl ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-blue-900/30" />
            </>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient || 'from-slate-900 via-slate-800 to-blue-900'}`} />
              {/* Decorative elements for gradient slides */}
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }} />
            </>
          )}
        </div>
      ))}

      {/* Content - always on top */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {currentSlide.label && (
            <p
              key={`label-${currentIndex}`}
              className="text-blue-300 font-medium mb-4 tracking-widest uppercase text-sm animate-fade-up"
            >
              {currentSlide.label}
            </p>
          )}
          <h1
            key={`title-${currentIndex}`}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {currentSlide.title}
          </h1>
          {currentSlide.subtitle && (
            <p
              key={`subtitle-${currentIndex}`}
              className="text-lg text-slate-200 mb-8 max-w-2xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {currentSlide.subtitle}
            </p>
          )}
          <div
            key={`ctas-${currentIndex}`}
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            {currentSlide.primaryCta && (
              <Link
                href={currentSlide.primaryCta.href}
                className="inline-flex items-center gap-2 bg-[#1E6F5C] hover:bg-[#165B46] px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {currentSlide.primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {currentSlide.secondaryCta && (
              <Link
                href={currentSlide.secondaryCta.href}
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {currentSlide.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - only show if more than 1 slide */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* Indicators - only show if more than 1 slide */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
