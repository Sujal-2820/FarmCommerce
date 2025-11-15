import { useEffect, useMemo, useRef, useState } from 'react'
import { useUserDispatch, useUserState } from '../context/UserContext'
import { MobileShell } from '../components/MobileShell'
import { BottomNavItem } from '../components/BottomNavItem'
import { MenuList } from '../components/MenuList'
import { HomeIcon, SearchIcon, CartIcon, UserIcon, MenuIcon } from '../components/icons'
import { userSnapshot, MIN_ORDER_VALUE } from '../services/userData'
import { cn } from '../../../lib/cn'
import { useToast, ToastProvider } from '../components/ToastNotification'
import { HomeView } from './views/HomeView'
import { SearchView } from './views/SearchView'
import { ProductDetailView } from './views/ProductDetailView'
import { CartView } from './views/CartView'
import { CheckoutView } from './views/CheckoutView'
import { AccountView } from './views/AccountView'
import '../user.css'

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    description: 'Browse products and categories',
    icon: HomeIcon,
  },
  {
    id: 'search',
    label: 'Search',
    description: 'Find products',
    icon: SearchIcon,
  },
  {
    id: 'cart',
    label: 'Cart',
    description: 'Your shopping cart',
    icon: CartIcon,
  },
  {
    id: 'account',
    label: 'Account',
    description: 'Orders, profile, settings',
    icon: UserIcon,
  },
]

function UserDashboardContent({ onLogout }) {
  const { profile, cart } = useUserState()
  const dispatch = useUserDispatch()
  const [activeTab, setActiveTab] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const { toasts, dismissToast, success, error, warning, info } = useToast()
  const [searchMounted, setSearchMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  // Initialize user data if not present
  useEffect(() => {
    if (!profile.name || profile.name === 'Guest User') {
      dispatch({
        type: 'AUTH_LOGIN',
        payload: userSnapshot.profile,
      })
      if (userSnapshot.addresses.length > 0) {
        userSnapshot.addresses.forEach((addr) => {
          dispatch({ type: 'ADD_ADDRESS', payload: addr })
        })
      }
    }
  }, [dispatch, profile])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const handleAddToCart = (productId, quantity = 1) => {
    const product = userSnapshot.products.find((p) => p.id === productId)
    if (!product) {
      error('Product not found')
      return
    }
    if (product.stock === 0) {
      error('Product is out of stock')
      return
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        vendor: product.vendor,
        deliveryTime: product.deliveryTime,
      },
    })
    success(`${product.name} added to cart`)
  }

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } })
    success('Item removed from cart')
  }

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } })
  }

  const handleProceedToCheckout = () => {
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (cartTotal < MIN_ORDER_VALUE) {
      warning(`Minimum order value is ₹${MIN_ORDER_VALUE.toLocaleString('en-IN')}`)
      return
    }
    setShowCheckout(true)
    setActiveTab('checkout')
  }

  const openSearch = () => {
    setSearchMounted(true)
    requestAnimationFrame(() => setSearchOpen(true))
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setTimeout(() => {
      setSearchMounted(false)
      setSearchQuery('')
    }, 260)
  }

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
      searchInputRef.current.select()
    }
  }, [searchOpen])

  const buildMenuItems = (close) => [
    ...NAV_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      description: item.description,
      icon: <item.icon className="h-4 w-4" />,
      onSelect: () => {
        setActiveTab(item.id)
        close()
      },
    })),
    {
      id: 'logout',
      label: 'Sign out',
      icon: <MenuIcon className="h-4 w-4" />,
      description: 'Log out from your account',
      onSelect: () => {
        dispatch({ type: 'AUTH_LOGOUT' })
        onLogout?.()
        close()
      },
    },
  ]

  return (
    <>
      <MobileShell
        title={activeTab === 'home' ? `Hello ${profile.name.split(' ')[0]}` : null}
        subtitle={profile.location?.city ? `${profile.location.city}, ${profile.location.state}` : null}
        onSearchClick={openSearch}
        navigation={NAV_ITEMS.map((item) => (
          <BottomNavItem
            key={item.id}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => {
              setActiveTab(item.id)
              setSelectedProduct(null)
              setShowCheckout(false)
            }}
            icon={<item.icon active={activeTab === item.id} className="h-5 w-5" />}
            badge={item.id === 'cart' ? cartCount : undefined}
          />
        ))}
        menuContent={({ close }) => <MenuList items={buildMenuItems(close)} active={activeTab} />}
        cartCount={cartCount}
      >
        <section className="space-y-6">
          {activeTab === 'home' && (
            <HomeView
              onProductClick={(productId) => {
                setSelectedProduct(productId)
                setActiveTab('product-detail')
              }}
              onCategoryClick={(categoryId) => {
                setActiveTab('search')
                // Filter by category
              }}
              onAddToCart={handleAddToCart}
            />
          )}
          {activeTab === 'search' && (
            <SearchView
              query={searchQuery}
              onProductClick={(productId) => {
                setSelectedProduct(productId)
                setActiveTab('product-detail')
              }}
              onAddToCart={handleAddToCart}
            />
          )}
          {activeTab === 'product-detail' && selectedProduct && (
            <ProductDetailView
              productId={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={() => {
                setSelectedProduct(null)
                setActiveTab('home')
              }}
            />
          )}
          {activeTab === 'cart' && (
            <CartView
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemove={handleRemoveFromCart}
              onCheckout={handleProceedToCheckout}
            />
          )}
          {activeTab === 'checkout' && showCheckout && (
            <CheckoutView
              onBack={() => {
                setShowCheckout(false)
                setActiveTab('cart')
              }}
              onOrderPlaced={(order) => {
                dispatch({ type: 'ADD_ORDER', payload: order })
                dispatch({ type: 'CLEAR_CART' })
                success('Order placed successfully!')
                setShowCheckout(false)
                setActiveTab('account')
              }}
            />
          )}
          {activeTab === 'account' && <AccountView />}
        </section>
      </MobileShell>

      {searchMounted ? (
        <div className={cn('user-search-sheet', searchOpen && 'is-open')}>
          <div className={cn('user-search-sheet__overlay', searchOpen && 'is-open')} onClick={closeSearch} />
          <div className={cn('user-search-sheet__panel', searchOpen && 'is-open')}>
            <div className="flex items-center gap-2.5">
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    setActiveTab('search')
                    closeSearch()
                  }
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    closeSearch()
                  }
                }}
                placeholder="Search products..."
                className="flex-1 rounded-2xl border border-[rgba(15,118,110,0.25)] bg-[rgba(240,253,250,0.85)] py-2.5 px-4 text-[0.9rem] text-[#0f172a] shadow-[inset_0_2px_6px_-3px_rgba(15,23,42,0.25)] focus:outline-none focus:border-[#1b8f5b] focus:ring-2 focus:ring-[rgba(43,118,79,0.2)]"
                aria-label="Search products"
              />
              <button
                type="button"
                className="border-none bg-transparent text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#047857]"
                onClick={closeSearch}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export function UserDashboard({ onLogout }) {
  return (
    <ToastProvider>
      <UserDashboardContent onLogout={onLogout} />
    </ToastProvider>
  )
}
