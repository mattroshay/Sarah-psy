import 'server-only'
import type { Locale } from '../routes'
import type { Dictionary } from './types'

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('./en'),
  fr: () => import('./fr'),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await dictionaries[locale]()).default
}

export type { Dictionary } from './types'
