'use client'

import type { AnchorHTMLAttributes, ComponentProps, MouseEvent, ReactNode } from 'react'
import { Button } from './Button'

declare global {
  interface Window {
    Calendly?: { initPopupWidget?: (opts: { url: string }) => void }
  }
}

type CalendlyButtonProps = Pick<ComponentProps<typeof Button>, 'variant' | 'size'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'target' | 'rel'> & {
    href: string
    children: ReactNode
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
    // Let the browser handle middle-click, Cmd/Ctrl+Click, Shift/Alt+Click —
    // users with those modifiers want to open the link in a new tab/window.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
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
