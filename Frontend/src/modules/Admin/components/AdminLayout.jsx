import { useState } from 'react'
import { LayoutDashboard, LogOut, Menu, SunMedium } from 'lucide-react'
import { cn } from '../../../lib/cn'

export function AdminLayout({ sidebar, children, onExit }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        className={cn(
          'transition-all duration-300 ease-in-out',
          open ? 'w-64' : 'w-[4.5rem]',
          'hidden border-r border-muted/60 bg-white/70 shadow-card backdrop-blur lg:block',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-muted/60 px-4">
          <div className={cn('flex items-center gap-3 overflow-hidden transition-all', open ? 'opacity-100' : 'opacity-0')}>
            <span className="badge-brand text-xs uppercase tracking-wide">Admin</span>
            <div>
              <p className="text-sm font-semibold text-surface-foreground">AgroCart HQ</p>
              <p className="text-xs text-muted-foreground">Super Administrator</p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-muted/60 text-muted-foreground transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">{sidebar({ condensed: !open })}</div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-muted/60 bg-white/80 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted/60 text-muted-foreground transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:hidden"
                onClick={() => setOpen((prev) => !prev)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin Control Center</p>
                <h1 className="text-xl font-semibold text-surface-foreground">AgroCart Super Admin</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {onExit ? (
                <button
                  type="button"
                  className="hidden items-center gap-2 rounded-full border border-muted/60 bg-white/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:inline-flex"
                  onClick={onExit}
                >
                  <LogOut className="h-4 w-4" />
                  Exit Admin
                </button>
              ) : null}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted/60 text-muted-foreground transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Switch theme"
              >
                <SunMedium className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="group flex items-center gap-3 rounded-full border border-muted/60 bg-white/70 px-4 py-2 transition hover:border-brand hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <div className="hidden text-left text-sm leading-tight text-muted-foreground sm:block">
                  <p className="font-semibold text-surface-foreground">Diya Verma</p>
                  <p>Super Admin</p>
                </div>
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-surface">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

