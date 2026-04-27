import Image from 'next/image'
import type { NavDict } from '@/lib/i18n/types'
import type { Locale } from '@/lib/routes'
import { getPublicSlug } from '@/lib/routes'

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
    { label: nav.faq, href: `/${locale}/faq` },
    { label: nav.blog, href: `/${locale}/blog` },
    { label: nav.contact, href: `/${locale}/contact` },
  ]

  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <a href={`/${locale}`}>
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

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-2" role="list">
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
        <div className="flex flex-col gap-3 text-sm text-white/70">
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
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-white/40">
        © {new Date().getFullYear()} Sarah Cousin Roshay. All rights reserved.
      </div>
    </footer>
  )
}
