'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

export interface CarouselItem {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  learnMoreLabel: string
  learnMoreHref: string
  accentColor?: 'sage' | 'terra' | 'gold'
}

interface CarouselProps {
  items: CarouselItem[]
  className?: string
}

const accents: Record<string, { border: string; bg: string; text: string }> = {
  sage: { border: 'border-sage', bg: 'bg-sage-light', text: 'text-sage-dark' },
  terra: { border: 'border-terra', bg: 'bg-terra-light', text: 'text-terra' },
  gold: { border: 'border-gold', bg: 'bg-[#FBF7E4]', text: 'text-gold' },
}

export function Carousel({ items, className }: CarouselProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className={cn('grid sm:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {items.map((item) => {
        const expanded = activeId === item.id
        const accent = accents[item.accentColor ?? 'sage']

        return (
          <div
            key={item.id}
            className={cn(
              'border rounded-xl p-6 flex flex-col gap-4 transition-all cursor-pointer',
              expanded
                ? `${accent.border} ${accent.bg} shadow-md`
                : 'border-border bg-warm hover:shadow-sm'
            )}
            onClick={() => setActiveId(expanded ? null : item.id)}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveId(expanded ? null : item.id)
              }
            }}
          >
            <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', accent.bg)}>
              <span className={accent.text}>{item.icon}</span>
            </div>
            <h3 className={cn('font-heading text-lg font-bold', accent.text)}>
              {item.title}
            </h3>
            <p className="text-sm text-charcoal leading-relaxed">{item.description}</p>

            {expanded && (
              <a
                href={item.learnMoreHref}
                className={cn('text-sm font-medium transition-colors mt-1', accent.text, 'hover:underline')}
                onClick={(e) => e.stopPropagation()}
              >
                {item.learnMoreLabel} →
              </a>
            )}

            <span
              aria-hidden="true"
              className={cn('text-xs font-medium transition-colors mt-auto', accent.text)}
            >
              {expanded ? '▲' : '▼'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
