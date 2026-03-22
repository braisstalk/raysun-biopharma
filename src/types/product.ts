// Product & Products Page Types

export interface Product {
  id: string
  name: string
  slug?: string
  category: string
  dosageForm: string
  description: string
  indication?: string
  tags?: string[]
  type?: 'brand' | 'generic'
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  icon: string
}

export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  gradient: string
  accentColor: string
}

export interface ProductTab {
  id: string
  label: string
}

export interface ProductsPageConfig {
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
    slides: HeroSlide[]
  }
  tabs: ProductTab[]
  categories: ProductCategory[]
  products: Product[]
  perPage: number
}
