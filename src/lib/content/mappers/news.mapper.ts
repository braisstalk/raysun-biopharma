// News Content Mapper

import { ContentNewsPage, ContentNewsItem, ContentNewsArticle } from '../types/content-news'

// Extended mock news data with full content
const newsArticles: ContentNewsArticle[] = [
  {
    id: '1',
    slug: 'gmp-re-certification-success',
    title: 'GMP Re-certification Success',
    date: 'Mar 15, 2026',
    category: 'Quality',
    excerpt: 'Our facility passed the WHO GMP re-certification audit with zero critical findings.',
    content: `Raysun Biopharma is proud to announce that our manufacturing facility has successfully completed the WHO GMP (Good Manufacturing Practice) re-certification audit with zero critical findings.

This achievement reflects our unwavering commitment to quality and compliance in pharmaceutical manufacturing. Our team has worked diligently to maintain the highest standards across all production lines.

Key highlights of the audit:
• Zero critical findings
• Full compliance with WHO GMP guidelines
• Continued certification for all product categories
• Recognition of our quality management systems

We remain dedicated to delivering safe, effective, and high-quality pharmaceutical products to our customers worldwide.`,
    author: 'Quality Team',
    relatedArticles: ['4', '2']
  },
  {
    id: '2',
    slug: 'new-asean-distribution-partnership',
    title: 'New ASEAN Distribution Partnership',
    date: 'Mar 1, 2026',
    category: 'Business',
    excerpt: 'Strategic partnership expands our presence across Southeast Asian markets.',
    content: `Raysun Biopharma is pleased to announce a strategic partnership with leading pharmaceutical distributors across the ASEAN region.

This collaboration will significantly expand our reach and ensure reliable access to quality medicines for healthcare providers and patients throughout Southeast Asia.

Partnership highlights:
• Distribution network covering 6 ASEAN countries
• Enhanced logistics and supply chain capabilities
• Local market expertise and regulatory support
• Commitment to affordable access to essential medicines

We look forward to building lasting partnerships that improve healthcare outcomes across the region.`,
    author: 'Business Development Team',
    relatedArticles: ['1', '3']
  },
  {
    id: '3',
    slug: 'rd-facility-expansion',
    title: 'R&D Facility Expansion',
    date: 'Feb 15, 2026',
    category: 'Innovation',
    excerpt: 'Investment in new research capabilities to drive pharmaceutical innovation.',
    content: `Raysun Biopharma is investing in the expansion of our Research and Development facility to advance pharmaceutical innovation and develop new therapies.

The expansion includes:
• State-of-the-art analytical laboratories
• Pilot plant for formulation development
• Enhanced stability testing capabilities
• Specialized teams for generic drug development

This investment underscores our commitment to innovation and positions us to bring more affordable pharmaceutical products to market.`,
    author: 'R&D Department',
    relatedArticles: ['5', '2']
  },
  {
    id: '4',
    slug: 'iso-14001-certification',
    title: 'ISO 14001 Certification',
    date: 'Jan 20, 2026',
    category: 'Quality',
    excerpt: 'Environmental management system certification achieved.',
    content: `Raysun Biopharma has achieved ISO 14001:2015 certification for our Environmental Management System (EMS).

This certification demonstrates our commitment to environmental sustainability in all aspects of our operations.

Certification scope:
• Manufacturing operations
• Quality control laboratories
• Warehouse and logistics
• Office administration

We continue to implement sustainable practices that minimize our environmental footprint while maintaining our commitment to quality healthcare.`,
    author: 'Quality Team',
    relatedArticles: ['1', '6']
  },
  {
    id: '5',
    slug: 'new-product-launch',
    title: 'New Product Launch',
    date: 'Dec 10, 2025',
    category: 'Products',
    excerpt: 'Introduction of five new softgel products to our portfolio.',
    content: `Raysun Biopharma is excited to announce the launch of five new softgel products, expanding our therapeutic offerings.

New products include:
• Cardiovascular formulations
• Vitamin supplements  
• Anti-allergic medications
• Gastrointestinal treatments
• Pain management solutions

All products are manufactured under strict GMP conditions and meet international quality standards.`,
    author: 'Product Management',
    relatedArticles: ['3', '2']
  },
  {
    id: '6',
    slug: 'sustainability-award',
    title: 'Sustainability Award',
    date: 'Nov 5, 2025',
    category: 'Recognition',
    excerpt: 'Recognized for environmental responsibility in manufacturing.',
    content: `Raysun Biopharma has been recognized for excellence in environmental sustainability at the annual Pharmaceutical Industry Awards.

This award highlights our efforts to implement sustainable manufacturing practices and reduce our environmental impact.

Initiatives recognized:
• Waste reduction programs
• Energy efficiency improvements
• Water conservation measures
• Green packaging solutions

We remain committed to sustainable development while delivering high-quality pharmaceutical products.`,
    author: 'Corporate Communications',
    relatedArticles: ['4', '1']
  },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'quality', label: 'Quality' },
  { id: 'business', label: 'Business' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'products', label: 'Products' },
  { id: 'recognition', label: 'Recognition' },
]

export function mapNewsContent(): ContentNewsPage {
  return {
    hero: {
      title: 'Latest News & Updates',
      subtitle: 'Stay informed about our latest developments, partnerships, and achievements.'
    },
    categories: categories.map(cat => ({
      id: cat.id,
      label: cat.label
    })),
    items: newsArticles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      category: article.category,
      slug: article.slug
    }))
  }
}

export function getNewsArticleBySlug(slug: string): ContentNewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug)
}

export function getAllNewsArticles(): ContentNewsArticle[] {
  return newsArticles
}

export function getRelatedNews(articleId: string): ContentNewsArticle[] {
  const article = newsArticles.find(a => a.id === articleId)
  if (!article || !article.relatedArticles) return []
  return newsArticles.filter(a => article.relatedArticles?.includes(a.id))
}
