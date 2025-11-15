import { createContext, useContext, useMemo, useReducer } from 'react'

const initialState = {
  language: 'en',
  role: null,
  authenticated: false,
  profile: {
    name: 'Guest Vendor',
  },
}

// Use a symbol to detect if context is actually provided
const VENDOR_CONTEXT_SYMBOL = Symbol('VendorContextProvided')

const VendorStateContext = createContext(null)
const VendorDispatchContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'AUTH_LOGIN':
      return {
        ...state,
        authenticated: true,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }
    case 'AUTH_LOGOUT':
      return { ...state, authenticated: false, profile: initialState.profile }
    default:
      return state
  }
}

export function VendorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ ...state, [VENDOR_CONTEXT_SYMBOL]: true }), [state])
  const dispatchWithSymbol = useMemo(() => {
    const wrappedDispatch = (action) => dispatch(action)
    wrappedDispatch[VENDOR_CONTEXT_SYMBOL] = true
    return wrappedDispatch
  }, [dispatch])
  return (
    <VendorStateContext.Provider value={value}>
      <VendorDispatchContext.Provider value={dispatchWithSymbol}>{children}</VendorDispatchContext.Provider>
    </VendorStateContext.Provider>
  )
}

export function useVendorState() {
  const context = useContext(VendorStateContext)
  if (!context || !context[VENDOR_CONTEXT_SYMBOL]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('useVendorState must be used within VendorProvider')
      throw new Error('useVendorState must be used within VendorProvider')
    }
    // In production, return initial state to prevent crashes
    return initialState
  }
  // Remove the symbol before returning
  const { [VENDOR_CONTEXT_SYMBOL]: _, ...state } = context
  return state
}

export function useVendorDispatch() {
  const dispatch = useContext(VendorDispatchContext)
  if (!dispatch || !dispatch[VENDOR_CONTEXT_SYMBOL]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('useVendorDispatch must be used within VendorProvider')
      throw new Error('useVendorDispatch must be used within VendorProvider')
    }
    // In production, return a no-op function to prevent crashes
    return () => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('VendorDispatch called outside VendorProvider')
      }
    }
  }
  // Return the dispatch function directly
  return dispatch
}

