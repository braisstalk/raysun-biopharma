import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// i18n configuration - inline to avoid import issues in middleware
const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'lo', 'th', 'vi', 'ar', 'es', 'pt'],
} as const

// Paths that don't need locale prefix
const publicPaths = [
  '/sitemap.xml',
  '/robots.txt',
  '/api/',
  '/_next/',
  '/favicon.ico',
  '/images/',
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip static files and API routes
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }
  
  // Check if pathname already has a locale prefix
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next()
  }
  
  // For now, just pass through without redirecting
  // The language switching will be handled client-side
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|api|images).*)',
  ],
}
