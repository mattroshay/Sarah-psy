'use client'

import { usePathname } from 'next/navigation'
import { getAlternatePath, LOCALE_COOKIE_NAME, type Locale } from '@/lib/routes'
import { cn } from '@/lib/cn'

interface LanguageToggleProps {
  currentLocale: Locale
  label: { en: string; fr: string }
  className?: string
}

const LOCALE_STORAGE_KEY = 'sarah-psy-locale'

export function LanguageToggle({ currentLocale, label, className }: LanguageToggleProps) {
  const pathname = usePathname()
  const alternatePath = getAlternatePath(currentLocale, pathname)
  const targetLocale: Locale = currentLocale === 'en' ? 'fr' : 'en'

  // Persist the chosen locale, then let the <a href> navigate natively.
  // We deliberately don't router.push() — rendering the inactive locale as a
  // real link (not a <button>) keeps the alternate-language page crawlable.
  const handleCookieAndStorage = () => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, targetLocale)
    } catch {
      // localStorage may be unavailable in some contexts
    }
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${LOCALE_COOKIE_NAME}=${targetLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
  }

  return (
    <div
      className={cn('flex items-center border border-border rounded-md overflow-hidden text-sm font-medium', className)}
      role="group"
      aria-label="Language"
    >
      {(['en', 'fr'] as const).map((loc) => {
        const isActive = loc === currentLocale
        if (isActive) {
          return (
            <span
              key={loc}
              className={cn('px-3 py-1.5 transition-colors', 'bg-sage text-white cursor-default')}
              aria-label={`Current language: ${label[loc]}`}
              aria-current="page"
            >
              {loc.toUpperCase()}
            </span>
          )
        }
        return (
          <a
            key={loc}
            href={alternatePath}
            onClick={handleCookieAndStorage}
            className={cn('px-3 py-1.5 transition-colors', 'text-muted hover:text-charcoal hover:bg-sage-light')}
            aria-label={`Switch to ${label[loc]}`}
          >
            {loc.toUpperCase()}
          </a>
        )
      })}
    </div>
  )
}
