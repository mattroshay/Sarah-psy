import Image from 'next/image'
import { cn } from '@/lib/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  heroImage?: { src: string; alt: string }
  className?: string
}

export function PageHeader({ title, subtitle, heroImage, className }: PageHeaderProps) {
  return (
    <section className={cn('bg-sage-light', className)}>
      {heroImage && (
        <div className="relative h-56 md:h-72 w-full">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-sage-dark/40" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-lg text-muted max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
