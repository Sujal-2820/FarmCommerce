import { ArrowUpRight, BarChart3, Download, PieChart } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { FilterBar } from '../components/FilterBar'
import { Timeline } from '../components/Timeline'
import { analyticsSummary } from '../services/adminData'

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 8 • Reporting & Analytics</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">Insights & Export Hub</h2>
          <p className="text-sm text-muted-foreground">
            Slice daily, weekly, and monthly performance metrics with export-ready reports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-surface px-4 py-2 text-sm text-muted-foreground transition hover:border-brand hover:text-brand">
            <PieChart className="h-4 w-4" />
            Custom Cohort
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
            <Download className="h-4 w-4" />
            Export Excel / PDF
          </button>
        </div>
      </header>

      <FilterBar
        filters={[
          { id: 'period', label: analyticsSummary.period, active: true },
          { id: 'region', label: 'All regions' },
          { id: 'vendor', label: 'Top vendors' },
          { id: 'seller', label: 'Top sellers' },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-3">
        {analyticsSummary.highlights.map((item) => (
          <div key={item.label} className="rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-surface-foreground">{item.value}</p>
                <StatusBadge tone="success" className="mt-3">{item.change}</StatusBadge>
              </div>
              <ArrowUpRight className="h-5 w-5 text-brand" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Quick snapshot across the last 30 days with contextual insights layered for the admin.
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Timeline events={analyticsSummary.timeline} />
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-brand" />
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground">Region-wise Performance</h3>
              <p className="text-sm text-muted-foreground">Heatmap of growth rates across key regions and channels.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { region: 'Gujarat', revenue: '₹2.1 Cr', change: '+14%' },
              { region: 'Maharashtra', revenue: '₹1.6 Cr', change: '+9%' },
              { region: 'Rajasthan', revenue: '₹1.1 Cr', change: '+6%' },
              { region: 'Punjab', revenue: '₹92 L', change: '+4%' },
            ].map((item) => (
              <div key={item.region} className="rounded-2xl border border-muted/60 bg-surface p-4 hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between text-sm font-semibold text-surface-foreground">
                  <span>{item.region}</span>
                  <span>{item.change}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Revenue contribution {item.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

