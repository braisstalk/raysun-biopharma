// Content Global Types - prefixed to avoid conflicts

export interface ContentSiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  locale: string
  timezone: string
  contact: {
    email: string
    phone: string
    address: string
    country: string
  }
  social: {
    linkedin?: string
    facebook?: string
    youtube?: string
    twitter?: string
    instagram?: string
  }
}

export interface ContentNavigationItem {
  id: string
  label: string
  href: string
  children?: ContentNavigationItem[]
}

export interface ContentNavigation {
  main: ContentNavigationItem[]
  utility: ContentNavigationItem[]
  footer: {
    columns: {
      title: string
      links: ContentNavigationItem[]
    }[]
  }
}
