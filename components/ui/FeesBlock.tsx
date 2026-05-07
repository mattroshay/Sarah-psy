import { cn } from '@/lib/cn'

interface FeesBlockProps {
  heading: string
  sessionLength: string
  feeLine: string
  packagesLead: string
  packages: string[]
  variant?: 'inline' | 'card'
}

export function FeesBlock({
  heading,
  sessionLength,
  feeLine,
  packagesLead,
  packages,
  variant = 'card',
}: FeesBlockProps) {
  return (
    <div
      className={cn(
        'text-charcoal leading-relaxed',
        variant === 'card' && 'bg-white rounded-2xl p-6 border border-border'
      )}
    >
      <h3 className="font-heading text-xl font-bold text-sage-dark mb-3">{heading}</h3>
      <p>{sessionLength}</p>
      <p className="mt-3 font-medium">{feeLine}</p>
      <p className="mt-3">{packagesLead}</p>
      <ul className="mt-2 flex flex-col gap-1.5 list-disc pl-6">
        {packages.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}
