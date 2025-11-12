import { ChevronDown } from 'lucide-react'
import { cn } from '../../../lib/cn'

export function FilterBar({ filters = [], onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-muted/60 bg-white/70 px-4 py-3 shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onChange?.(filter)}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-transparent bg-surface px-4 py-2 text-sm text-muted-foreground transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            filter.active && 'border-brand bg-brand-soft/80 text-brand shadow-card',
          )}
        >
          <span>{filter.label}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}

