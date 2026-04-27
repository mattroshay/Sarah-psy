import Image from 'next/image'
import type { BlogDict } from '@/lib/i18n/types'
import type { PostMeta } from '@/lib/types'
import type { Locale } from '@/lib/routes'
import { BlogPostCard } from '@/components/ui/BlogPostCard'
import { Banner } from '@/components/ui/Banner'

interface BlogPostProps {
  post: PostMeta
  locale: Locale
  blog: BlogDict
  content: React.ReactNode
  relatedPosts: PostMeta[]
  calendlyUrl?: string
  bookCallLabel: string
  bookCallBody: string
  bookCallButton: string
}

export function BlogPost({
  post,
  locale,
  blog,
  content,
  relatedPosts,
  calendlyUrl,
  bookCallLabel,
  bookCallBody,
  bookCallButton,
}: BlogPostProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      {post.heroImage && (
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-muted mb-6">
        <time dateTime={post.publishedAt}>
          {blog.publishedOn} {post.publishedAt}
        </time>
        <span aria-hidden="true">·</span>
        <span>{blog.readingTime(post.readingTimeMinutes)}</span>
      </div>

      <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-8 leading-tight">
        {post.title}
      </h1>

      {/* MDX body */}
      <div className="prose prose-sage max-w-none">{content}</div>

      {/* CTA */}
      <div className="mt-12">
        <Banner
          heading={bookCallLabel}
          body={bookCallBody}
          buttonLabel={bookCallButton}
          buttonHref={calendlyUrl ?? `/${locale}/contact`}
          variant="sage"
        />
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
            {blog.relatedPosts}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.slice(0, 2).map((related) => (
              <BlogPostCard
                key={related.slug}
                post={related}
                locale={locale}
                readMoreLabel={blog.readMore}
                readingTimeLabel={blog.readingTime(related.readingTimeMinutes)}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
