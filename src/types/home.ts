// Home Page Types

export interface HeroConfig {
  videoUrl: string
  posterImage: string
  title: string
  subtitle: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
}

export interface VideoSectionConfig {
  type: 'youtube' | 'local'
  youtubeUrl?: string
  localVideoUrl?: string
  posterImage: string
  title: string
  description: string
  cta: {
    label: string
    href: string
  }
}

export interface HomeContent {
  hero: HeroConfig
  videoSection: VideoSectionConfig
  stats: { value: string; label: string }[]
  about: {
    title: string
    description: string
    cta: { label: string; href: string }
  }
  capabilities: {
    title: string
    items: { title: string; description: string; icon: string }[]
  }
  products: {
    title: string
    categories: { name: string; description: string; count: number; href: string }[]
  }
  cta: {
    verify: { title: string; description: string; cta: { label: string; href: string } }
    order: { title: string; description: string; cta: { label: string; href: string } }
  }
  aiAssistant: {
    title: string
    description: string
    cta: { label: string; href: string }
  }
  news: {
    title: string
    items: { date: string; title: string; category: string }[]
  }
  resources: {
    title: string
    items: { title: string; type: string; size: string }[]
  }
  contact: {
    title: string
    ctas: { label: string; href: string }[]
  }
}
