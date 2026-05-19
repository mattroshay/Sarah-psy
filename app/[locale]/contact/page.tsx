import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/routes'
import { getDictionary } from '@/lib/i18n'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/sections/PageHeader'
import { ContactPage } from '@/components/sections/ContactPage'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) return {}

  return buildMetadata(locale as Locale, 'contact', {
    title: 'Contact | Book a Free Discovery Call | Sarah Cousin Roshay',
    description:
      'Book a free 20-minute discovery call or send a message. Online CBT therapy in English & French — flexible across European and US time zones.',
  }, {
    title: 'Contact | Réserver un appel découverte | Sarah Cousin Roshay',
    description:
      'Réservez un appel découverte gratuit de 20 minutes ou envoyez un message. Thérapie TCC en ligne en français et anglais.',
  })
}

export default async function ContactPageRoute({ params }: Props) {
  const { locale } = await params
  if (!LOCALES.includes(locale as Locale)) notFound()

  const dict = await getDictionary(locale as Locale)
  const { contact, forms } = dict

  return (
    <>
      <PageHeader title={contact.pageTitle} subtitle={contact.pageSubtitle} />
      <ContactPage
        contact={contact}
        forms={forms}
        formspreeEndpoint={process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT}
        calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL}
      />
    </>
  )
}
