import { Building2, CreditCard, MapPin, ShieldAlert } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { Timeline } from '../components/Timeline'
import { vendors } from '../services/adminData'

const columns = [
  { Header: 'Vendor', accessor: 'name' },
  { Header: 'Region', accessor: 'region' },
  { Header: 'Credit Limit', accessor: 'creditLimit' },
  { Header: 'Repayment', accessor: 'repayment' },
  { Header: 'Penalty Rate', accessor: 'penalty' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Outstanding Dues', accessor: 'dues' },
]

export function VendorsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 3 • Vendor Management</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">Credit Performance Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Control approvals, credit policies, and vendor risk in real time with proactive alerts.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
          <Building2 className="h-4 w-4" />
          Approve Vendors
        </button>
      </header>

      <DataTable
        columns={columns.map((column) => ({
          ...column,
          Cell:
            column.accessor === 'status'
              ? (row) => (
                  <StatusBadge tone={row.status === 'On Track' ? 'success' : row.status === 'Delayed' ? 'warning' : 'neutral'}>
                    {row.status}
                  </StatusBadge>
                )
              : column.accessor === 'region'
              ? (row) => (
                  <span className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-surface px-3 py-1 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {row.region}
                  </span>
                )
              : undefined,
        }))}
        rows={vendors}
        emptyState="No vendor records found"
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">Credit Policy Playbook</h3>
          <p className="text-sm text-muted-foreground">
            Configure region-wise credit strategies, repayment cycles, and penalty protocols.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Credit Limit Review',
                description:
                  'Identify vendors nearing 80% credit utilization. Initiate auto alerts and escalate to finance for manual override.',
                meta: 'Updated daily at 09:00',
              },
              {
                title: 'Repayment Monitoring',
                description:
                  'Flag repayments that exceed threshold by >7 days. Auto-calculate penalties and generate repayment reminders.',
                meta: 'SLA: 24h resolution',
              },
              {
                title: 'Purchase Approval (≥₹50,000)',
                description:
                  'Streamline manual approvals with supporting documents. Auto populate vendor performance insights before approval.',
                meta: 'Pending approvals: 5',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-muted/60 bg-surface p-4 transition hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between text-sm font-semibold text-surface-foreground">
                  <span>{item.title}</span>
                  <CreditCard className="h-4 w-4 text-brand" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                <p className="mt-3 text-xs font-semibold text-brand">{item.meta}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-accent/40 bg-accent/10 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-accent" />
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground">High Risk Alerts</h3>
              <p className="text-sm text-accent">
                Automatic penalty application and collections follow-up. Review overdue repayments immediately.
              </p>
            </div>
          </div>
          <Timeline
            events={[
              {
                id: 'risk-1',
                title: 'HarvestLink Pvt Ltd',
                timestamp: 'Due in 2 days',
                description: '₹19.6 L pending. Escalated to finance with penalty rate 2%.',
                status: 'pending',
              },
              {
                id: 'risk-2',
                title: 'GrowSure Traders',
                timestamp: 'Settled today',
                description: 'Repayment received. Credit reinstated with new limit ₹28 L.',
                status: 'completed',
              },
              {
                id: 'risk-3',
                title: 'AgroSphere Logistics',
                timestamp: 'Overdue by 5 days',
                description: 'Penalty 1.5% applied. Legal notice scheduled.',
                status: 'pending',
              },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

