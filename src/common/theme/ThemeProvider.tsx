//path src\common\theme\ThemeProvider.tsx

import { useState } from 'react'
import { ThemeContextValue, ThemeProviderProps } from './themeData'
import { ThemeContext } from './themeContext'

// Define the ThemeProvider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Provide the theme context value
  const contextValue: ThemeContextValue = {
    darkMode,
    toggleDarkMode,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
