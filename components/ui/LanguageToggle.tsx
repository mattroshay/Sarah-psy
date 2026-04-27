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
    <button
      onClick={handleSwitch}
      className={cn(
        'text-sm font-medium text-charcoal hover:text-sage transition-colors px-3 py-1.5 rounded-md hover:bg-sage-light',
        className
      )}
      aria-label={`Switch to ${targetLocale === 'en' ? label.en : label.fr}`}
    >
      {targetLocale === 'en' ? 'EN' : 'FR'}
    </button>
  )
}
