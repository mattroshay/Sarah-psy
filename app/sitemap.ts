import { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/routes'
import { getAllPosts } from '@/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'

const STATIC_PAGES = ['', 'about', 'how-i-help', 'my-specialties', 'faq', 'blog', 'contact']

const FR_SLUG_MAP: Record<string, string> = {
  about: 'a-propos',
  'how-i-help': 'comment-je-vous-aide',
  'my-specialties': 'mes-specialites',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const page of STATIC_PAGES) {
    const enPath = `/en${page ? `/${page}` : ''}`
    const frSegment = FR_SLUG_MAP[page] ?? page
    const frPath = `/fr${frSegment ? `/${frSegment}` : ''}`

    entries.push({
      url: `${SITE_URL}${enPath}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE_URL}${enPath}`,
          fr: `${SITE_URL}${frPath}`,
        },
      },
    })
  }

  // Blog posts
  for (const locale of LOCALES) {
    const posts = await getAllPosts(locale)
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
      })
    }
  }

  return entries
}
