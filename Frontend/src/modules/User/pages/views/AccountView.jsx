import { useState } from 'react'
import { useUserState, useUserDispatch } from '../../context/UserContext'
import {
  UserIcon,
  MapPinIcon,
  PackageIcon,
  TruckIcon,
  BellIcon,
  ShieldCheckIcon,
  HelpCircleIcon,
  EditIcon,
  PlusIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
} from '../../components/icons'
import { cn } from '../../../../lib/cn'

export function AccountView() {
  const { profile, addresses, orders } = useUserState()
  const dispatch = useUserDispatch()
  const [activeSection, setActiveSection] = useState('profile')
  const [editingName, setEditingName] = useState(false)
  const [editedName, setEditedName] = useState(profile.name)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const handleSaveName = () => {
    dispatch({
      type: 'AUTH_LOGIN',
      payload: { ...profile, name: editedName },
    })
    setEditingName(false)
  }

  const handleSetDefaultAddress = (addressId) => {
    dispatch({ type: 'SET_DEFAULT_ADDRESS', payload: { id: addressId } })
  }

  const sections = [
    {
      id: 'profile',
      title: 'Personal Information',
      icon: UserIcon,
      items: [
        {
          id: 'name',
          label: 'Full Name',
          value: profile.name,
          editable: true,
          onEdit: () => setEditingName(true),
        },
        {
          id: 'email',
          label: 'Email',
          value: profile.email || 'Not set',
          editable: false,
        },
        {
          id: 'phone',
          label: 'Phone',
          value: profile.phone || 'Not set',
          editable: false,
        },
        {
          id: 'password',
          label: 'Password',
          value: '••••••••',
          editable: true,
          onEdit: () => {
            // Handle password change
            alert('Password change feature coming soon')
          },
        },
      ],
    },
    {
      id: 'addresses',
      title: 'Location & Addresses',
      icon: MapPinIcon,
      items: addresses.length > 0 ? addresses.map((addr) => ({
        id: addr.id,
        label: addr.label || addr.type || 'Address',
        value: `${addr.street}, ${addr.city}, ${addr.state} ${addr.pincode}`,
        isDefault: addr.isDefault,
        editable: true,
        onEdit: () => setEditingAddress(addr),
      })) : [],
    },
    {
      id: 'orders',
      title: 'Orders & Transactions',
      icon: PackageIcon,
      items: [
        {
          id: 'history',
          label: 'Order History',
          value: `${orders.length} orders`,
          action: () => {
            // Navigate to orders view
            window.location.hash = '#orders'
          },
        },
        {
          id: 'invoices',
          label: 'Invoices',
          value: 'Download invoices',
          action: () => {
            alert('Invoice download feature coming soon')
          },
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Delivery Settings',
      icon: TruckIcon,
      items: [
        {
          id: 'default-delivery',
          label: 'Default Delivery Address',
          value: addresses.find((a) => a.isDefault)?.label || 'Not set',
          editable: true,
        },
        {
          id: 'track-deliveries',
          label: 'Track Deliveries',
          value: `${orders.filter((o) => o.status === 'pending' || o.status === 'processing').length} active`,
          action: () => {
            alert('Delivery tracking feature coming soon')
          },
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications & Alerts',
      icon: BellIcon,
      items: [
        {
          id: 'sms',
          label: 'SMS Notifications',
          value: 'Enabled',
          toggle: true,
          enabled: true,
        },
        {
          id: 'email',
          label: 'Email Notifications',
          value: 'Enabled',
          toggle: true,
          enabled: true,
        },
        {
          id: 'push',
          label: 'Push Notifications',
          value: 'Enabled',
          toggle: true,
          enabled: true,
        },
        {
          id: 'newsletter',
          label: 'Newsletter',
          value: 'Subscribed',
          toggle: true,
          enabled: true,
        },
        {
          id: 'promotional',
          label: 'Promotional Messages',
          value: 'Enabled',
          toggle: true,
          enabled: false,
        },
      ],
    },
    {
      id: 'security',
      title: 'Security & Permissions',
      icon: ShieldCheckIcon,
      items: [
        {
          id: 'recovery',
          label: 'Account Recovery',
          value: 'Set up recovery options',
          action: () => {
            alert('Account recovery setup coming soon')
          },
        },
        {
          id: 'privacy',
          label: 'Privacy Settings',
          value: 'Manage privacy',
          action: () => {
            alert('Privacy settings coming soon')
          },
        },
      ],
    },
    {
      id: 'support',
      title: 'Support & Help',
      icon: HelpCircleIcon,
      items: [
        {
          id: 'help',
          label: 'Help Center',
          value: 'FAQs & Guides',
          action: () => {
            alert('Help center coming soon')
          },
        },
        {
          id: 'contact',
          label: 'Contact Support',
          value: 'Chat or Call',
          action: () => {
            alert('Contact support: +91 1800-XXX-XXXX')
          },
        },
        {
          id: 'report',
          label: 'Report Issue',
          value: 'Report a problem',
          action: () => {
            alert('Issue reporting coming soon')
          },
        },
      ],
    },
  ]

  return (
    <div className="user-account-view space-y-6">
      {/* Profile Header */}
      <div className="user-account-view__header">
        <div className="user-account-view__header-avatar">
          <UserIcon className="h-10 w-10" />
        </div>
        <div className="user-account-view__header-info">
          <h2 className="user-account-view__header-name">{profile.name}</h2>
          <p className="user-account-view__header-email">{profile.email || profile.phone}</p>
        </div>
      </div>

      {/* Name Edit Modal */}
      {editingName && (
        <div className="user-account-view__edit-modal">
          <div className="user-account-view__edit-modal-content">
            <h3 className="user-account-view__edit-modal-title">Edit Name</h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="user-account-view__edit-modal-input"
              placeholder="Enter your name"
              autoFocus
            />
            <div className="user-account-view__edit-modal-actions">
              <button
                type="button"
                className="user-account-view__edit-modal-cancel"
                onClick={() => {
                  setEditedName(profile.name)
                  setEditingName(false)
                }}
              >
                <XIcon className="h-4 w-4" />
                Cancel
              </button>
              <button
                type="button"
                className="user-account-view__edit-modal-save"
                onClick={handleSaveName}
              >
                <CheckIcon className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="user-account-view__sections">
        {sections.map((section) => (
          <div key={section.id} className="user-account-view__section">
            <div className="user-account-view__section-header">
              <section.icon className="user-account-view__section-icon" />
              <h3 className="user-account-view__section-title">{section.title}</h3>
            </div>
            <div className="user-account-view__section-content">
              {section.id === 'addresses' && (
                <button
                  type="button"
                  className="user-account-view__add-button"
                  onClick={() => setShowAddAddress(true)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add New Address
                </button>
              )}
              {section.items.length > 0 ? (
                section.items.map((item) => (
                  <div key={item.id} className="user-account-view__item">
                    <div className="user-account-view__item-content">
                      <div className="user-account-view__item-label-wrapper">
                        <span className="user-account-view__item-label">{item.label}</span>
                        {item.isDefault && (
                          <span className="user-account-view__item-badge">Default</span>
                        )}
                      </div>
                      <span className="user-account-view__item-value">{item.value}</span>
                    </div>
                    <div className="user-account-view__item-actions">
                      {item.toggle ? (
                        <label className="user-account-view__toggle">
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={() => {
                              // Handle toggle
                              alert(`${item.label} toggle coming soon`)
                            }}
                            className="user-account-view__toggle-input"
                          />
                          <span className="user-account-view__toggle-slider" />
                        </label>
                      ) : (
                        <>
                          {item.editable && (
                            <button
                              type="button"
                              className="user-account-view__item-edit"
                              onClick={item.onEdit}
                            >
                              <EditIcon className="h-4 w-4" />
                            </button>
                          )}
                          {item.action && (
                            <button
                              type="button"
                              className="user-account-view__item-action"
                              onClick={item.action}
                            >
                              <ChevronRightIcon className="h-5 w-5" />
                            </button>
                          )}
                          {item.id === 'default-delivery' && (
                            <button
                              type="button"
                              className="user-account-view__item-action"
                              onClick={() => {
                                const defaultAddr = addresses.find((a) => a.isDefault)
                                if (defaultAddr) {
                                  alert('Change default delivery address coming soon')
                                }
                              }}
                            >
                              <ChevronRightIcon className="h-5 w-5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="user-account-view__empty">
                  <section.icon className="user-account-view__empty-icon" />
                  <p className="user-account-view__empty-text">No {section.title.toLowerCase()} yet</p>
                  {section.id === 'addresses' && (
                    <button
                      type="button"
                      className="user-account-view__empty-button"
                      onClick={() => setShowAddAddress(true)}
                    >
                      Add Address
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="user-account-view__modal">
          <div className="user-account-view__modal-content">
            <div className="user-account-view__modal-header">
              <h3 className="user-account-view__modal-title">Add New Address</h3>
              <button
                type="button"
                className="user-account-view__modal-close"
                onClick={() => {
                  setShowAddAddress(false)
                  setEditingAddress(null)
                }}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="user-account-view__modal-body">
              <p className="user-account-view__modal-text">Address management feature coming soon</p>
              <button
                type="button"
                className="user-account-view__modal-button"
                onClick={() => {
                  setShowAddAddress(false)
                  setEditingAddress(null)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
