import Image, { type ImageProps } from 'next/image'
import { cn } from '@/lib/cn'

interface TintedImageProps extends ImageProps {
  /** Tint opacity 0–100. Default 18. */
  tintOpacity?: number
  /** Wrap with rounded-2xl + overflow-hidden. Default false. */
  rounded?: boolean
  /** Class applied to the outer wrapper. */
  wrapperClassName?: string
}

/**
 * Next/Image with a sage tint overlay applied via mix-blend-multiply.
 * Used to unify disparate stock-photo palettes into a single brand-cohesive family.
 */
export function TintedImage({
  tintOpacity = 18,
  rounded = false,
  wrapperClassName,
  className,
  ...props
}: TintedImageProps) {
  if (process.env.NODE_ENV !== 'production' && (tintOpacity < 0 || tintOpacity > 100)) {
    console.warn(`TintedImage: tintOpacity must be between 0 and 100, got ${tintOpacity}. Clamping.`)
  }
  const clampedOpacity = Math.max(0, Math.min(100, tintOpacity))

  return (
    <div
      className={cn(
        'relative w-full h-full',
        rounded && 'rounded-2xl overflow-hidden',
        wrapperClassName
      )}
    >
      <Image {...props} className={cn('object-cover', className)} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-sage mix-blend-multiply pointer-events-none"
        style={{ opacity: clampedOpacity / 100 }}
      />
    </div>
  )
}
