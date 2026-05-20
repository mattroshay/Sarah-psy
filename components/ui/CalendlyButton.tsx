'use client'

import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { Button } from './Button'

declare global {
  interface Window {
    Calendly?: { initPopupWidget?: (opts: { url: string }) => void }
  }
}

type ButtonProps = ComponentProps<typeof Button>

interface CalendlyButtonProps {
  href: string
  children: ReactNode
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

function isCalendlyUrl(href: string): boolean {
  try {
    const { hostname } = new URL(href)
    return hostname === 'calendly.com' || hostname.endsWith('.calendly.com')
  } catch {
    return false
  }
}

export function CalendlyButton({
  href,
  children,
  onClick,
  ...rest
}: CalendlyButtonProps) {
  const isCalendly = isCalendlyUrl(href)

  if (!isCalendly) {
    return (
      <Button href={href} onClick={onClick} {...rest}>
        {children}
      </Button>
    )
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    if (typeof window === 'undefined') return
    if (typeof window.Calendly?.initPopupWidget !== 'function') return
    e.preventDefault()
    window.Calendly.initPopupWidget({ url: href })
  }

  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  )
}
