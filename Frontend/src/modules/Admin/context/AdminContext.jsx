import { createContext, useContext, useMemo, useReducer } from 'react'

const AdminStateContext = createContext(null)
const AdminDispatchContext = createContext(() => {})

const initialState = {
  activeTenant: 'IRA Sathi Super Admin',
  filters: {
    region: 'All',
    period: '30d',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      }
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
      }
    default:
      return state
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => state, [state])

  return (
    <AdminStateContext.Provider value={value}>
      <AdminDispatchContext.Provider value={dispatch}>{children}</AdminDispatchContext.Provider>
    </AdminStateContext.Provider>
  )
}

export function useAdminState() {
  const context = useContext(AdminStateContext)
  if (!context) throw new Error('useAdminState must be used within AdminProvider')
  return context
}

export function useAdminDispatch() {
  const dispatch = useContext(AdminDispatchContext)
  if (!dispatch) throw new Error('useAdminDispatch must be used within AdminProvider')
  return dispatch
}

