import { useMemo, useState } from 'react'
import { userSnapshot } from '../../services/userData'
import { ProductCard } from '../../components/ProductCard'
import { FilterIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function SearchView({ query = '', onProductClick, onAddToCart, categoryId }) {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })

  const filteredProducts = useMemo(() => {
    let products = [...userSnapshot.products]

    // Filter by search query
    if (query.trim()) {
      const searchLower = query.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory)
    }

    // Filter by price
    products = products.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max)

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'popular':
      default:
        products.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        break
    }

    return products
  }, [query, selectedCategory, sortBy, priceRange])

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#172022] mb-1">
            {query ? `Search: "${query}"` : 'All Products'}
          </h2>
          <p className="text-sm text-[rgba(26,42,34,0.65)]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-[rgba(34,94,65,0.18)] bg-white text-[rgba(26,42,34,0.75)] text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-[rgba(34,94,65,0.28)] hover:bg-[rgba(255,255,255,0.92)]"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md'
                    : 'bg-[rgba(240,245,242,0.8)] text-[rgba(23,32,34,0.65)] border border-[rgba(34,94,65,0.15)] hover:bg-[rgba(248,252,249,0.95)]'
                )}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {userSnapshot.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md'
                      : 'bg-[rgba(240,245,242,0.8)] text-[rgba(23,32,34,0.65)] border border-[rgba(34,94,65,0.15)] hover:bg-[rgba(248,252,249,0.95)]'
                  )}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">Sort By</label>
            <select
              className="w-full px-4 py-2.5 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white text-sm font-semibold text-[#172022] focus:outline-none focus:border-[#1b8f5b] focus:ring-2 focus:ring-[rgba(43,118,79,0.2)]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">
              Price Range: ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full h-2 bg-[rgba(34,94,65,0.12)] rounded-lg appearance-none cursor-pointer accent-[#1b8f5b]"
              />
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full h-2 bg-[rgba(34,94,65,0.12)] rounded-lg appearance-none cursor-pointer accent-[#1b8f5b]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onProductClick}
              onAddToCart={onAddToCart}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-base font-semibold text-[rgba(26,42,34,0.75)] mb-2">No products found</p>
          <p className="text-sm text-[rgba(26,42,34,0.55)]">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  )
}

