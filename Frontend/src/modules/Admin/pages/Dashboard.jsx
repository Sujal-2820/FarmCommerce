import { AlertTriangle, BarChart3, PieChart, Users } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { FilterBar } from '../components/FilterBar'
import { ProgressList } from '../components/ProgressList'
import { Timeline } from '../components/Timeline'
import { dashboardSummary, analyticsSummary } from '../services/adminData'

export function DashboardPage() {
  const { headline, payables } = dashboardSummary

  return (
    <div className="space-y-8">
      <FilterBar
        filters={[
          { id: 'period', label: 'Last 30 days', active: true },
          { id: 'region', label: 'All regions' },
          { id: 'channel', label: 'All channels' },
        ]}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {headline.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            trend={metric.trend}
            icon={metric.id === 'users' ? Users : metric.id === 'revenue' ? BarChart3 : PieChart}
            tone={metric.id === 'orders' ? 'warning' : metric.id === 'revenue' ? 'success' : 'default'}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm lg:col-span-2">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-surface-foreground">Payment Health</h2>
              <p className="text-sm text-muted-foreground">Monitor advance and pending payables at a glance.</p>
            </div>
            <StatusBadge tone="warning">Audit Window Open</StatusBadge>
          </header>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand/30 bg-brand-soft/70 p-4">
              <p className="text-xs uppercase tracking-wide text-brand">Advance (30%)</p>
              <p className="mt-2 text-xl font-semibold text-surface-foreground">{payables.advance}</p>
              <p className="text-xs text-brand/80">Collected this billing cycle</p>
            </div>
            <div className="rounded-2xl border border-accent/50 bg-accent/10 p-4">
              <p className="text-xs uppercase tracking-wide text-accent">Pending (70%)</p>
              <p className="mt-2 text-xl font-semibold text-surface-foreground">{payables.pending}</p>
              <p className="text-xs text-accent/80">Follow-up required before 18 Nov</p>
            </div>
            <div className="rounded-2xl border border-muted/60 bg-white/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Outstanding Credits</p>
              <p className="mt-2 text-xl font-semibold text-surface-foreground">{payables.outstanding}</p>
              <p className="text-xs text-muted-foreground">Across 14 vendors</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
            <AlertTriangle className="h-5 w-5 flex-none" />
            <p>
              6 vendors have crossed credit limit thresholds. Finance review scheduled at 5:00 PM with escalation playbook
              activated.
            </p>
          </div>
        </div>
        <ProgressList items={analyticsSummary.highlights.map((item) => ({ label: item.label, progress: 100, meta: `${item.value} (${item.change})`, tone: 'success' }))} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Timeline events={analyticsSummary.timeline} />
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">Operational Playbook</h3>
          <p className="text-sm text-muted-foreground">
            Quick access to critical workflows ensures the admin stays ahead of escalations and approvals.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Approve vendor applications',
                description: '14 vendors await verification. Review documents and set initial credit policy.',
              },
              {
                title: 'Master product refresh',
                description: 'Batch expiry alerts raised for Micro Nutrient Mix stock. Audit and update pricing.',
              },
              {
                title: 'Seller incentive plan',
                description: 'Monthly cashback and commission tiers need approval before distribution.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-muted/60 bg-surface p-4 transition hover:-translate-y-1 hover:shadow-card">
                <p className="text-sm font-semibold text-surface-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

