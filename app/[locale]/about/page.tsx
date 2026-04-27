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
    title: 'About Sarah | Bilingual CBT Therapist | Sarah Cousin Roshay',
    description:
      'Bilingual CBT therapist with lived expat experience, 15 years in corporate, and certified parenting support training. Online in English & French.',
    imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  }, {
    title: "À propos | Thérapeute TCC bilingue | Sarah Cousin Roshay",
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

  const isEn = locale === 'en'

  return (
    <>
      <PageHeader title={about.pageTitle} subtitle={about.pageSubtitle} />

      {/* Story section */}
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
              <p>
                {isEn
                  ? 'For fifteen years, Sarah worked in corporate environments — in roles that demanded performance, resilience, and an ability to absorb pressure without showing it. She knows what it means to succeed on the outside while quietly struggling on the inside. [DRAFT — review with Sarah]'
                  : "Pendant quinze ans, Sarah a évolué dans des environnements d'entreprise — des rôles qui exigeaient performance, résilience et la capacité d'absorber la pression sans le montrer. Elle sait ce que c'est que de réussir en apparence tout en luttant en silence. [DRAFT — à relire avec Sarah]"}
              </p>
              <p>
                {isEn
                  ? 'Moving abroad and becoming a parent brought new layers of complexity — the isolation of expat life, the identity shift of matrescence, the feeling of being between worlds. These experiences became the foundation of a second career. [DRAFT — review with Sarah]'
                  : "Partir à l'étranger et devenir parent ont ajouté de nouvelles couches de complexité — l'isolement de la vie d'expatriée, le bouleversement identitaire de la matrescence, la sensation d'être entre deux mondes. Ces expériences sont devenues le fondement d'une seconde carrière. [DRAFT — à relire avec Sarah]"}
              </p>
              <p>
                {isEn
                  ? 'Sarah trained in Cognitive Behavioural Therapy and earned a specialist qualification in parenting support. Today she works online with expats, professionals, and parents across Europe — in English and French, whichever language feels right in the moment. [DRAFT — review with Sarah]'
                  : "Sarah s'est formée à la thérapie cognitivo-comportementale (TCC) et a obtenu une qualification spécialisée en soutien parental. Aujourd'hui, elle travaille en ligne avec des expatriés, des professionnels et des parents à travers l'Europe — en anglais et en français, selon ce qui convient à chaque personne. [DRAFT — à relire avec Sarah]"}
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-4">
              {about.credentialsHeading}
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                isEn ? 'CBT Certification — [VERIFY WITH SARAH]' : 'Certification TCC — [VERIFY WITH SARAH]',
                isEn ? 'Parenting Support Qualification — [VERIFY WITH SARAH]' : 'Qualification en soutien parental — [VERIFY WITH SARAH]',
                isEn ? 'Professional membership — [VERIFY WITH SARAH]' : 'Membre de [organisme] — [VERIFY WITH SARAH]',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="text-sage mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div>
            <h2 className="font-heading text-xl font-bold text-charcoal mb-3">
              {about.approachHeading}
            </h2>
            <p className="text-charcoal leading-relaxed text-sm">
              {isEn
                ? 'Sessions are collaborative, practical, and focused on what you can actually do — not just on understanding why things are hard. CBT gives you tools you can use between sessions, not just in the therapy room. [DRAFT — review with Sarah]'
                : 'Les séances sont collaboratives, pratiques et orientées vers ce que vous pouvez concrètement faire — pas seulement vers la compréhension de pourquoi c\'est difficile. La TCC vous donne des outils à utiliser entre les séances, pas seulement dans le cabinet. [DRAFT — à relire avec Sarah]'}
            </p>
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
