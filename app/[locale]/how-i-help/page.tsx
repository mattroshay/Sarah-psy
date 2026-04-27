import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/sections/PageHeader'
import { Carousel, type CarouselItem } from '@/components/ui/Carousel'
import { Banner } from '@/components/ui/Banner'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, 'how-i-help', {
    title: 'How I Help | Expats, Burnout & Parenting | Sarah Cousin Roshay',
    description:
      'CBT therapy for expats, professionals experiencing burnout, and parents. Online in English & French with a therapist who has lived each of these experiences.',
  }, {
    title: "Comment j'accompagne | Expatriés, Burn-out & Parentalité | Sarah Cousin Roshay",
    description:
      "Thérapie TCC pour expatriés, professionnels en burn-out et parents. En ligne en anglais et français avec une thérapeute qui a vécu ces expériences.",
  })
}

const SuitcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export default async function HowIHelpPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { howIHelp, cta } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  const carouselItems: CarouselItem[] = [
    {
      id: 'expats',
      icon: <SuitcaseIcon />,
      title: howIHelp.services.expats.title,
      description: howIHelp.services.expats.description,
      learnMoreLabel: howIHelp.services.expats.learnMore,
      learnMoreHref: `/${locale}/blog#expats`,
      accentColor: 'sage',
    },
    {
      id: 'burnout',
      icon: <BriefcaseIcon />,
      title: howIHelp.services.burnout.title,
      description: howIHelp.services.burnout.description,
      learnMoreLabel: howIHelp.services.burnout.learnMore,
      learnMoreHref: `/${locale}/blog#professionals`,
      accentColor: 'terra',
    },
    {
      id: 'parenting',
      icon: <HeartIcon />,
      title: howIHelp.services.parenting.title,
      description: howIHelp.services.parenting.description,
      learnMoreLabel: howIHelp.services.parenting.learnMore,
      learnMoreHref: `/${locale}/blog#parents`,
      accentColor: 'gold',
    },
  ]

  return (
    <>
      <PageHeader title={howIHelp.pageTitle} subtitle={howIHelp.pageSubtitle} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Carousel items={carouselItems} />
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
