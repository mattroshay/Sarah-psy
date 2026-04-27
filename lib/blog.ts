import 'server-only'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { z } from 'zod'
import type { PostMeta } from '@/lib/types'

const PostFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  locale: z.enum(['en', 'fr']),
  topic: z.enum(['expats', 'professionals', 'parents']),
  publishedAt: z.string(),
  excerpt: z.string(),
  keyword: z.string(),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  relatedSlugs: z.array(z.string()),
})

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(locale: 'en' | 'fr'): Promise<PostMeta[]> {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  const posts = files.map(filename => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data } = matter(raw)
    const fm = PostFrontmatterSchema.parse(data)
    const words = raw.split(/\s+/).length
    const readingTimeMinutes = Math.ceil(words / 200)
    return { ...fm, readingTimeMinutes }
  })

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getPost(
  locale: 'en' | 'fr',
  slug: string
): Promise<{ meta: PostMeta; content: string } | null> {
  const dir = path.join(CONTENT_DIR, locale)
  const filepath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = PostFrontmatterSchema.parse(data)
  const words = raw.split(/\s+/).length
  const readingTimeMinutes = Math.ceil(words / 200)
  return { meta: { ...fm, readingTimeMinutes }, content }
}
