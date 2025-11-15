import { cn } from '../../../lib/cn'
import { StarIcon, HeartIcon, TruckIcon } from './icons'

export function ProductCard({ product, onAddToCart, onWishlist, onNavigate, className }) {
  const inStock = product.stock > 0
  const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'

  return (
    <div
      className={cn(
        'flex flex-col rounded-[20px] border border-[rgba(209,213,219,0.55)] bg-gradient-to-br from-white to-[rgba(236,249,244,0.65)] shadow-[0_16px_32px_-28px_rgba(15,23,42,0.55)] overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 h-full',
        !inStock && 'opacity-60',
        className
      )}
      onClick={() => onNavigate?.(product.id)}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.discount && (
          <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-[0.7rem] font-bold text-white bg-red-500">
            -{product.discount}%
          </span>
        )}
        <button
          type="button"
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-colors hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onWishlist?.(product.id)
          }}
          aria-label="Add to wishlist"
        >
          <HeartIcon className="h-4 w-4" filled={product.isWishlisted} />
        </button>
      </div>
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          <div className="min-w-0">
            <h3 className="text-[0.9rem] font-semibold text-[#172022] line-clamp-2 mb-1">{product.name}</h3>
            {product.vendor && (
              <p className="text-[0.75rem] text-[rgba(26,42,34,0.6)] truncate">{product.vendor.name}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className="h-3.5 w-3.5 text-yellow-400"
                  filled={star <= Math.round(product.rating || 0)}
                />
              ))}
            </div>
            <span className="text-[0.7rem] text-[rgba(26,42,34,0.55)]">
              ({product.reviews || 0})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[1rem] font-bold text-[#1b8f5b]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[0.85rem] text-[rgba(26,42,34,0.5)] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            {product.deliveryTime && (
              <div className="flex items-center gap-1 text-[0.7rem] text-[rgba(26,42,34,0.6)] flex-shrink-0">
                <TruckIcon className="h-3.5 w-3.5" />
                <span className="truncate">{product.deliveryTime}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              'px-2 py-1 rounded-full text-[0.65rem] font-semibold flex-shrink-0',
              inStock
                ? 'bg-green-100 text-[#1b8f5b]'
                : 'bg-red-100 text-red-600'
            )}>
              {stockStatus}
            </span>
            {inStock && product.stock <= 10 && (
              <span className="text-[0.7rem] text-orange-600 font-medium truncate">Only {product.stock} left!</span>
            )}
          </div>
        </div>
        <button
          type="button"
          className={cn(
            'w-full py-2.5 px-4 rounded-2xl text-[0.8rem] font-semibold transition-all duration-200 mt-auto',
            inStock
              ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          )}
          onClick={(e) => {
            e.stopPropagation()
            if (inStock) {
              onAddToCart?.(product.id)
            }
          }}
          disabled={!inStock}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}

