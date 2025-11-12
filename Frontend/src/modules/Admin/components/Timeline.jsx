import { cn } from '../../../lib/cn'

export function Timeline({ events = [], className }) {
  return (
    <div className={cn('rounded-3xl border border-muted/60 bg-white/80 p-5 shadow-sm', className)}>
      <ol className="relative space-y-6 before:absolute before:left-[1.1rem] before:top-0 before:h-full before:w-0.5 before:bg-muted/70">
        {events.map(({ id, title, timestamp, description, status }) => (
          <li key={id} className="relative pl-10">
            <span
              className={cn(
                'absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-muted/60 bg-surface text-xs font-semibold',
                status === 'completed' && 'border-brand bg-brand-soft text-brand',
                status === 'pending' && 'border-accent bg-accent/20 text-accent',
              )}
            >
              {status === 'completed' ? '✓' : status === 'pending' ? '•' : '○'}
            </span>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-surface-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

