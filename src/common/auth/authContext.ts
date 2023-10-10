//path : src\common\auth\authContext.ts

import { createContext, useContext } from 'react'
import { AuthContextValue } from './authData'

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}
