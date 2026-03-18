// Content Home Page Types

export interface ContentHero {
  title: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export interface ContentStat {
  value: string
  label: string
}

export interface ContentFeature {
  id: string
  title: string
  description: string
  icon: string
  cta?: { label: string; href: string }
}

export interface ContentIntro {
  title: string
  description: string
  cta: { label: string; href: string }
}

export interface ContentVideoSection {
  title: string
  description: string
  videoUrl?: string
  posterImage?: string
  cta: { label: string; href: string }
}

export interface ContentCTA {
  title: string
  description?: string
  cta: { label: string; href: string }
}

export interface ContentHomePage {
  hero: ContentHero
  stats: ContentStat[]
  about: ContentIntro
  videoSection: ContentVideoSection
  features?: ContentFeature[]
  ctaSection?: ContentCTA
  aiAssistant: ContentCTA
}
