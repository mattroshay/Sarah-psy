import type { Metadata } from 'next'
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

  return buildMetadata(locale as Locale, 'faq', {
    title: 'FAQ | Online CBT Therapy | Sarah Cousin Roshay',
    description:
      'Answers to common questions about online CBT therapy sessions, languages, confidentiality, and how to book a free discovery call with Sarah.',
  }, {
    title: 'FAQ | Thérapie TCC en ligne | Sarah Cousin Roshay',
    description:
      'Réponses aux questions fréquentes sur les séances de TCC en ligne, les langues, la confidentialité et comment réserver un appel découverte.',
  })
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { faq, cta } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  return (
    <>
      <PageHeader title={faq.pageTitle} subtitle={faq.pageSubtitle} />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <dl className="flex flex-col gap-4">
          {faq.items.map((item, i) => (
            <details
              key={i}
              className="border border-border rounded-xl overflow-hidden group"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none bg-warm hover:bg-sage-light transition-colors">
                <dt className="font-heading text-base font-bold text-charcoal pr-4">
                  {item.question}
                </dt>
                <span aria-hidden="true" className="text-sage shrink-0 group-open:rotate-180 transition-transform duration-200">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <dd className="px-6 pb-5 pt-3 text-charcoal leading-relaxed text-sm">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
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
