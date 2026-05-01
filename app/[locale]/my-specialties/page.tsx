import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/sections/PageHeader'
import { Banner } from '@/components/ui/Banner'
import { TintedImage } from '@/components/ui/TintedImage'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, 'my-specialties', {
    title: 'My Specialties | Expats, Burnout & Parenting | Sarah Cousin Roshay',
    description:
      'Areas where I specialise: therapy for expats, burnout and work stress, and parenting support. Online CBT in English & French.',
  }, {
    title: "Mes spécialités | Expatriés, burn-out et parentalité | Sarah Cousin Roshay",
    description:
      "Domaines de spécialisation : thérapie pour expatriés, burn-out et stress professionnel, soutien à la parentalité. TCC en ligne en français et anglais.",
  })
}

export default async function MySpecialtiesPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { mySpecialties, cta } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  const services = [
    {
      key: 'expats',
      title: mySpecialties.services.expats.title,
      description: mySpecialties.services.expats.description,
      learnMore: mySpecialties.services.expats.learnMore,
      href: `/${locale}/blog#expats`,
      image: '/images/specialties-expats.jpg',
    },
    {
      key: 'burnout',
      title: mySpecialties.services.burnout.title,
      description: mySpecialties.services.burnout.description,
      learnMore: mySpecialties.services.burnout.learnMore,
      href: `/${locale}/blog#professionals`,
      image: '/images/specialties-burnout.jpg',
    },
    {
      key: 'parenting',
      title: mySpecialties.services.parenting.title,
      description: mySpecialties.services.parenting.description,
      learnMore: mySpecialties.services.parenting.learnMore,
      href: `/${locale}/blog#parents`,
      image: '/images/specialties-parenting.jpg',
    },
  ]

  return (
    <>
      <PageHeader title={mySpecialties.pageTitle} subtitle={mySpecialties.pageSubtitle} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ key, title, description, learnMore, href, image }) => (
            <article
              key={key}
              className="bg-warm border border-border rounded-xl overflow-hidden flex flex-col transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <TintedImage
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="font-heading text-lg font-bold text-charcoal">{title}</h3>
                <p className="text-sm text-charcoal leading-relaxed flex-1">{description}</p>
                <a
                  href={href}
                  className="text-sm font-medium text-sage hover:text-sage-dark transition-colors mt-auto"
                >
                  {learnMore} →
                </a>
              </div>
            </article>
          ))}
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
