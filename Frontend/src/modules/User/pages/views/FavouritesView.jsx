import { useUserState, useUserDispatch } from '../../context/UserContext'
import { userSnapshot } from '../../services/userData'
import { ProductCard } from '../../components/ProductCard'
import { HeartIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function FavouritesView({ onProductClick, onAddToCart, onRemoveFromFavourites }) {
  const { favourites } = useUserState()
  const dispatch = useUserDispatch()

  const favouriteProducts = favourites
    .map((id) => userSnapshot.products.find((p) => p.id === id))
    .filter(Boolean)

  const handleRemoveFromFavourites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: { productId } })
    onRemoveFromFavourites?.(productId)
  }

  return (
    <div className="user-favourites-view space-y-6">
      <div className="user-favourites-view__header">
        <h2 className="user-favourites-view__title">My Favourites</h2>
        <p className="user-favourites-view__subtitle">
          {favouriteProducts.length} {favouriteProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {favouriteProducts.length === 0 ? (
        <div className="user-favourites-view__empty">
          <div className="user-favourites-view__empty-icon">
            <HeartIcon className="h-16 w-16" filled={false} />
          </div>
          <h3 className="user-favourites-view__empty-title">No favourites yet</h3>
          <p className="user-favourites-view__empty-text">
            Start adding products to your favourites by tapping the heart icon on any product
          </p>
        </div>
      ) : (
        <div className="user-favourites-view__grid">
          {favouriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, isWishlisted: true }}
              onNavigate={onProductClick}
              onAddToCart={onAddToCart}
              onWishlist={handleRemoveFromFavourites}
              className="user-favourites-view__card"
            />
          ))}
        </div>
      )}
    </div>
  )
}

