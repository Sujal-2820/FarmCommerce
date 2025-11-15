import { cn } from '../../../lib/cn'

export function CategoryCard({ category, onClick, className, isSelected = false }) {
  return (
    <div className={cn('home-category-card', className)}>
      <button
        type="button"
        className={cn(
          'home-category-card-button',
          isSelected && 'home-category-card-button--selected'
        )}
        onClick={() => onClick?.(category.id)}
      >
      <div className="home-category-card-button__icon">
        {category.icon ? (
          <img src={category.icon} alt={category.name} className="home-category-card-button__icon-img" />
        ) : (
          <span className="home-category-card-button__icon-text">{category.emoji || category.name.charAt(0)}</span>
        )}
      </div>
      <span className="home-category-card-button__label">{category.name}</span>
      </button>
    </div>
  )
}

