// Content News Types

export interface ContentNewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
  slug: string
}

export interface ContentNewsArticle {
  id: string
  title: string
  slug: string
  date: string
  category: string
  excerpt: string
  content: string
  image?: string
  author?: string
  relatedArticles?: string[] // IDs of related articles
}

export interface ContentNewsPage {
  hero: {
    title: string
    subtitle: string
  }
  categories: {
    id: string
    label: string
  }[]
  items: ContentNewsItem[]
}
