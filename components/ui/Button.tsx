import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children?: React.ReactNode
}

type ButtonProps = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>
type AnchorProps = BaseProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'>

type Props = ButtonProps | AnchorProps

const base =
  'inline-flex items-center justify-center rounded-full font-body font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary:
    'bg-sage text-white hover:bg-sage-dark focus-visible:outline-sage',
  secondary:
    'bg-terra text-white hover:bg-[#a85f40] focus-visible:outline-terra',
  outline:
    'border border-sage text-sage bg-transparent hover:bg-sage-light focus-visible:outline-sage',
  white:
    'bg-white text-sage hover:bg-sage-light focus-visible:outline-white',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    return <a href={href} className={classes} {...anchorRest}>{children}</a>
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
