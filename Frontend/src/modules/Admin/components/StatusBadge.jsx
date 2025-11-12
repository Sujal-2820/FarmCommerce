import { cn } from '../../../lib/cn'

const tones = {
  success: 'bg-brand-soft text-brand border-brand/30',
  warning: 'bg-accent/20 text-accent border-accent/40',
  neutral: 'bg-muted text-muted-foreground border-muted/80',
}

export function StatusBadge({ tone = 'neutral', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

