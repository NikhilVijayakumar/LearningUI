//src\common\localization\LanguageProvider.tsx
import { useState, ReactNode } from 'react'
import { LanguageContext, LanguageContextValue } from './LanguageContext'
import enLiterals from './locales/en.json'

type LanguageProviderProps = {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const literal = currentLanguage === 'en' ? enLiterals : {}

  const contextValue: LanguageContextValue = {
    currentLanguage,
    setCurrentLanguage,
    literal,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
