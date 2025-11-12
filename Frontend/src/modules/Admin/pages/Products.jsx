import { Layers3, MapPin, ToggleRight } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { FilterBar } from '../components/FilterBar'
import { productInventory } from '../services/adminData'

const columns = [
  { Header: 'Product', accessor: 'name' },
  { Header: 'Stock', accessor: 'stock' },
  { Header: 'Vendor Price', accessor: 'vendorPrice' },
  { Header: 'User Price', accessor: 'userPrice' },
  { Header: 'Expiry / Batch', accessor: 'expiry' },
  { Header: 'Region', accessor: 'region' },
  { Header: 'Visibility', accessor: 'visibility' },
]

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 2 • Master Product Management</p>
          <h2 className="text-2xl font-semibold text-surface-foreground">Central Catalogue Control</h2>
          <p className="text-sm text-muted-foreground">
            Manage pricing, stock distribution, and regional visibility with batch-level precision.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90">
          <Layers3 className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <FilterBar
        filters={[
          { id: 'region', label: 'All regions', active: true },
          { id: 'visibility', label: 'Active status' },
          { id: 'expiry', label: 'Expiry alerts' },
        ]}
      />

      <DataTable
        columns={columns.map((column) => ({
          ...column,
          Cell:
            column.accessor === 'visibility'
              ? (row) => (
                  <StatusBadge tone={row.visibility === 'Active' ? 'success' : 'warning'}>
                    {row.visibility}
                  </StatusBadge>
                )
              : column.accessor === 'region'
              ? (row) => (
                  <div className="inline-flex items-center gap-2 rounded-full border border-muted/60 bg-surface px-3 py-1 text-xs">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {row.region}
                  </div>
                )
              : undefined,
        }))}
        rows={productInventory}
        emptyState="No products found in the catalogue"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-muted/60 bg-white/80 p-5 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-surface-foreground">Regional Assignment Snapshot</h3>
          <p className="text-sm text-muted-foreground">Ensure region-specific pricing and stock buffers are within threshold.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { region: 'West', coverage: '32 vendors', fill: 78, tone: 'success' },
              { region: 'North', coverage: '24 vendors', fill: 62, tone: 'warning' },
              { region: 'South', coverage: '18 vendors', fill: 44 },
              { region: 'Central', coverage: '12 vendors', fill: 58 },
              { region: 'North East', coverage: '8 vendors', fill: 39 },
              { region: 'East', coverage: '28 vendors', fill: 71, tone: 'success' },
            ].map((item) => (
              <div key={item.region} className="rounded-2xl border border-muted/60 bg-surface p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-surface-foreground">
                  <span>{item.region}</span>
                  <span>{item.coverage}</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={
                      item.tone === 'success'
                        ? 'h-full rounded-full bg-brand'
                        : item.tone === 'warning'
                        ? 'h-full rounded-full bg-accent'
                        : 'h-full rounded-full bg-brand/70'
                    }
                    style={{ width: `${item.fill}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-3xl border border-muted/60 bg-white/80 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-surface-foreground">Visibility Controls</h3>
          <p className="text-sm text-muted-foreground">
            Toggle product availability and orchestrate upcoming launches or sunset batches.
          </p>
          {productInventory.map((product) => (
            <div key={product.id} className="flex items-center justify-between rounded-2xl border border-muted/60 bg-surface px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-surface-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">Batch expiry • {product.expiry}</p>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full border border-muted/60 bg-white/70 px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-brand hover:text-brand">
                <ToggleRight className="h-4 w-4" />
                {product.visibility === 'Active' ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

