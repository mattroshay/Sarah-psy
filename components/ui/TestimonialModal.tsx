'use client'

import { useRef, type MouseEvent } from 'react'
import { cn } from '@/lib/cn'

interface TestimonialModalProps {
  fullQuote: string
  attribution: string
  triggerLabel: string
  closeLabel: string
  className?: string
}

export function TestimonialModal({
  fullQuote,
  attribution,
  triggerLabel,
  closeLabel,
  className,
}: TestimonialModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  // The native <dialog> gives us focus-trapping, Esc-to-close and an inert
  // background for free. We add backdrop-click-to-close: a click whose target
  // is the dialog element itself (i.e. the ::backdrop area, not the inner
  // panel) dismisses it.
  const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close()
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={cn(
          'text-xs font-medium text-sage hover:text-sage-dark underline underline-offset-2 self-start',
          className
        )}
      >
        {triggerLabel} →
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleClick}
        aria-label={`${triggerLabel} — ${attribution}`}
        className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-xl border border-border bg-white p-0 shadow-xl backdrop:bg-charcoal/50 backdrop:backdrop-blur-sm"
      >
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-sage-light shrink-0"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 16v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
            </svg>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-warm hover:text-charcoal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <figure className="m-0">
            <blockquote className="mt-4 text-charcoal leading-relaxed italic">
              {fullQuote}
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted font-medium not-italic">
              {attribution}
            </figcaption>
          </figure>
        </div>
      </dialog>
    </>
  )
}
