import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/sections/PageHeader'
import { BlogIndex } from '@/components/sections/BlogIndex'
import { getAllPosts } from '@/lib/blog'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, 'blog', {
    title: 'Therapy Blog | Expat, Burnout & Parenting Support | Sarah Cousin Roshay',
    description:
      'Practical reading on expat life, burnout, and modern parenthood — written by a bilingual CBT therapist who has lived each of these experiences.',
  }, {
    title: 'Blog — Thérapie pour expatriés, burnout & parentalité',
    description:
      "Réflexions pratiques sur l'expatriation, le burn-out et la parentalité — par une thérapeute TCC bilingue qui a vécu ces expériences de l'intérieur.",
  })
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { blog } = dict

  const posts = await getAllPosts(locale as Locale)

  return (
    <>
      <PageHeader title={blog.pageTitle} subtitle={blog.pageSubtitle} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <BlogIndex locale={locale as Locale} blog={blog} posts={posts} />
      </section>
    </>
  )
}
