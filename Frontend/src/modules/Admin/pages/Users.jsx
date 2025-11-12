import { Ban, Search, UserCheck } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { users } from '../services/adminData'

const columns = [
  { Header: 'User', accessor: 'name' },
  { Header: 'User ID', accessor: 'id' },
  { Header: 'Region', accessor: 'region' },
  { Header: 'Linked Seller', accessor: 'sellerId' },
  { Header: 'Orders', accessor: 'orders' },
  { Header: 'Payments', accessor: 'payments' },
  { Header: 'Support Tickets', accessor: 'supportTickets' },
  { Header: 'Status', accessor: 'status' },
]

export function UsersPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 5 • User Management</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">User Trust & Compliance</h2>
          <p className="text-sm text-muted-foreground">
            Monitor orders, payments, and support escalations. Disable risky accounts with a single action.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-surface px-4 py-2 text-sm text-muted-foreground transition hover:border-brand hover:text-brand">
            <Search className="h-4 w-4" />
            Advanced Search
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
            <UserCheck className="h-4 w-4" />
            Verify Account
          </button>
        </div>
      </header>

      <DataTable
        columns={columns.map((column) => ({
          ...column,
          Cell:
            column.accessor === 'payments'
              ? (row) => (
                  <StatusBadge tone={row.payments === 'On Time' ? 'success' : 'warning'}>
                    {row.payments}
                  </StatusBadge>
                )
              : column.accessor === 'status'
              ? (row) => (
                  <StatusBadge tone={row.status === 'Active' ? 'success' : 'warning'}>
                    {row.status}
                  </StatusBadge>
                )
              : undefined,
        }))}
        rows={users}
        emptyState="No user accounts found"
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-muted/60 bg-white/80 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">User Verification Workflow</h3>
          <p className="text-sm text-muted-foreground">
            Ensure every user is mapped to a seller, with payment visibility and support ticket insights.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'KYC Review',
                description: 'Auto fetch KYC docs and ensure mapping to seller IDs before activation.',
                status: 'Completed',
              },
              {
                title: 'Risk Scoring',
                description: 'Flag users with repeated payment delays or support escalations over SLA.',
                status: 'In Progress',
              },
              {
                title: 'Escalation Pipeline',
                description: 'Route flagged accounts to fraud prevention with timeline tracking.',
                status: 'Pending',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-muted/60 bg-surface p-4 hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-surface-foreground">{item.title}</p>
                  <StatusBadge tone={item.status === 'Completed' ? 'success' : item.status === 'In Progress' ? 'warning' : 'neutral'}>
                    {item.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-accent/40 bg-accent/10 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Ban className="h-5 w-5 text-accent" />
            <div>
              <h3 className="text-lg font-semibold text-surface-foreground">Suspicious Accounts</h3>
              <p className="text-sm text-accent">
                Pattern-based alerts combining payment delays, refund rate, and support escalations.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                user: 'USR-7841 • SLR-552',
                detail: 'Refund frequency above threshold. Review manual overrides and block if required.',
              },
              {
                user: 'USR-9922 • SLR-713',
                detail: 'Multiple support tickets unresolved. Investigate quality of service delivered.',
              },
              {
                user: 'USR-8841 • SLR-883',
                detail: 'Payment lapsed twice in 45 days. Credit risk flagged.',
              },
            ].map((item) => (
              <div key={item.user} className="rounded-2xl border border-accent/40 bg-white/70 px-4 py-3">
                <p className="text-sm font-semibold text-surface-foreground">{item.user}</p>
                <p className="text-xs text-accent">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

