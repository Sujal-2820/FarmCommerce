import { cn } from '../../../lib/cn'

export function MetricCard({ title, value, subtitle, trend, icon: Icon, tone = 'default', className }) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-muted/60 bg-white/80 p-5 transition-shadow hover:shadow-card',
        className,
      )}
    >
      <div
        className={cn(
          'absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-soft opacity-0 transition duration-300 group-hover:opacity-40',
          tone === 'warning' && 'bg-accent/50 group-hover:opacity-30',
          tone === 'success' && 'bg-brand/40 group-hover:opacity-20',
        )}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-surface-foreground">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft/70 text-brand shadow-inner">
            <Icon className="h-6 w-6" />
          </span>
        ) : null}
      </div>
      {trend ? (
        <div className="relative mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-1 font-medium',
              trend.direction === 'up' && 'bg-brand-soft text-brand',
              trend.direction === 'down' && 'bg-accent/20 text-accent',
            )}
          >
            {trend.direction === 'up' ? '▲' : '▼'} {trend.value}
          </span>
          <span>{trend.message}</span>
        </div>
      ) : null}
    </article>
  )
}

