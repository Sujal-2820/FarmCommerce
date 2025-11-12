import { Award, Gift, Users } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { ProgressList } from '../components/ProgressList'
import { sellers } from '../services/adminData'

const columns = [
  { Header: 'Seller', accessor: 'name' },
  { Header: 'Seller ID', accessor: 'id' },
  { Header: 'Cashback %', accessor: 'cashback' },
  { Header: 'Commission %', accessor: 'commission' },
  { Header: 'Monthly Target', accessor: 'target' },
  { Header: 'Progress', accessor: 'achieved' },
  { Header: 'Referred Users', accessor: 'referrals' },
  { Header: 'Total Sales', accessor: 'sales' },
  { Header: 'Status', accessor: 'status' },
]

export function SellersPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 4 • Seller Management</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">Sales Network HQ</h2>
          <p className="text-sm text-muted-foreground">
            Incentivise performance, track targets, and manage wallet payouts with clarity.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
          <Award className="h-4 w-4" />
          Create Seller Profile
        </button>
      </header>

      <DataTable
        columns={columns.map((column) => ({
          ...column,
          Cell:
            column.accessor === 'achieved'
              ? (row) => (
                  <div className="w-32">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{row.achieved}%</span>
                      <span>{row.sales}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${row.achieved}%` }} />
                    </div>
                  </div>
                )
              : column.accessor === 'status'
              ? (row) => (
                  <StatusBadge tone={row.status === 'On Track' ? 'success' : 'warning'}>
                    {row.status}
                  </StatusBadge>
                )
              : undefined,
        }))}
        rows={sellers}
        emptyState="No sellers found in the network"
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">Incentive Engine</h3>
          <p className="text-sm text-muted-foreground">
            Configure cashback tiers, commission slabs, and performance accelerators for each cohort.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Cashback Tier Review',
                description:
                  'Upcoming payout cycle. Validate cashback % for top performing sellers before transfer.',
                meta: '₹12.6 L to be credited',
                icon: Gift,
              },
              {
                title: 'Commission Accelerator',
                description:
                  'Approve additional 2% commission for sellers achieving 120% of monthly target.',
                meta: 'Applies to 38 sellers',
                icon: Award,
              },
              {
                title: 'Seller Onboarding',
                description:
                  'Standardise KYC, training modules and assign unique seller IDs instantly.',
                meta: '7 applicants pending KYC',
                icon: Users,
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-muted/60 bg-surface p-4 hover:-translate-y-1 hover:shadow-card">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-soft/70 text-brand">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-surface-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <p className="mt-2 text-xs font-semibold text-brand">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProgressList
          className="bg-white/80"
          items={[
            { label: 'Seller Wallet Requests', progress: 42, tone: 'warning', meta: '₹8.2 L awaiting admin approval' },
            { label: 'Monthly Target Achievement', progress: 68, tone: 'success', meta: 'Average across all sellers' },
            { label: 'Top Performer Retention', progress: 92, tone: 'success', meta: 'Proactive incentives reduce attrition' },
          ]}
        />
      </section>
    </div>
  )
}

