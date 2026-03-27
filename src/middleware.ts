import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If already has /en prefix, continue
  if (pathname.startsWith('/en')) {
    return NextResponse.next()
  }

  // Redirect everything to /en
  const newUrl = new URL(`/en${pathname === '/' ? '' : pathname}`, request.url)
  newUrl.search = request.nextUrl.search
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|images|.*\\..*).*)'],
}
