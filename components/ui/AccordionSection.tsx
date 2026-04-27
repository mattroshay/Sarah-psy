'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

interface AccordionSectionProps {
  id: string
  heading: string
  children: React.ReactNode
  openByDefault?: boolean
  className?: string
}

export function AccordionSection({
  id,
  heading,
  children,
  openByDefault = false,
  className,
}: AccordionSectionProps) {
  const [open, setOpen] = useState(openByDefault)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  // Auto-open when URL hash matches this section's id
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true)
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [id])

  return (
    <details
      ref={detailsRef}
      id={id}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className={cn('border border-border rounded-xl overflow-hidden', className)}
    >
      <summary
        className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none bg-warm hover:bg-sage-light transition-colors"
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        <h2 className="font-heading text-xl font-bold text-charcoal">{heading}</h2>
        <span
          aria-hidden="true"
          className={cn(
            'text-sage transition-transform duration-200',
            open && 'rotate-180'
          )}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 7.5l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div id={`${id}-content`} className="px-6 pb-6 pt-4">
        {children}
      </div>
    </details>
  )
}
