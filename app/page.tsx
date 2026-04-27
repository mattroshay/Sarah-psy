import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/lib/routes'

// The proxy handles / → /[locale] for normal requests.
// This page is a fallback for any static-export or direct render of /.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`)
}
