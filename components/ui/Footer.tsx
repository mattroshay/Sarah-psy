import Image from 'next/image'
import type { NavDict } from '@/lib/i18n/types'
import type { Locale } from '@/lib/routes'
import { getPublicSlug } from '@/lib/routes'
import { CopyrightYear } from './CopyrightYear'

interface FooterProps {
  locale: Locale
  nav: NavDict
  contactEmail?: string
  contactPhone?: string
}

export function Footer({ locale, nav, contactEmail, contactPhone }: FooterProps) {
  const links = [
    { label: nav.about, href: `/${locale}/${getPublicSlug(locale, 'about')}` },
    { label: nav.howIHelp, href: `/${locale}/${getPublicSlug(locale, 'how-i-help')}` },
    { label: nav.mySpecialties, href: `/${locale}/${getPublicSlug(locale, 'my-specialties')}` },
    { label: nav.faq, href: `/${locale}/faq` },
    { label: nav.blog, href: `/${locale}/blog` },
    { label: nav.contact, href: `/${locale}/contact` },
  ]

  const hasContact = Boolean(contactEmail || contactPhone)

  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center gap-10 text-center">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4">
          <a href={`/${locale}`} aria-label="Home">
            <Image
              src="/logo-white.svg"
              alt="Sarah Cousin Roshay"
              width={140}
              height={40}
              className="h-9 w-auto"
            />
          </a>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Bilingual CBT therapist online — English & French.
          </p>
        </div>

        {/* Nav links — 2 cols on mobile, single row on sm+ */}
        <nav aria-label="Footer navigation">
          <ul
            className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-x-6 gap-y-3"
            role="list"
          >
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        {hasContact && (
          <div className="flex flex-col items-center gap-3 text-sm text-white/70">
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="hover:text-white transition-colors"
              >
                {contactEmail}
              </a>
            )}
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="hover:text-white transition-colors"
              >
                {contactPhone}
              </a>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-4 sm:px-6 py-4 text-xs text-white/40 flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center text-center">
        <span>© <CopyrightYear /> Sarah Cousin Roshay. All rights reserved.</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>SIRET: 97745187100023</span>
      </div>
    </footer>
  )
}
