import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
        {dict.home.heroTagline}
      </h1>
      <p style={{ color: 'var(--color-muted)' }}>{dict.home.heroSubhead}</p>
      <p style={{ marginTop: '2rem', color: 'var(--color-sage)' }}>
        Foundation scaffold — pages coming in Phase 2.
      </p>
    </main>
  )
}
