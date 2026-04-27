import type { Locale } from './routes'

export interface PostMeta {
  title: string
  slug: string
  locale: Locale
  topic: 'expats' | 'professionals' | 'parents'
  publishedAt: string
  excerpt: string
  keyword: string
  heroImage: string
  heroImageAlt: string
  relatedSlugs: string[]
  readingTimeMinutes: number
}
