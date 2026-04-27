import Image from 'next/image'
import type { PostMeta } from '@/lib/types'
import type { Locale } from '@/lib/routes'
import { cn } from '@/lib/cn'

interface BlogPostCardProps {
  post: PostMeta
  locale: Locale
  readMoreLabel: string
  readingTimeLabel: string
  className?: string
}

export function BlogPostCard({
  post,
  locale,
  readMoreLabel,
  readingTimeLabel,
  className,
}: BlogPostCardProps) {
  const href = `/${locale}/blog/${post.slug}`

  return (
    <article
      className={cn(
        'bg-white border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md flex flex-col',
        className
      )}
    >
      {post.heroImage && (
        <a href={href} tabIndex={-1} aria-hidden="true">
          <div className="relative h-48 w-full">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </a>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="text-xs text-muted uppercase tracking-wide">
          {post.publishedAt} · {readingTimeLabel}
        </p>
        <h3 className="font-heading text-lg font-bold text-charcoal leading-snug">
          <a href={href} className="hover:text-sage transition-colors">
            {post.title}
          </a>
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">{post.excerpt}</p>
        <a
          href={href}
          className="text-sm font-medium text-sage hover:text-sage-dark transition-colors mt-auto"
          aria-label={`${readMoreLabel}: ${post.title}`}
        >
          {readMoreLabel} →
        </a>
      </div>
    </article>
  )
}
