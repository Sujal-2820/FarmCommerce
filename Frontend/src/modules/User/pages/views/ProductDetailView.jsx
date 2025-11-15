import { useState } from 'react'
import { userSnapshot } from '../../services/userData'
import { StarIcon, HeartIcon, TruckIcon, MapPinIcon, ChevronRightIcon, PlusIcon, MinusIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function ProductDetailView({ productId, onAddToCart, onBack }) {
  const product = userSnapshot.products.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false)

  if (!product) {
    return (
      <div className="space-y-4">
        <div className="text-center py-12">
          <p className="text-base font-semibold text-[rgba(26,42,34,0.75)] mb-4">Product not found</p>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white text-sm font-semibold"
            onClick={onBack}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const inStock = product.stock > 0
  const stockStatus = product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'

  const handleAddToCart = () => {
    if (inStock) {
      onAddToCart(productId, quantity)
    }
  }

  const images = [product.image, product.image, product.image] // In real app, use product.images

  return (
    <div className="space-y-6">
      <button
        type="button"
        className="flex items-center gap-2 text-sm font-semibold text-[#1b8f5b] mb-2"
        onClick={onBack}
      >
        <ChevronRightIcon className="h-5 w-5 rotate-180" />
        Back
      </button>

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gray-100">
          <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  'flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all',
                  selectedImage === index
                    ? 'border-[#1b8f5b] scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                )}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#172022] flex-1">{product.name}</h1>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(34,94,65,0.15)] bg-white hover:bg-[rgba(240,245,242,0.5)] transition-colors"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <HeartIcon className="h-5 w-5" filled={isWishlisted} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className="h-4 w-4 text-yellow-400"
                filled={star <= Math.round(product.rating || 0)}
              />
            ))}
          </div>
          <span className="text-sm text-[rgba(26,42,34,0.65)]">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#1b8f5b]">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-lg text-[rgba(26,42,34,0.5)] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-red-500">-{product.discount}%</span>
            </>
          )}
        </div>

        {product.vendor && (
          <div className="flex items-start gap-3 p-3 rounded-2xl border border-[rgba(34,94,65,0.15)] bg-[rgba(240,245,242,0.5)]">
            <MapPinIcon className="h-5 w-5 text-[#1b8f5b] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#172022]">{product.vendor.name}</p>
              <p className="text-xs text-[rgba(26,42,34,0.65)]">
                {product.vendor.location} • {product.vendor.distance} away
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-[rgba(26,42,34,0.65)]">
          <TruckIcon className="h-4 w-4" />
          <span>Delivery in {product.deliveryTime}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={cn(
            'px-3 py-1.5 rounded-full text-xs font-semibold',
            inStock
              ? 'bg-green-100 text-[#1b8f5b]'
              : 'bg-red-100 text-red-600'
          )}>
            {stockStatus}
          </span>
          {inStock && product.stock <= 10 && (
            <span className="text-sm text-orange-600 font-medium">Only {product.stock} left!</span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold text-[#172022]">Description</h3>
          <p className="text-sm text-[rgba(26,42,34,0.7)] leading-relaxed">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        {inStock && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] uppercase tracking-[0.05em]">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white hover:bg-[rgba(240,245,242,0.5)] transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="text-lg font-bold text-[#172022] min-w-[2rem] text-center">{quantity}</span>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white hover:bg-[rgba(240,245,242,0.5)] transition-colors"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Add to Cart Button - Fixed at bottom on mobile */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-[rgba(34,94,65,0.1)] -mx-5 mt-6">
          <button
            type="button"
            className={cn(
              'w-full py-4 px-6 rounded-2xl text-base font-bold transition-all duration-200',
              inStock
                ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            )}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            {inStock ? `Add to Cart • ₹${(product.price * quantity).toLocaleString('en-IN')}` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

