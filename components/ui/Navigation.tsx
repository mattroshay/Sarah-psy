'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { NavDict } from '@/lib/i18n/types'
import type { Locale } from '@/lib/routes'
import { getPublicSlug } from '@/lib/routes'
import { LanguageToggle } from './LanguageToggle'
import { Button } from './Button'
import { cn } from '@/lib/cn'

interface NavigationProps {
  locale: Locale
  nav: NavDict
  calendlyUrl?: string
}

export function Navigation({ locale, nav, calendlyUrl }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { key: 'about', label: nav.about, segment: getPublicSlug(locale, 'about') },
    { key: 'how-i-help', label: nav.howIHelp, segment: getPublicSlug(locale, 'how-i-help') },
    { key: 'faq', label: nav.faq, segment: 'faq' },
    { key: 'blog', label: nav.blog, segment: 'blog' },
    { key: 'contact', label: nav.contact, segment: 'contact' },
  ]

  const isActive = (segment: string) =>
    pathname.includes(`/${segment}`)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href={`/${locale}`} className="shrink-0" aria-label={nav.home}>
          <Image
            src="/logo.svg"
            alt="Sarah Cousin Roshay"
            width={140}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map(({ key, label, segment }) => (
            <li key={key}>
              <a
                href={`/${locale}/${segment}`}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(segment)
                    ? 'text-sage bg-sage-light'
                    : 'text-charcoal hover:text-sage hover:bg-sage-light'
                )}
                aria-current={isActive(segment) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: language toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle
            currentLocale={locale}
            label={{ en: 'English', fr: 'Français' }}
          />
          <Button
            href={calendlyUrl ?? '#contact'}
            variant="primary"
            size="sm"
          >
            {nav.bookCall}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-charcoal hover:text-sage"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-3" role="list">
            {links.map(({ key, label, segment }) => (
              <li key={key}>
                <a
                  href={`/${locale}/${segment}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-md text-sm font-medium transition-colors',
                    isActive(segment)
                      ? 'text-sage bg-sage-light'
                      : 'text-charcoal hover:text-sage hover:bg-sage-light'
                  )}
                  aria-current={isActive(segment) ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-4 border-t border-border mt-3">
            <LanguageToggle
              currentLocale={locale}
              label={{ en: 'English', fr: 'Français' }}
            />
            <Button
              href={calendlyUrl ?? '#contact'}
              variant="primary"
              size="sm"
              onClick={() => setMenuOpen(false)}
            >
              {nav.bookCall}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
