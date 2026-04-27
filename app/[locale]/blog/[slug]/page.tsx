import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { getAllPosts, getPost } from '@/lib/blog'
import { BlogPostCard } from '@/components/ui/BlogPostCard'
import { Banner } from '@/components/ui/Banner'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of LOCALES) {
    const posts = await getAllPosts(locale)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!LOCALES.includes(locale as Locale)) return {}
  const post = await getPost(locale as Locale, slug)
  if (!post) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [{ url: `${siteUrl}${post.meta.heroImage}` }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const post = await getPost(locale as Locale, slug)
  if (!post) notFound()

  const dict = await getDictionary(locale as Locale)
  const { cta, blog } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  // Related posts (same topic, same locale, excluding current)
  const allPosts = await getAllPosts(locale as Locale)
  const related = allPosts
    .filter(p => p.slug !== slug && p.topic === post.meta.topic)
    .slice(0, 3)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero image */}
      <div className="relative h-72 rounded-2xl overflow-hidden mb-10">
        <Image
          src={post.meta.heroImage}
          alt={post.meta.heroImageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      {/* Header */}
      <header className="mb-10">
        <p className="text-sm text-muted uppercase tracking-wider mb-3">
          {post.meta.topic} · {blog.readingTime(post.meta.readingTimeMinutes)}
        </p>
        <h1 className="font-heading text-4xl font-bold text-charcoal mb-4 leading-tight">
          {post.meta.title}
        </h1>
        <p className="text-muted text-sm">
          {new Date(post.meta.publishedAt).toLocaleDateString(
            locale === 'fr' ? 'fr-FR' : 'en-GB',
            { year: 'numeric', month: 'long', day: 'numeric' }
          )}
        </p>
      </header>

      {/* MDX body */}
      <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-a:text-sage prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={post.content} />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-8">
            {blog.relatedPosts}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(p => (
              <BlogPostCard
                key={p.slug}
                post={p}
                locale={locale as Locale}
                readMoreLabel={blog.readMore}
                readingTimeLabel={blog.readingTime(p.readingTimeMinutes)}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-16">
        <Banner
          heading={cta.bookCall}
          body={cta.bookCallBody}
          buttonLabel={cta.bookCallButton}
          buttonHref={calendlyUrl}
          variant="sage"
        />
      </div>
    </article>
  )
}
