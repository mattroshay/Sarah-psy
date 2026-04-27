import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale, getAlternatePath } from '@/lib/routes'

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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  return <>{children}</>
}
