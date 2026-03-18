// Content Products Types

export interface ContentProductCategory {
  id: string
  name: string
  description: string
  icon?: string
}

export interface ContentProduct {
  id: string
  slug: string
  name: string
  genericName?: string
  category: string
  dosageForm: string
  strength?: string
  description: string
  indications?: string[]
  features?: string[]
  tags?: string[]
  type?: 'brand' | 'generic'
  packSize?: string
  storage?: string
  shelfLife?: string
  route?: string
  regulatory?: string
  availability?: string
  packaging?: string
  relatedProducts?: string[]
  documents?: {
    sheet?: string
    coa?: string
    leaflet?: string
  }
}

export interface ContentProductTab {
  id: string
  label: string
}

export interface ContentProductsPage {
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
    slides: {
      id: string
      title: string
      subtitle: string
    }[]
  }
  tabs: ContentProductTab[]
  categories: ContentProductCategory[]
  perPage: number
}
