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

  // If has /en prefix, rewrite to remove it (URL stays clean)
  if (pathname.startsWith('/en')) {
    const newPath = pathname.replace(/^\/en/, '') || '/'
    const newUrl = new URL(newPath, request.url)
    newUrl.search = request.nextUrl.search
    return NextResponse.rewrite(newUrl)
  }

  // Continue for all other paths
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon\.ico|images|.*\..*).*)'],
}
