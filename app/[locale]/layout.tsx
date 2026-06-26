import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { LOCALES, type Locale, getAlternatePath } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { jsonLdString } from '@/lib/jsonLd'
import { Navigation } from '@/components/ui/Navigation'
import { Footer } from '@/components/ui/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'
const HEADSHOT_URL = `${SITE_URL}/images/sarah-headshot.jpg`

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) return {}

  const currentPath = `/${locale}`
  const alternatePath = getAlternatePath(locale as Locale, currentPath)

  return {
    alternates: {
      canonical: `${SITE_URL}${currentPath}`,
      languages: {
        en: `${SITE_URL}${locale === 'en' ? currentPath : alternatePath}`,
        fr: `${SITE_URL}${locale === 'fr' ? currentPath : alternatePath}`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'Sarah Cousin Roshay',
      url: SITE_URL,
      image: HEADSHOT_URL,
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
      areaServed: ['FR', 'GB', 'US', 'BE', 'CH'],
      knowsLanguage: ['en', 'fr'],
      serviceType: 'Cognitive Behavioral Therapy',
      openingHours: ['Mo 09:00-16:00', 'Tu 09:00-16:00', 'Th 09:00-16:00', 'Fr 09:00-16:00'],
      currenciesAccepted: 'EUR',
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Individual Session',
          price: '60',
          priceCurrency: 'EUR',
          description: '60-minute individual CBT therapy session',
        },
        {
          '@type': 'Offer',
          name: '4-Session Package',
          price: '220',
          priceCurrency: 'EUR',
          description: 'Package of 4 CBT therapy sessions',
        },
        {
          '@type': 'Offer',
          name: '8-Session Package',
          price: '420',
          priceCurrency: 'EUR',
          description: 'Package of 8 CBT therapy sessions',
        },
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Sarah Cousin Roshay',
      url: SITE_URL,
    },
    {
      '@type': 'Person',
      name: 'Sarah Cousin Roshay',
      jobTitle: 'CBT Therapist',
      url: SITE_URL,
      image: HEADSHOT_URL,
      knowsLanguage: ['en', 'fr'],
    },
  ],
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
        precedence="default"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <Navigation
        locale={locale as Locale}
        nav={dict.nav}
      />
      <main className="flex-1">{children}</main>
      <Footer
        locale={locale as Locale}
        nav={dict.nav}
        contactEmail={process.env.NEXT_PUBLIC_CONTACT_EMAIL}
        contactPhone={process.env.NEXT_PUBLIC_CONTACT_PHONE}
      />
    </>
  )
}
