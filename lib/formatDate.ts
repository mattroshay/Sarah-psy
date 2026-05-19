import type { Locale } from './routes'

/**
 * Render an ISO date (YYYY-MM-DD) in the site's canonical long-form style:
 * "5 February 2026" (en-GB) / "5 février 2026" (fr-FR).
 *
 * Used on blog post pages and blog index cards so the format never drifts.
 */
export function formatPublishDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
