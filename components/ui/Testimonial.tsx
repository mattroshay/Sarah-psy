import { cn } from '@/lib/cn'
import { TestimonialModal } from './TestimonialModal'

interface TestimonialProps {
  quote: string
  fullQuote: string
  attribution: string
  readMoreLabel: string
  closeLabel: string
  googleUrl?: string
  googleLabel?: string
  className?: string
}

export function Testimonial({
  quote,
  fullQuote,
  attribution,
  readMoreLabel,
  closeLabel,
  googleUrl,
  googleLabel,
  className,
}: TestimonialProps) {
  return (
    <figure
      className={cn(
        'bg-white border border-border rounded-xl p-6 flex flex-col gap-4',
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-sage-light shrink-0"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm14 0c-4.4 0-8 3.6-8 16v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
      </svg>
      <blockquote className="flex-1 text-charcoal leading-relaxed italic">
        {quote}
      </blockquote>
      <figcaption className="text-sm text-muted font-medium not-italic">
        {attribution}
      </figcaption>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <TestimonialModal
          fullQuote={fullQuote}
          attribution={attribution}
          triggerLabel={readMoreLabel}
          closeLabel={closeLabel}
        />
        {googleUrl && googleLabel && (
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${googleLabel} — ${attribution}`}
            className="text-xs font-medium text-muted hover:text-charcoal underline underline-offset-2"
          >
            {googleLabel} →
          </a>
        )}
      </div>
    </figure>
  )
}
