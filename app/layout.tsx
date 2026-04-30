import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Jost } from 'next/font/google'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarah-psy.com'),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = headersList.get('x-locale') ?? 'en'

  return (
    <html lang={locale} className={jost.variable}>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  )
}
