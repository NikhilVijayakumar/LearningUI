import { useState, useEffect } from 'react'
import { AuthContext } from './authContext'
import { AuthUser, AuthProviderProps, AuthContextValue } from './authData'

export function AuthProvider({ children }: AuthProviderProps) {
  const storedUserJSON = sessionStorage.getItem('user')
  const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null

  const [user, setUserState] = useState<AuthUser>(storedUser)

  const setUser = (newUser: AuthUser) => {
    setUserState(newUser)
    if (newUser) {
      sessionStorage.setItem('user', JSON.stringify(newUser))
    } else {
      sessionStorage.removeItem('user')
    }
  }

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem('user')
    }
  }, [user])

  const contextValue: AuthContextValue = {
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
