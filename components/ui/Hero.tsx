import Image from 'next/image'
import { Button } from './Button'
import { cn } from '@/lib/cn'

interface HeroProps {
  tagline: string
  subhead: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function Hero({
  tagline,
  subhead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  imageSrc,
  imageAlt,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center',
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
          {tagline}
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-lg">{subhead}</p>
        <div className="flex flex-wrap gap-4">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline" size="lg">
            {secondaryLabel}
          </Button>
        </div>
      </div>

      {imageSrc && (
        <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
    </section>
  )
}
