import { cn } from '../../../lib/cn'

export function ProgressList({ items = [], className }) {
  return (
    <ul className={cn('space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-5 shadow-sm', className)}>
      {items.map(({ label, progress, tone = 'default', meta }) => (
        <li key={label} className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium text-surface-foreground">
            <span>{label}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                'h-full rounded-full',
                tone === 'success' ? 'bg-brand' : tone === 'warning' ? 'bg-accent' : 'bg-brand/70',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          {meta ? <p className="text-xs text-muted-foreground">{meta}</p> : null}
        </li>
      ))}
    </ul>
  )
}

