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

  return buildMetadata(locale as Locale, 'how-i-help', {
    title: 'How I Help | CBT for Anxiety, Stress & Burnout | Sarah Cousin Roshay',
    description:
      'I use Cognitive Behavioural Therapy to help you understand anxiety, reduce overwhelm and build healthier patterns. Online sessions in English & French.',
  }, {
    title: "Comment j'accompagne | TCC pour anxiété, stress et burn-out | Sarah Cousin Roshay",
    description:
      "J'utilise la thérapie cognitivo-comportementale pour vous aider à comprendre l'anxiété, réduire la surcharge et construire des schémas plus sains. En ligne.",
  })
}

export default async function HowIHelpPage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { howIHelp, cta } = dict
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || `/${locale}/contact`

  return (
    <>
      <PageHeader title={howIHelp.pageTitle} />

      {/* Hero banner */}
      <section className="relative w-full h-[280px] md:h-[400px]">
        <TintedImage
          src="/images/how-i-help-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </section>

      {/* Intro with drop cap */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <p className="text-lg text-charcoal leading-relaxed first-letter:font-heading first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-sage-dark">
          {howIHelp.intro}
        </p>
      </section>

      {/* What is CBT */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-5">
          {howIHelp.cbt.heading}
        </h2>
        <div className="flex flex-col gap-4 text-charcoal leading-relaxed">
          {howIHelp.cbt.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-5 text-charcoal font-medium">{howIHelp.cbt.helpsYouLead}</p>
        <ul className="mt-3 flex flex-col gap-2 list-disc pl-6 text-charcoal leading-relaxed">
          {howIHelp.cbt.helpsYou.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-5 text-charcoal leading-relaxed">{howIHelp.cbt.closing}</p>
      </section>

      {/* Who I work with (with online therapy thumbnail) */}
      <section className="bg-warm py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-5">
              {howIHelp.whoIWorkWith.heading}
            </h2>
            <p className="text-charcoal leading-relaxed mb-3">{howIHelp.whoIWorkWith.lead}</p>
            <p className="text-charcoal font-medium">{howIHelp.whoIWorkWith.suitableLead}</p>
            <ul className="mt-3 flex flex-col gap-2 list-disc pl-6 text-charcoal leading-relaxed">
              {howIHelp.whoIWorkWith.suitable.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-charcoal leading-relaxed">{howIHelp.whoIWorkWith.closing}</p>
          </div>
          <div className="relative w-full md:w-72 h-56 md:h-72 shrink-0">
            <TintedImage
              src="/images/online-therapy.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              rounded
            />
          </div>
        </div>
      </section>

      {/* Common issues I support (with woman silhouette) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-5">
              {howIHelp.commonIssues.heading}
            </h2>
            <p className="text-charcoal leading-relaxed mb-3">{howIHelp.commonIssues.lead}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-6 text-charcoal leading-relaxed">
              {howIHelp.commonIssues.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-charcoal leading-relaxed">{howIHelp.commonIssues.closing}</p>
          </div>
          <div className="relative w-full md:w-64 h-72 md:h-96 shrink-0">
            <TintedImage
              src="/images/issues-i-work-with.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              rounded
            />
          </div>
        </div>
      </section>

      {/* How Therapy Works */}
      <section className="bg-sage-light py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-3 text-center">
            {howIHelp.howItWorks.heading}
          </h2>
          <p className="text-charcoal leading-relaxed text-center">
            {howIHelp.howItWorks.lead}
          </p>

          <div className="mt-8 bg-white rounded-2xl p-6 border border-border">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-3">
              {howIHelp.howItWorks.firstSession.heading}
            </h3>
            <p className="text-charcoal leading-relaxed">
              {howIHelp.howItWorks.firstSession.lead}
            </p>
            <ul className="mt-3 flex flex-col gap-2 list-disc pl-6 text-charcoal leading-relaxed">
              {howIHelp.howItWorks.firstSession.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 bg-white rounded-2xl p-6 border border-border">
            <h3 className="font-heading text-xl font-bold text-charcoal mb-3">
              {howIHelp.howItWorks.ongoing.heading}
            </h3>
            <p className="text-charcoal leading-relaxed">
              {howIHelp.howItWorks.ongoing.lead}
            </p>
            <ul className="mt-3 flex flex-col gap-2 list-disc pl-6 text-charcoal leading-relaxed">
              {howIHelp.howItWorks.ongoing.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-charcoal leading-relaxed">
              {howIHelp.howItWorks.ongoing.closing}
            </p>
          </div>

          <div className="mt-8 text-center text-charcoal leading-relaxed">
            <p>{howIHelp.howItWorks.sessionLength}</p>
            <p className="mt-3 font-heading text-xl font-bold text-sage-dark">
              {howIHelp.howItWorks.fee}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
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
