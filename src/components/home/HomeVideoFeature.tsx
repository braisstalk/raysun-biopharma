'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Pause } from 'lucide-react'
import { VideoSectionConfig } from '@/types/home'

interface HomeVideoFeatureProps {
  config: VideoSectionConfig
}

export default function HomeVideoFeature({ config }: HomeVideoFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPoster, setShowPoster] = useState(true)

  const handlePlay = () => {
    setIsPlaying(true)
    setShowPoster(false)
  }

  const handleClose = () => {
    setIsPlaying(false)
    setShowPoster(true)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const id = match && match[2].length === 11 ? match[2] : null
    return id ? `https://www.youtube.com/embed/${id}` : url
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {config.title}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {config.description}
            </p>
            <Link 
              href={config.cta.href}
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all group"
            >
              {config.cta.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right: Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-900">
              {showPoster ? (
                <>
                  {/* Poster with play button */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={handlePlay}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
                    
                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 bg-teal-500/20 rounded-full blur-xl" />
                    
                    {/* Play Button */}
                    <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                    
                    {/* Label */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Featured Video
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {config.type === 'youtube' ? (
                    <div className="relative w-full h-full">
                      <iframe
                        className="w-full h-full"
                        src={`${getYouTubeEmbedUrl(config.youtubeUrl || '')}?autoplay=1`}
                        title={config.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {/* Close button overlay */}
                      <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    >
                      <source src={config.localVideoUrl} type="video/mp4" />
                    </video>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
