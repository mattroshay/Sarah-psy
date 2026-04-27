'use client'

import { usePathname, useRouter } from 'next/navigation'
import { getAlternatePath, type Locale } from '@/lib/routes'
import { cn } from '@/lib/cn'

interface LanguageToggleProps {
  currentLocale: Locale
  label: { en: string; fr: string }
  className?: string
}

const LOCALE_STORAGE_KEY = 'sarah-psy-locale'

export function LanguageToggle({ currentLocale, label, className }: LanguageToggleProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSwitch = () => {
    const alternatePath = getAlternatePath(currentLocale, pathname)
    const targetLocale: Locale = currentLocale === 'en' ? 'fr' : 'en'
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, targetLocale)
    } catch {
      // localStorage may be unavailable in some contexts
    }
    router.push(alternatePath)
  }

  const targetLocale: Locale = currentLocale === 'en' ? 'fr' : 'en'

  return (
    <div
      className={cn('flex items-center border border-border rounded-md overflow-hidden text-sm font-medium', className)}
      role="group"
      aria-label="Language"
    >
      {(['en', 'fr'] as const).map((loc) => {
        const isActive = loc === currentLocale
        return (
          <button
            key={loc}
            onClick={isActive ? undefined : handleSwitch}
            disabled={isActive}
            className={cn(
              'px-3 py-1.5 transition-colors',
              isActive
                ? 'bg-sage text-white cursor-default'
                : 'text-muted hover:text-charcoal hover:bg-sage-light'
            )}
            aria-label={isActive ? `Current language: ${label[loc]}` : `Switch to ${label[loc]}`}
            aria-pressed={isActive}
          >
            {loc.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
