import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/sections/PageHeader'
import { Banner } from '@/components/ui/Banner'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, 'about', {
    title: 'About me | Bilingual CBT Therapist | Sarah Cousin Roshay',
    description:
      'Bilingual CBT therapist with lived expat experience, 15 years in corporate, and certified parenting support training. Online in English & French.',
    imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  }, {
    title: "À propos de moi | Thérapeute TCC bilingue | Sarah Cousin Roshay",
    description:
      "Thérapeute TCC bilingue avec une expérience vécue de l'expatriation, 15 ans en entreprise, et une formation certifiée en soutien parental.",
    imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { about, cta } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  return (
    <>
      <PageHeader title={about.pageTitle} subtitle={about.pageSubtitle} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12 items-start">
        <div className="relative h-[480px] rounded-2xl overflow-hidden">
          <Image
            src="/images/sarah-headshot.jpg"
            alt="Sarah Cousin Roshay"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
              {about.storyHeading}
            </h2>
            <div className="flex flex-col gap-4 text-charcoal leading-relaxed">
              {about.storyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">
              {about.credentialsHeading}
            </h2>
            <ul className="flex flex-col gap-3">
              {about.credentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="text-sage mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <Banner
          heading={cta.bookCall}
          body={cta.bookCallBody}
          buttonLabel={cta.bookCallButton}
          buttonHref={calendlyUrl}
          variant="sage"
        />
      </div>
    </>
  )
}
