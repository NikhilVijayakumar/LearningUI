//path : src\common\auth\authData.ts

import { ReactNode } from 'react'

type User = {
  token: string
  userName: string
  email: string
}

export type AuthUser = User | null

export type AuthContextValue = {
  user: AuthUser
  setUser: (newUser: AuthUser) => void
}

export type AuthProviderProps = {
  children: ReactNode
}
