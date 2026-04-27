export type Locale = 'en' | 'fr'

export const LOCALES: Locale[] = ['en', 'fr']
export const DEFAULT_LOCALE: Locale = 'en'

/**
 * Maps the internal route segment (used in the file system) to its public-facing
 * slug per locale. Keys are the EN segment names; values are the FR public slugs.
 *
 * Routes that use the same slug in both locales are NOT listed here.
 */
const FR_SLUG_OVERRIDES: Record<string, string> = {
  about: 'a-propos',
  'how-i-help': 'comment-je-vous-aide',
}

/** Reverse map: FR public slug → internal (EN) segment */
const FR_SLUG_TO_INTERNAL: Record<string, string> = Object.fromEntries(
  Object.entries(FR_SLUG_OVERRIDES).map(([internal, frSlug]) => [frSlug, internal])
)

/**
 * Given a locale and an internal route segment (EN name), returns the public slug.
 * e.g. getPublicSlug('fr', 'about') → 'a-propos'
 */
export function getPublicSlug(locale: Locale, internalSegment: string): string {
  if (locale === 'fr' && FR_SLUG_OVERRIDES[internalSegment]) {
    return FR_SLUG_OVERRIDES[internalSegment]
  }
  return internalSegment
}

/**
 * Given a locale and a public slug, returns the internal (EN) segment.
 * Used by the proxy to rewrite FR locale-specific slugs before routing.
 * e.g. getInternalSegment('fr', 'a-propos') → 'about'
 */
export function getInternalSegment(locale: Locale, publicSlug: string): string {
  if (locale === 'fr' && FR_SLUG_TO_INTERNAL[publicSlug]) {
    return FR_SLUG_TO_INTERNAL[publicSlug]
  }
  return publicSlug
}

/**
 * Returns the equivalent path in the other locale for use by LanguageToggle.
 * Handles locale-specific slug translation.
 * e.g. getAlternatePath('en', '/en/about') → '/fr/a-propos'
 *      getAlternatePath('fr', '/fr/a-propos') → '/en/about'
 */
export function getAlternatePath(currentLocale: Locale, currentPath: string): string {
  const targetLocale: Locale = currentLocale === 'en' ? 'fr' : 'en'

  // Strip the locale prefix to get the segment(s)
  const withoutLocale = currentPath.replace(`/${currentLocale}`, '') || '/'

  // Split into segments and translate each if needed
  const segments = withoutLocale.split('/').filter(Boolean)

  const translatedSegments = segments.map((seg) => {
    // currentLocale → internal → targetLocale
    const internal = getInternalSegment(currentLocale, seg)
    return getPublicSlug(targetLocale, internal)
  })

  const translatedPath = translatedSegments.length > 0
    ? '/' + translatedSegments.join('/')
    : ''

  return `/${targetLocale}${translatedPath}`
}

/** All locale-specific FR slugs that require proxy rewriting */
export const FR_PUBLIC_SLUGS = Object.values(FR_SLUG_OVERRIDES)
