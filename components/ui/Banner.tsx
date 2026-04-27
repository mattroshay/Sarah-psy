import { cn } from '@/lib/cn'
import { Button } from './Button'

interface BannerProps {
  heading: string
  body?: string
  buttonLabel: string
  buttonHref: string
  variant?: 'sage' | 'terra' | 'warm'
  className?: string
}

export function Banner({
  heading,
  body,
  buttonLabel,
  buttonHref,
  variant = 'sage',
  className,
}: BannerProps) {
  const bg: Record<string, string> = {
    sage: 'bg-sage text-white',
    terra: 'bg-terra text-white',
    warm: 'bg-warm text-charcoal',
  }

  return (
    <section
      className={cn(
        'rounded-2xl px-8 py-12 text-center',
        bg[variant],
        className
      )}
    >
      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
        {heading}
      </h2>
      {body && (
        <p className="max-w-xl mx-auto mb-6 text-base leading-relaxed opacity-90">
          {body}
        </p>
      )}
      <Button
        href={buttonHref}
        variant={variant === 'warm' ? 'primary' : 'outline'}
        size="lg"
      >
        {buttonLabel}
      </Button>
    </section>
  )
}
