import { cn } from '../../../lib/cn'
import { ChevronRightIcon } from './icons'

export function CategoryCard({ category, onClick, className }) {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-3 p-4 rounded-2xl border border-[rgba(34,94,65,0.15)] bg-gradient-to-br from-white to-[rgba(240,248,243,0.85)] shadow-[0_18px_40px_-30px_rgba(13,38,24,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-28px_rgba(13,38,24,0.4)] overflow-hidden w-full',
        className
      )}
      onClick={() => onClick?.(category.id)}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[rgba(107,196,143,0.25)] text-[#172022] flex-shrink-0">
        {category.icon ? (
          <img src={category.icon} alt={category.name} className="w-8 h-8 object-cover rounded-xl" />
        ) : (
          <span className="text-xl font-bold">{category.name.charAt(0)}</span>
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <h3 className="text-[0.85rem] font-semibold text-[#172022] mb-0.5 truncate">{category.name}</h3>
        {category.count !== undefined && (
          <p className="text-[0.68rem] text-[rgba(23,32,34,0.55)] truncate">{category.count} products</p>
        )}
      </div>
      <ChevronRightIcon className="h-5 w-5 text-[rgba(26,42,34,0.4)] flex-shrink-0" />
    </button>
  )
}

