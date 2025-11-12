import { cn } from '../../../lib/cn'

export function DataTable({ columns = [], rows = [], emptyState = 'No data available', className }) {
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-muted/60 bg-white/90 shadow-sm', className)}>
      <table className="min-w-full divide-y divide-muted/60 text-sm">
        <thead className="bg-brand-soft/20 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} className="px-4 py-3">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted/60 bg-white/60">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-sm text-muted-foreground">
                {emptyState}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="transition hover:bg-brand-soft/40 hover:text-surface-foreground focus-within:bg-brand-soft/40"
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-3 align-top">
                    {typeof column.Cell === 'function' ? column.Cell(row) : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

