// Media Types for future CMS integration

export interface MediaConfig {
  video: {
    hero: VideoConfig
    feature: VideoConfig
  }
  images: ImageConfig
}

export interface VideoConfig {
  url: string
  poster: string
  fallback?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

export interface ImageConfig {
  hero: string
  factory: string
  team: string
  products: string[]
  news: string[]
  resources: string[]
  global: string
}

export interface ReducedMotionPreference {
  prefersReducedMotion: boolean
}

export interface VideoErrorState {
  hasError: boolean
  errorType?: 'load' | 'decode' | 'network'
}
