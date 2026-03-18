// Home Content Mapper - maps old config to new ContentHomePage type

import { ContentHomePage } from '../types/content-home'
import { homeContent } from '@/config/home'

export function mapHomeContent(): ContentHomePage {
  return {
    hero: {
      title: homeContent.hero.title,
      subtitle: homeContent.hero.subtitle,
      primaryCta: {
        label: homeContent.hero.primaryCta.label,
        href: homeContent.hero.primaryCta.href
      },
      secondaryCta: {
        label: homeContent.hero.secondaryCta.label,
        href: homeContent.hero.secondaryCta.href
      }
    },
    stats: homeContent.stats.map(stat => ({
      value: stat.value,
      label: stat.label
    })),
    about: {
      title: homeContent.about.title,
      description: homeContent.about.description,
      cta: {
        label: homeContent.about.cta.label,
        href: homeContent.about.cta.href
      }
    },
    videoSection: {
      title: homeContent.videoSection.title,
      description: homeContent.videoSection.description,
      videoUrl: homeContent.videoSection.youtubeUrl,
      posterImage: homeContent.videoSection.posterImage,
      cta: {
        label: homeContent.videoSection.cta.label,
        href: homeContent.videoSection.cta.href
      }
    },
    features: homeContent.capabilities?.items ? homeContent.capabilities.items.map((card, idx) => ({
      id: `feature-${idx}`,
      title: card.title,
      description: card.description,
      icon: card.icon
    })) : undefined,
    ctaSection: undefined,
    aiAssistant: {
      title: homeContent.aiAssistant.title,
      description: homeContent.aiAssistant.description,
      cta: { label: homeContent.aiAssistant.cta.label, href: homeContent.aiAssistant.cta.href }
    }
  }
}
