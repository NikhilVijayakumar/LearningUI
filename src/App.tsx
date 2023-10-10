//src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from './common/routes/routes'
import { LanguageProvider } from './common/localization/LanguageProvider'
import { ThemeProvider } from './common/theme/ThemeProvider'
import { AuthProvider } from './common/auth/AuthProvider'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
