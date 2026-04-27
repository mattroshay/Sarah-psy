import { cn } from '@/lib/cn'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
  className?: string
}

export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'border-l-4 border-sage pl-6 my-8 text-xl font-heading text-charcoal italic leading-relaxed',
        className
      )}
    >
      <p>{children}</p>
      {attribution && (
        <footer className="mt-3 text-sm font-body not-italic text-muted">
          — {attribution}
        </footer>
      )}
    </blockquote>
  )
}
