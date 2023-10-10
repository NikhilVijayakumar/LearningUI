//src/common/localization/LanguageContext.ts
import { createContext, useContext } from 'react'

export type LanguageContextValue = {
  currentLanguage: string
  setCurrentLanguage: (language: string) => void
  literal: Record<string, string>
}

export const LanguageContext = createContext<LanguageContextValue>(
  {} as LanguageContextValue,
)

export function useLanguage() {
  return useContext(LanguageContext)
}
