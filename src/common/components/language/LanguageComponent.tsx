//src\common\components\LanguageComponent.tsx
import React from 'react'
import { useLanguage } from '../../localization/LanguageContext'

const LanguageComponent: React.FC = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage()

  // Use the currentLanguage and setCurrentLanguage functions as needed

  return (
    <div>
      <h1>Current Language: {currentLanguage}</h1>
      <button onClick={() => setCurrentLanguage('en')}>Set English</button>
      <button onClick={() => setCurrentLanguage('fr')}>Set French</button>
    </div>
  )
}

export default LanguageComponent
