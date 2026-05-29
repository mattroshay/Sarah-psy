import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { LOCALES, type Locale, getAlternatePath } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { jsonLdString } from '@/lib/jsonLd'
import { Navigation } from '@/components/ui/Navigation'
import { Footer } from '@/components/ui/Footer'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'
  const currentPath = `/${locale}`
  const alternatePath = getAlternatePath(locale as Locale, currentPath)

  return {
    alternates: {
      canonical: `${siteUrl}${currentPath}`,
      languages: {
        en: `${siteUrl}${locale === 'en' ? currentPath : alternatePath}`,
        fr: `${siteUrl}${locale === 'fr' ? currentPath : alternatePath}`,
        'x-default': `${siteUrl}/en`,
      },
    },
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'
const headshotUrl = `${siteUrl}/images/sarah-headshot.jpg`

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: 'Sarah Cousin Roshay',
      url: siteUrl,
      image: headshotUrl,
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
      areaServed: ['FR', 'GB', 'US', 'BE', 'CH'],
      knowsLanguage: ['en', 'fr'],
      serviceType: 'Cognitive Behavioral Therapy',
    },
    {
      '@type': 'WebSite',
      name: 'Sarah Cousin Roshay',
      url: siteUrl,
    },
    {
      '@type': 'Person',
      name: 'Sarah Cousin Roshay',
      jobTitle: 'CBT Therapist',
      url: siteUrl,
      image: headshotUrl,
      knowsLanguage: ['en', 'fr'],
      sameAs: [],
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
