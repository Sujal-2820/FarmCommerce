import { BarChart3, Building2, Factory, Home, Layers3, ShieldCheck, Users2, Wallet } from 'lucide-react'
import { cn } from '../../../lib/cn'

const links = [
  { id: 'dashboard', label: 'Overview', icon: Home, description: 'Health snapshot & alerts' },
  { id: 'products', label: 'Products', icon: Layers3, description: 'Master product catalogue' },
  { id: 'vendors', label: 'Vendors', icon: Factory, description: 'Credit & performance' },
  { id: 'sellers', label: 'Sellers', icon: ShieldCheck, description: 'Targets & commissions' },
  { id: 'users', label: 'Users', icon: Users2, description: 'Account health & tickets' },
  { id: 'orders', label: 'Orders', icon: Building2, description: 'Approvals & logistics' },
  { id: 'finance', label: 'Credits', icon: Wallet, description: 'Advance & outstanding dues' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Region & cohort trends' },
]

export function Sidebar({ active, onNavigate, condensed = false }) {
  return (
    <nav className="space-y-1.5 p-3">
      {links.map(({ id, label, icon: Icon, description }) => {
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className={cn(
              'w-full rounded-2xl border border-transparent px-3 py-2 text-left transition-all duration-200 hover:border-brand/40 hover:bg-brand-soft/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white',
              isActive && 'border-brand bg-brand-soft/80 shadow-card',
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-muted-foreground transition',
                  isActive && 'bg-brand text-brand-foreground shadow-card',
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className={cn('flex-1 overflow-hidden transition-all', condensed && 'hidden')}>
                <p className="text-sm font-semibold text-surface-foreground">{label}</p>
                <p className="truncate text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </nav>
  )
}

