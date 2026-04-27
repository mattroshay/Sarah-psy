import Image from 'next/image'
import { cn } from '@/lib/cn'

interface AlternatingSectionProps {
  heading: string
  body: string
  imageSrc: string
  imageAlt: string
  imageLeft?: boolean
  action?: React.ReactNode
  className?: string
}

export function AlternatingSection({
  heading,
  body,
  imageSrc,
  imageAlt,
  imageLeft = false,
  action,
  className,
}: AlternatingSectionProps) {
  return (
    <section
      className={cn(
        'max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center',
        className
      )}
    >
      <div className={cn('relative h-72 md:h-96 rounded-2xl overflow-hidden', imageLeft ? 'order-first' : 'md:order-last')}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className={cn('flex flex-col gap-5', imageLeft ? 'md:order-last' : 'order-first')}>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{heading}</h2>
        <p className="text-charcoal leading-relaxed">{body}</p>
        {action}
      </div>
    </section>
  )
}
