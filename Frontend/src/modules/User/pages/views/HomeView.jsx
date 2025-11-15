import { useRef, useState, useEffect } from 'react'
import { userSnapshot } from '../../services/userData'
import { ProductCard } from '../../components/ProductCard'
import { CategoryCard } from '../../components/CategoryCard'
import { ChevronRightIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function HomeView({ onProductClick, onCategoryClick, onAddToCart }) {
  const [bannerIndex, setBannerIndex] = useState(0)
  const bannerRef = useRef(null)

  const popularProducts = userSnapshot.popularProducts
    .map((id) => userSnapshot.products.find((p) => p.id === id))
    .filter(Boolean)

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % userSnapshot.banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Banner Carousel */}
      <section className="relative -mx-5">
        <div className="relative h-48 overflow-hidden rounded-b-3xl">
          {userSnapshot.banners.map((banner, index) => (
            <div
              key={banner.id}
              className={cn(
                'absolute inset-0 bg-cover bg-center transition-opacity duration-500',
                index === bannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              )}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h2 className="text-xl font-bold mb-1">{banner.title}</h2>
                <p className="text-sm opacity-90">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {userSnapshot.banners.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === bannerIndex
                  ? 'bg-[#1b8f5b] scale-125'
                  : 'bg-[rgba(24,39,31,0.24)]'
              )}
              onClick={() => setBannerIndex(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#172022]">Categories</h3>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-[#1b8f5b] uppercase tracking-[0.08em]"
            onClick={() => onCategoryClick('all')}
          >
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {userSnapshot.categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={onCategoryClick}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#172022]">Popular Products</h3>
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-[#1b8f5b] uppercase tracking-[0.08em]"
            onClick={() => onProductClick('all')}
          >
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onProductClick}
              onAddToCart={onAddToCart}
              className="h-full"
            />
          ))}
        </div>
      </section>

      {/* Deals */}
      <section>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#172022]">Special Deals</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {userSnapshot.deals.map((deal) => (
            <div
              key={deal.id}
              className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)]"
            >
              <h4 className="text-base font-semibold text-[#172022] mb-1">{deal.title}</h4>
              <p className="text-sm text-[rgba(26,42,34,0.66)]">{deal.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

