import type { Metadata } from 'next'
import type { Locale } from './routes'
import { getPublicSlug } from './routes'

interface PageMeta {
  title: string
  description: string
  imageUrl?: string
}

/**
 * Builds a complete Metadata object for a page, including canonical URL,
 * hreflang alternates, OpenGraph, and Twitter card.
 *
 * internalSegment: the folder name used in app/[locale]/<segment>/page.tsx
 * (always the EN slug — proxy handles FR rewriting)
 */
export function buildMetadata(
  locale: Locale,
  internalSegment: string | null,
  en: PageMeta,
  fr: PageMeta
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'
  const current = locale === 'en' ? en : fr

  const enPath = internalSegment
    ? `${siteUrl}/en/${internalSegment}`
    : `${siteUrl}/en`
  const frPath = internalSegment
    ? `${siteUrl}/fr/${getPublicSlug('fr', internalSegment)}`
    : `${siteUrl}/fr`

  const canonicalPath = locale === 'en' ? enPath : frPath

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: enPath,
        fr: frPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: canonicalPath,
      siteName: 'Sarah Cousin Roshay',
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      type: 'website',
      ...(current.imageUrl && { images: [{ url: current.imageUrl }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      ...(current.imageUrl && { images: [current.imageUrl] }),
    },
  }
}
