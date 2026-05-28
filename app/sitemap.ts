import { MetadataRoute } from 'next'
import { LOCALES, getPublicSlug, type Locale } from '@/lib/routes'
import { getAllPosts } from '@/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'

const STATIC_PAGES = ['', 'about', 'how-i-help', 'my-specialties', 'faq', 'blog', 'contact']

function urlFor(locale: Locale, page: string): string {
  const slug = page ? getPublicSlug(locale, page) : ''
  return `${SITE_URL}/${locale}${slug ? `/${slug}` : ''}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []
  const lastModified = new Date()

  // Static pages: one entry per locale, each cross-referencing every alternate.
  for (const page of STATIC_PAGES) {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, urlFor(l, page)]),
    )
    for (const locale of LOCALES) {
      entries.push({
        url: urlFor(locale, page),
        lastModified,
        alternates: { languages },
      })
    }
  }

  // TODO: emit hreflang alternates for blog posts. EN and FR posts have
  // different slugs and no explicit link between them; add a `translationSlug`
  // (or similar) frontmatter field to lib/blog.ts so we can pair them here.
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
