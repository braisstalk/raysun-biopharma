'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { HeroConfig } from '@/types/home'

interface HomeHeroVideoProps {
  config: HeroConfig
}

export default function HomeHeroVideo({ config }: HomeHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleVideoError = () => {
    setHasError(true)
  }

  const handleVideoCanPlay = () => {
    setIsLoaded(true)
  }

  // Fallback for reduced motion or video error - premium brand look
  if (prefersReducedMotion || hasError) {
    return (
      <section className="relative bg-slate-900 text-white pt-16 overflow-hidden">
        {/* Abstract gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
          {/* Decorative orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-blue-300 font-medium mb-4 tracking-widest uppercase text-sm">Raysun Biopharma</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {config.title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {config.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={config.primaryCta.href} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                {config.primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={config.secondaryCta.href} className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-6 py-3 rounded-lg font-medium transition-colors">
                {config.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-slate-900 text-white pt-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          poster={config.posterImage}
          onError={handleVideoError}
          onCanPlay={handleVideoCanPlay}
        >
          <source src={config.videoUrl} type="video/mp4" />
        </video>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-blue-900/30" />
        
        {/* Additional gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="text-blue-300 font-medium mb-4 tracking-widest uppercase text-sm">Raysun Biopharma</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {config.title}
          </h1>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl leading-relaxed">
            {config.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={config.primaryCta.href} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
              {config.primaryCta.label} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={config.secondaryCta.href} className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-6 py-3 rounded-lg font-medium transition-colors">
              {config.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
