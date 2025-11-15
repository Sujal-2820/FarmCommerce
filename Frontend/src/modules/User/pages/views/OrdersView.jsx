import { useState, useMemo } from 'react'
import { useUserState } from '../../context/UserContext'
import { PackageIcon, TruckIcon, ClockIcon, CheckCircleIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'added_to_cart', label: 'Added to cart' },
  { id: 'delivered', label: 'Delivered' },
]

export function OrdersView() {
  const { orders, cart } = useUserState()
  const [activeFilter, setActiveFilter] = useState('all')

  // Combine orders and cart items
  const allItems = useMemo(() => {
    const orderItems = orders.map((order) => ({
      ...order,
      type: 'order',
      status: order.status || 'pending',
    }))

    // Add cart items as "added_to_cart" status
    const cartItems = cart.length > 0
      ? [
          {
            id: 'cart',
            type: 'cart',
            status: 'added_to_cart',
            date: new Date().toISOString(),
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            paymentStatus: 'pending',
          },
        ]
      : []

    return [...cartItems, ...orderItems]
  }, [orders, cart])

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return allItems
    }
    if (activeFilter === 'added_to_cart') {
      return allItems.filter((item) => item.status === 'added_to_cart')
    }
    return allItems.filter((item) => item.status === activeFilter)
  }, [allItems, activeFilter])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4" />
      case 'added_to_cart':
        return <PackageIcon className="h-4 w-4" />
      case 'delivered':
        return <CheckCircleIcon className="h-4 w-4" />
      default:
        return <PackageIcon className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'added_to_cart':
        return 'bg-blue-100 text-blue-700'
      case 'delivered':
        return 'bg-green-100 text-[#1b8f5b]'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="user-orders-view space-y-6">
      <div className="user-orders-view__header">
        <h2 className="user-orders-view__title">My Orders</h2>
      </div>

      {/* Filter Tabs */}
      <div className="user-orders-view__filters">
        <div className="user-orders-view__filters-rail">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(
                'user-orders-view__filter-tab',
                activeFilter === tab.id && 'user-orders-view__filter-tab--active'
              )}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="user-orders-view__list">
        {filteredItems.length === 0 ? (
          <div className="user-orders-view__empty">
            <PackageIcon className="user-orders-view__empty-icon" />
            <h3 className="user-orders-view__empty-title">No orders found</h3>
            <p className="user-orders-view__empty-text">
              {activeFilter === 'all'
                ? "You haven't placed any orders yet"
                : `No ${FILTER_TABS.find((t) => t.id === activeFilter)?.label.toLowerCase()} orders`}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="user-orders-view__card">
              <div className="user-orders-view__card-header">
                <div className="user-orders-view__card-header-left">
                  <div className="user-orders-view__card-id">
                    {item.type === 'cart' ? 'Cart' : `Order #${item.id?.slice(-8) || 'N/A'}`}
                  </div>
                  <div className="user-orders-view__card-date">{formatDate(item.date)}</div>
                </div>
                <div className={cn('user-orders-view__card-status', getStatusColor(item.status))}>
                  {getStatusIcon(item.status)}
                  <span className="user-orders-view__card-status-text">
                    {item.status === 'added_to_cart'
                      ? 'In Cart'
                      : item.status === 'pending'
                        ? 'Pending'
                        : item.status === 'delivered'
                          ? 'Delivered'
                          : item.status}
                  </span>
                </div>
              </div>

              <div className="user-orders-view__card-items">
                {item.items?.map((orderItem, index) => (
                  <div key={index} className="user-orders-view__card-item">
                    <div className="user-orders-view__card-item-image">
                      <img
                        src={orderItem.image || 'https://via.placeholder.com/60'}
                        alt={orderItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="user-orders-view__card-item-details">
                      <h4 className="user-orders-view__card-item-name">{orderItem.name}</h4>
                      <div className="user-orders-view__card-item-meta">
                        <span className="user-orders-view__card-item-quantity">
                          Qty: {orderItem.quantity}
                        </span>
                        <span className="user-orders-view__card-item-price">
                          ₹{orderItem.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="user-orders-view__card-footer">
                <div className="user-orders-view__card-total">
                  <span className="user-orders-view__card-total-label">Total:</span>
                  <span className="user-orders-view__card-total-amount">
                    ₹{item.total?.toLocaleString('en-IN') || '0'}
                  </span>
                </div>
                {item.paymentStatus && item.paymentStatus !== 'fully_paid' && (
                  <div className="user-orders-view__card-payment">
                    <span className="user-orders-view__card-payment-label">Payment:</span>
                    <span
                      className={cn(
                        'user-orders-view__card-payment-status',
                        item.paymentStatus === 'partial_paid' && 'text-orange-600',
                        item.paymentStatus === 'pending' && 'text-red-600'
                      )}
                    >
                      {item.paymentStatus === 'partial_paid'
                        ? 'Partial Paid (30%)'
                        : item.paymentStatus === 'pending'
                          ? 'Pending'
                          : item.paymentStatus}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

