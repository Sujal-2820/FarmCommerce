import { useState } from 'react'
import { useUserState, useUserDispatch } from '../../context/UserContext'
import { userSnapshot } from '../../services/userData'
import { PackageIcon, MapPinIcon, CreditCardIcon, UserIcon, TruckIcon } from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function AccountView() {
  const { profile, orders, addresses } = useUserState()
  const dispatch = useUserDispatch()
  const [activeSection, setActiveSection] = useState('orders')

  const orderStatusConfig = {
    pending: { label: 'Pending', color: 'warn' },
    processing: { label: 'Processing', color: 'teal' },
    delivered: { label: 'Delivered', color: 'success' },
  }

  const paymentStatusConfig = {
    pending: { label: 'Payment Pending', color: 'warn' },
    partial_paid: { label: 'Partial Paid (30%)', color: 'teal' },
    fully_paid: { label: 'Fully Paid', color: 'success' },
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)]">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(107,196,143,0.32)] to-[rgba(28,124,80,0.26)] text-[#1b8f5b]">
          <UserIcon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-[#172022] mb-1">{profile.name}</h2>
          <p className="text-sm text-[rgba(26,42,34,0.65)]">{profile.email}</p>
          <p className="text-sm text-[rgba(26,42,34,0.65)]">{profile.phone}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 rounded-2xl bg-white border border-[rgba(34,94,65,0.12)] shadow-[0_8px_20px_-16px_rgba(16,44,30,0.25)]">
        <button
          type="button"
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all',
            activeSection === 'orders'
              ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md'
              : 'text-[rgba(23,32,34,0.65)] hover:bg-[rgba(240,245,242,0.5)]'
          )}
          onClick={() => setActiveSection('orders')}
        >
          <PackageIcon className="h-4 w-4" />
          Orders
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all',
            activeSection === 'addresses'
              ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md'
              : 'text-[rgba(23,32,34,0.65)] hover:bg-[rgba(240,245,242,0.5)]'
          )}
          onClick={() => setActiveSection('addresses')}
        >
          <MapPinIcon className="h-4 w-4" />
          Addresses
        </button>
        <button
          type="button"
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all',
            activeSection === 'profile'
              ? 'bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white shadow-md'
              : 'text-[rgba(23,32,34,0.65)] hover:bg-[rgba(240,245,242,0.5)]'
          )}
          onClick={() => setActiveSection('profile')}
        >
          <UserIcon className="h-4 w-4" />
          Profile
        </button>
      </div>

      {/* Orders Section */}
      {activeSection === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#172022]">My Orders</h3>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#172022]">Order #{order.id}</p>
                      <p className="text-xs text-[rgba(26,42,34,0.6)]">{order.date}</p>
                    </div>
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-semibold',
                        orderStatusConfig[order.status]?.color === 'success' && 'bg-green-100 text-[#1b8f5b]',
                        orderStatusConfig[order.status]?.color === 'teal' && 'bg-teal-100 text-teal-700',
                        orderStatusConfig[order.status]?.color === 'warn' && 'bg-orange-100 text-[#9b6532]',
                        (!orderStatusConfig[order.status]?.color || orderStatusConfig[order.status]?.color === 'warn') && 'bg-orange-100 text-[#9b6532]'
                      )}
                    >
                      {orderStatusConfig[order.status]?.label || order.status}
                    </span>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-[rgba(34,94,65,0.1)]">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-[rgba(26,42,34,0.75)]">{item.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[rgba(26,42,34,0.6)]">Qty: {item.quantity}</span>
                          <span className="font-semibold text-[#172022]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.vendor && (
                    <div className="flex items-center gap-2 text-sm text-[rgba(26,42,34,0.65)]">
                      <TruckIcon className="h-4 w-4" />
                      <span>{order.vendor.name}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-[rgba(34,94,65,0.1)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#172022]">Total: ₹{order.total.toLocaleString('en-IN')}</span>
                      <span
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-semibold',
                          paymentStatusConfig[order.paymentStatus]?.color === 'success' && 'bg-green-100 text-[#1b8f5b]',
                          paymentStatusConfig[order.paymentStatus]?.color === 'teal' && 'bg-teal-100 text-teal-700',
                          paymentStatusConfig[order.paymentStatus]?.color === 'warn' && 'bg-orange-100 text-[#9b6532]',
                          (!paymentStatusConfig[order.paymentStatus]?.color || paymentStatusConfig[order.paymentStatus]?.color === 'warn') && 'bg-orange-100 text-[#9b6532]'
                        )}
                      >
                        {paymentStatusConfig[order.paymentStatus]?.label || order.paymentStatus}
                      </span>
                    </div>
                    {order.paymentStatus === 'partial_paid' && order.remaining > 0 && (
                      <button
                        type="button"
                        className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white text-sm font-semibold hover:shadow-md transition-all"
                        onClick={() => {
                          // In real app, open payment gateway
                          alert(`Pay remaining ₹${order.remaining.toLocaleString('en-IN')}`)
                        }}
                      >
                        Pay Remaining ₹{order.remaining.toLocaleString('en-IN')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base font-semibold text-[rgba(26,42,34,0.75)] mb-2">No orders yet</p>
              <p className="text-sm text-[rgba(26,42,34,0.55)]">Start shopping to see your orders here</p>
            </div>
          )}
        </div>
      )}

      {/* Addresses Section */}
      {activeSection === 'addresses' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#172022]">Saved Addresses</h3>
          {addresses.length > 0 ? (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#172022]">{address.name}</span>
                    {address.isDefault && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-[#1b8f5b]">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[rgba(26,42,34,0.7)]">
                    {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-xs text-[rgba(26,42,34,0.6)]">{address.phone}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-[rgba(34,94,65,0.1)]">
                    {!address.isDefault && (
                      <button
                        type="button"
                        className="flex-1 py-2 px-3 rounded-xl border border-[rgba(34,94,65,0.2)] bg-white text-[#1b8f5b] text-xs font-semibold hover:bg-[rgba(240,245,242,0.5)] transition-colors"
                        onClick={() =>
                          dispatch({ type: 'SET_DEFAULT_ADDRESS', payload: { id: address.id } })
                        }
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      type="button"
                      className="flex-1 py-2 px-3 rounded-xl border border-[rgba(34,94,65,0.2)] bg-white text-[#1b8f5b] text-xs font-semibold hover:bg-[rgba(240,245,242,0.5)] transition-colors"
                      onClick={() => {
                        // In real app, open edit address form
                        alert('Edit address functionality')
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base font-semibold text-[rgba(26,42,34,0.75)] mb-4">No addresses saved</p>
              <button
                type="button"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white text-sm font-semibold hover:shadow-md transition-all"
                onClick={() => {
                  // In real app, open add address form
                  alert('Add address functionality')
                }}
              >
                + Add Address
              </button>
            </div>
          )}
        </div>
      )}

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#172022]">Profile Information</h3>
          <div className="p-4 rounded-2xl border border-[rgba(34,94,65,0.16)] bg-gradient-to-br from-white to-[rgba(241,244,236,0.9)] shadow-[0_18px_38px_-28px_rgba(13,38,24,0.35)] space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white text-sm font-semibold text-[#172022] focus:outline-none focus:border-[#1b8f5b] focus:ring-2 focus:ring-[rgba(43,118,79,0.2)]"
                defaultValue={profile.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white text-sm font-semibold text-[#172022] focus:outline-none focus:border-[#1b8f5b] focus:ring-2 focus:ring-[rgba(43,118,79,0.2)]"
                defaultValue={profile.email}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[rgba(26,42,34,0.75)] mb-2 uppercase tracking-[0.05em]">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-2xl border border-[rgba(34,94,65,0.2)] bg-white text-sm font-semibold text-[#172022] focus:outline-none focus:border-[#1b8f5b] focus:ring-2 focus:ring-[rgba(43,118,79,0.2)]"
                defaultValue={profile.phone}
                readOnly
              />
            </div>
            <button
              type="button"
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1b8f5b] to-[#2a9d61] text-white text-sm font-semibold hover:shadow-md transition-all"
              onClick={() => {
                // In real app, open edit profile form
                alert('Edit profile functionality')
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

