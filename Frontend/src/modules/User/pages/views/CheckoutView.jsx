import { useState, useMemo } from 'react'
import { useUserState } from '../../context/UserContext'
import { userSnapshot, ADVANCE_PAYMENT_PERCENTAGE, REMAINING_PAYMENT_PERCENTAGE } from '../../services/userData'
import { MapPinIcon, CreditCardIcon, TruckIcon, ChevronRightIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function CheckoutView({ onBack, onOrderPlaced }) {
  const { cart, addresses, profile } = useUserState()
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || null,
  )
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: 'Home',
    address: '',
    city: profile.location?.city || '',
    state: profile.location?.state || '',
    pincode: profile.location?.pincode || '',
    phone: profile.phone || '',
  })

  const cartItems = useMemo(() => {
    return cart.map((item) => {
      const product = userSnapshot.products.find((p) => p.id === item.productId)
      return {
        ...item,
        product,
      }
    })
  }, [cart])

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const delivery = subtotal >= 5000 ? 0 : 50
    const total = subtotal + delivery
    const advance = Math.round((total * ADVANCE_PAYMENT_PERCENTAGE) / 100)
    const remaining = total - advance

    return {
      subtotal,
      delivery,
      total,
      advance,
      remaining,
    }
  }, [cartItems])

  // Find assigned vendor based on location (20km radius rule)
  const assignedVendor = useMemo(() => {
    // In real app, this would be calculated based on user's location and vendor locations
    // For now, use the first vendor from the cart items
    const vendorId = cartItems[0]?.vendor?.id
    if (vendorId) {
      return userSnapshot.products.find((p) => p.vendor?.id === vendorId)?.vendor
    }
    return null
  }, [cartItems])

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert('Please select a delivery address')
      return
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentStatus: 'partial_paid',
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: totals.total,
      advancePaid: totals.advance,
      remaining: totals.remaining,
      vendor: assignedVendor,
      deliveryTime: cartItems[0]?.deliveryTime || '1 day',
      deliveryDate: null,
      addressId: selectedAddress,
    }

    // In real app, this would call payment gateway
    // For now, simulate payment
    if (window.confirm(`Proceed to pay ₹${totals.advance.toLocaleString('en-IN')} (30% advance)?`)) {
      onOrderPlaced(order)
    }
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        className="flex items-center gap-2 text-sm font-semibold text-[#1b8f5b] mb-2"
        onClick={onBack}
      >
        <ChevronRightIcon className="h-5 w-5 rotate-180" />
        Back to Cart
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#172022]">Checkout</h2>
      </div>

      {/* Delivery Address */}
      <section className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="h-5 w-5 text-[#1b8f5b]" />
          <h3 className="text-base font-semibold text-[#172022]">Delivery Address</h3>
        </div>
        {addresses.length > 0 ? (
          <div className="space-y-3">
            {addresses.map((address) => (
              <label
                key={address.id}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all',
                  selectedAddress === address.id
                    ? 'border-[#1b8f5b] bg-[rgba(240,245,242,0.5)]'
                    : 'border-[rgba(34,94,65,0.15)] bg-white hover:border-[rgba(34,94,65,0.25)]'
                )}
              >
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  checked={selectedAddress === address.id}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="mt-1 w-4 h-4 accent-[#1b8f5b]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#172022]">{address.name}</span>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-[#1b8f5b]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[rgba(26,42,34,0.7)] mb-1">
                    {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-xs text-[rgba(26,42,34,0.6)]">{address.phone}</p>
                </div>
              </label>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-[rgba(26,42,34,0.65)]">No addresses saved. Please add an address to continue.</p>
          </div>
        )}
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white text-[#1b8f5b] text-sm font-semibold hover:bg-[rgba(240,245,242,0.5)] transition-colors"
          onClick={() => setShowAddressForm(!showAddressForm)}
        >
          + Add New Address
        </button>
      </section>

      {/* Order Summary */}
      <section className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <TruckIcon className="h-5 w-5 text-[#1b8f5b]" />
          <h3 className="text-base font-semibold text-[#172022]">Order Summary</h3>
        </div>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#172022] line-clamp-1">{item.name}</p>
                <p className="text-xs text-[rgba(26,42,34,0.6)]">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-[#1b8f5b] flex-shrink-0">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>
        {assignedVendor && (
          <div className="p-3 rounded-xl bg-[rgba(240,245,242,0.5)] border border-[rgba(34,94,65,0.15)]">
            <p className="text-xs font-semibold text-[rgba(26,42,34,0.65)] uppercase tracking-[0.05em] mb-1">Assigned Vendor</p>
            <p className="text-sm font-semibold text-[#172022]">{assignedVendor.name}</p>
            <p className="text-xs text-[rgba(26,42,34,0.6)]">{assignedVendor.location}</p>
          </div>
        )}
      </section>

      {/* Payment Summary */}
      <section className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <CreditCardIcon className="h-5 w-5 text-[#1b8f5b]" />
          <h3 className="text-base font-semibold text-[#172022]">Payment</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[rgba(26,42,34,0.65)]">Subtotal</span>
            <span className="font-semibold text-[#172022]">₹{totals.subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[rgba(26,42,34,0.65)]">Delivery</span>
            <span className="font-semibold text-[#172022]">{totals.delivery === 0 ? 'Free' : `₹${totals.delivery}`}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[rgba(34,94,65,0.1)]">
            <span className="text-base font-bold text-[#172022]">Total</span>
            <span className="text-xl font-bold text-[#1b8f5b]">₹{totals.total.toLocaleString('en-IN')}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(34,94,65,0.1)]">
            <div className="p-3 rounded-xl bg-[rgba(240,245,242,0.5)] border border-[rgba(34,94,65,0.15)]">
              <p className="text-xs font-semibold text-[rgba(26,42,34,0.65)] uppercase tracking-[0.05em] mb-1">Advance Payment (30%)</p>
              <p className="text-lg font-bold text-[#1b8f5b]">₹{totals.advance.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-3 rounded-xl bg-[rgba(240,245,242,0.5)] border border-[rgba(34,94,65,0.15)]">
              <p className="text-xs font-semibold text-[rgba(26,42,34,0.65)] uppercase tracking-[0.05em] mb-1">Remaining (70%)</p>
              <p className="text-lg font-bold text-[#1b8f5b]">₹{totals.remaining.toLocaleString('en-IN')}</p>
              <p className="text-xs text-[rgba(26,42,34,0.6)] mt-1">Pay after delivery</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 pt-3 border-t border-[rgba(34,94,65,0.1)]">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-[rgba(34,94,65,0.15)] bg-white cursor-pointer hover:bg-[rgba(240,245,242,0.3)] transition-colors">
            <input
              type="radio"
              name="payment"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 accent-[#1b8f5b]"
            />
            <span className="text-sm font-semibold text-[#172022]">Razorpay</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-xl border border-[rgba(34,94,65,0.15)] bg-white cursor-pointer hover:bg-[rgba(240,245,242,0.3)] transition-colors">
            <input
              type="radio"
              name="payment"
              value="paytm"
              checked={paymentMethod === 'paytm'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 accent-[#1b8f5b]"
            />
            <span className="text-sm font-semibold text-[#172022]">Paytm</span>
          </label>
        </div>
      </section>

      {/* Place Order Button */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-[rgba(34,94,65,0.1)] -mx-5 space-y-2">
        <button
          type="button"
          className={cn(
            'w-full py-4 px-6 rounded-2xl text-base font-bold transition-all duration-200',
            selectedAddress
              ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          )}
          onClick={handlePlaceOrder}
          disabled={!selectedAddress}
        >
          Pay ₹{totals.advance.toLocaleString('en-IN')} & Place Order
        </button>
        <p className="text-xs text-center text-[rgba(26,42,34,0.65)]">
          You will pay the remaining ₹{totals.remaining.toLocaleString('en-IN')} after delivery
        </p>
      </div>
    </div>
  )
}

