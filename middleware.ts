import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE, FR_PUBLIC_SLUGS, getInternalSegment, type Locale } from './lib/routes'

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const preferred = acceptLanguage.split(',')[0]?.trim().toLowerCase() ?? ''
  if (preferred.startsWith('fr')) return 'fr'
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Determine if the path already has a locale prefix
  const pathnameLocale = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) as Locale | undefined

  // No locale prefix — redirect based on Accept-Language
  if (!pathnameLocale) {
    const locale = detectLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname}`
    const response = NextResponse.redirect(url)
    response.headers.set('x-locale', locale)
    return response
  }

  // Rewrite FR locale-specific public slugs to internal (EN) segment names
  // e.g. /fr/a-propos → served by app/[locale]/about/page.tsx
  if (pathnameLocale === 'fr') {
    const segments = pathname.split('/') // ['', 'fr', 'slug', ...]
    const secondSegment = segments[2] // the slug after /fr/

    if (secondSegment && FR_PUBLIC_SLUGS.includes(secondSegment)) {
      const internal = getInternalSegment('fr', secondSegment)
      const url = request.nextUrl.clone()
      url.pathname = ['', 'fr', internal, ...segments.slice(3)].join('/')
      const response = NextResponse.rewrite(url)
      response.headers.set('x-locale', 'fr')
      return response
    }
  }

  // Pass through — set x-locale header for root layout
  const response = NextResponse.next()
  response.headers.set('x-locale', pathnameLocale)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|logo|icon|apple-touch|images|sitemap|robots).*)',
  ],
}
