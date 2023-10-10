//path : src\common\theme\themeData.ts
import { ReactNode } from 'react'

export type ThemeContextValue = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export type ThemeProviderProps = {
  children: ReactNode
}
