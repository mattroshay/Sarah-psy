import type { BlogDict } from '@/lib/i18n/types'
import type { PostMeta } from '@/lib/types'
import type { Locale } from '@/lib/routes'
import { AccordionSection } from '@/components/ui/AccordionSection'
import { BlogPostCard } from '@/components/ui/BlogPostCard'

type Topic = 'expats' | 'professionals' | 'parents'

interface BlogIndexProps {
  locale: Locale
  blog: BlogDict
  posts: PostMeta[]
}

const SECTIONS: { id: string; topic: Topic }[] = [
  { id: 'expats', topic: 'expats' },
  { id: 'professionals', topic: 'professionals' },
  { id: 'parents', topic: 'parents' },
]

export function BlogIndex({ locale, blog, posts }: BlogIndexProps) {
  return (
    <div className="flex flex-col gap-4">
      {SECTIONS.map(({ id, topic }) => {
        const section = blog.sections[topic]
        const topicPosts = posts.filter((p) => p.topic === topic)

        return (
          <AccordionSection key={id} id={id} heading={section.heading}>
            <p className="text-muted mb-6 leading-relaxed">{section.intro}</p>
            {topicPosts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicPosts.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    readMoreLabel={blog.readMore}
                    readingTimeLabel={blog.readingTime(post.readingTimeMinutes)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted italic text-sm">Posts coming soon.</p>
            )}
          </AccordionSection>
        )
      })}
    </div>
  )
}
