import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale, getPublicSlug } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { Hero } from '@/components/ui/Hero'
import { Card } from '@/components/ui/Card'
import { Testimonial } from '@/components/ui/Testimonial'
import { Banner } from '@/components/ui/Banner'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, null, {
    title: 'CBT Therapist Online | Expats & Professionals | Sarah Cousin Roshay',
    description:
      'Bilingual CBT therapy online in English & French. Specialising in expat life, work stress, burnout and anxiety. Book a free call today.',
    imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  }, {
    title: 'Thérapeute TCC en ligne | Expatriés & Professionnels | Sarah Cousin Roshay',
    description:
      'Thérapie TCC en ligne en français et anglais. Spécialisée en expatriation, stress professionnel et anxiété. Réservez un appel découverte.',
    imageUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`
  const { home } = dict

  const audienceLinks: Record<string, string> = {
    expats: `/${locale}/blog#expats`,
    professionals: `/${locale}/blog#professionals`,
    parents: `/${locale}/blog#parents`,
  }

  return (
    <>
      {/* Hero */}
      <Hero
        tagline={home.heroTagline}
        subhead={home.heroSubhead}
        primaryLabel={home.heroPrimary}
        primaryHref={calendlyUrl}
        secondaryLabel={home.heroSecondary}
        secondaryHref={`/${locale}/${getPublicSlug(locale as Locale, 'about')}`}
        imageSrc="/images/sarah-headshot.jpg"
        imageAlt="Sarah Cousin Roshay — bilingual CBT therapist"
      />

      {/* Intro block */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
          {home.introHeading}
        </h2>
        <p className="text-lg text-charcoal leading-relaxed">{home.introBody}</p>
      </section>

      {/* About strip */}
      <section className="bg-sage-light py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-4">
              {home.aboutStripHeading}
            </h2>
            <p className="text-charcoal leading-relaxed">{home.aboutStripBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {home.credentialBadges.map((label) => (
              <div
                key={label}
                className="bg-white rounded-xl p-4 flex items-center justify-center text-center border border-border"
              >
                <span className="text-sm font-medium text-charcoal">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
          {home.audienceHeading}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {(['expats', 'professionals', 'parents'] as const).map((key) => (
            <a
              key={key}
              href={audienceLinks[key]}
              className="block group"
            >
              <Card className="h-full flex flex-col gap-3 group-hover:border-sage transition-colors">
                <h3 className="font-heading text-base font-bold text-charcoal group-hover:text-sage transition-colors">
                  {home.audience[key].label}
                </h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {home.audience[key].description}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-warm py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 text-center">
            {home.testimonialsHeading}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {home.testimonials.map((t) => (
              <Testimonial key={t.attribution} quote={t.quote} attribution={t.attribution} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Banner
          heading={home.ctaBannerHeading}
          body={home.ctaBannerBody}
          buttonLabel={home.ctaBannerButton}
          buttonHref={calendlyUrl}
          variant="sage"
        />
      </div>
    </>
  )
}
