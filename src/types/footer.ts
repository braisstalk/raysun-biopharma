// Footer Types

export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocials {
  linkedin: string
  facebook: string
  youtube: string
  x: string
  instagram: string
}

export interface FooterContact {
  title: string
  email: string
  phone: string
  mobile: string
  address: string
}

export interface FooterBottom {
  copyright: string
  privacy: string
  terms: string
  sitemap: string
}

export interface FooterBrand {
  name: string
  description: string
  socials: FooterSocials
}

export interface FooterConfig {
  brand: FooterBrand
  columns: FooterColumn[]
  contact: FooterContact
  bottom: FooterBottom
}
