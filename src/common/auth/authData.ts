//path : src\common\auth\authData.ts

import { ReactNode } from 'react'

type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  token: string
  createdDate: string
  createdBy: string
  updatedDate: string
  updatedBy: string
}

export type AuthUser = User | null

export type AuthContextValue = {
  user: AuthUser
  setUser: (newUser: AuthUser) => void
}

export type AuthProviderProps = {
  children: ReactNode
}
