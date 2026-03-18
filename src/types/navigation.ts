// Navigation Types
export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  items?: NavItem[]
}

export interface NavigationConfig {
  items: NavItem[]
  ctaButtons: {
    verify: { label: string; href: string }
    orderNow: { label: string; href: string }
    aiAssistant: { label: string; href: string }
  }
  language: {
    default: string
    options: { code: string; label: string }[]
  }
}

export interface WhatScienceMenuItem {
  label: string
  href: string
  description?: string
  icon?: string
}
