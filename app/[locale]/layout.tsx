import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale, getAlternatePath } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sarah Cousin Roshay',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com',
  image: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'}/images/sarah-headshot.jpg`,
  telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  areaServed: ['FR', 'GB', 'US', 'BE', 'CH'],
  knowsLanguage: ['en', 'fr'],
  serviceType: 'Cognitive Behavioral Therapy',
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation
        locale={locale as Locale}
        nav={dict.nav}
        calendlyUrl={calendlyUrl}
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
