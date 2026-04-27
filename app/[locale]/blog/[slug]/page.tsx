import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'

type Props = { params: Promise<{ locale: string; slug: string }> }

// Phase 4 will replace this with real MDX post loading from lib/blog.ts.
// Until then, all slug routes 404 cleanly.

export async function generateStaticParams() {
  // Returns empty — no static posts yet. Dynamic generation added in Phase 4.
  return []
}

export default async function BlogPostPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  // Placeholder until Phase 4 wires up lib/blog.ts
  notFound()
}
