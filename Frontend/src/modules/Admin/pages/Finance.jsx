import { BadgeIndianRupee, Sparkles } from 'lucide-react'
import { StatusBadge } from '../components/StatusBadge'
import { ProgressList } from '../components/ProgressList'
import { Timeline } from '../components/Timeline'
import { finance } from '../services/adminData'

export function FinancePage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 7 • Credit & Finance</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">Recoveries & Policy Control</h2>
          <p className="text-sm text-muted-foreground">
            Track credit utilisation, configure repayment guardrails, and deploy automatic penalty workflows.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
          <BadgeIndianRupee className="h-4 w-4" />
          Update Credit Settings
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">Global Parameters</h3>
          <p className="text-sm text-muted-foreground">
            Set default advances, minimum order values, and vendor purchase thresholds for the platform.
          </p>
          <div className="space-y-3">
            {finance.creditPolicies.map((policy) => (
              <div key={policy.id} className="rounded-2xl border border-muted/60 bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-surface-foreground">{policy.label}</p>
                  <StatusBadge tone="success">{policy.value}</StatusBadge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{policy.meta}</p>
              </div>
            ))}
          </div>
        </div>
        <ProgressList className="bg-white/80" items={finance.outstandingCredits} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand" />
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground">Automated Penalties</h3>
              <p className="text-sm text-muted-foreground">
                Penalties triggered by repayment delays are auto-applied with configurable grace periods.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                title: 'Grace Period',
                detail: '5 day grace period before penalty kicks in. Update for festive cycles if needed.',
              },
              {
                title: 'Penalty Computation',
                detail: 'Daily penalty applied post grace period. Compounded weekly with automated alerts.',
              },
              {
                title: 'Collections Workflow',
                detail: 'Escalate to finance after 14 days overdue. Trigger legal notices automatically.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-muted/60 bg-surface p-4 hover:-translate-y-1 hover:shadow-card">
                <p className="text-sm font-semibold text-surface-foreground">{item.title}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <Timeline
          events={[
            {
              id: 'finance-1',
              title: 'Outstanding Credits Review',
              timestamp: 'Today • 08:30',
              description: '₹1.92 Cr flagged for recovery. Weekly sync scheduled with collections team.',
              status: 'completed',
            },
            {
              id: 'finance-2',
              title: 'Penalty Applied',
              timestamp: 'Today • 10:45',
              description: 'Penalty of ₹82,300 applied to 4 vendors exceeding grace period.',
              status: 'completed',
            },
            {
              id: 'finance-3',
              title: 'Recovery Follow-up',
              timestamp: 'Today • 14:00',
              description: 'Auto reminders scheduled. Finance to confirm repayment plans.',
              status: 'pending',
            },
          ]}
          className="bg-white/80"
        />
      </section>
    </div>
  )
}

