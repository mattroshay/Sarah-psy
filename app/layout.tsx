import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'),
  verification: {
    other: {
      'msvalidate.01': ['FD9E21D1FDE49EA0929FFF4C7BE21531'],
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'en'
  const gaId = process.env.NEXT_PUBLIC_GA4_ID
  return (
    <html lang={locale} className={jost.variable}>
      <body className="flex flex-col min-h-screen">
        {children}
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
