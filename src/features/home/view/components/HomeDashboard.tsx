//path src/features/home/view/components/HomeDashboard.tsx

import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from '../../../../themes/appTheme'
import { UiFeatureList } from '../../repo/data/homeData'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { ThemeContext } from '../../../../common/theme/themeContext'
import DrawerComponent from '../../../../common/components/navigation/DrawerComponent'
import ToolbarComponent from '../../../../common/components/toolbar/ToolbarComponent'
import { drawerWidth } from '../../../../common/components/navigation/drawerData'
import { HomeDashboardProps } from '../../repo/data/homeData'
import HomeContent from './HomeContent'
import { UrlList } from '../../../../common/routes/UrlList'

export default function HomeDashboard(props: HomeDashboardProps) {
  const { literal } = useLanguage()
  const navigate = useNavigate()
  const { window, appstate, user } = props

  const themeContext = React.useContext(ThemeContext)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  if (user === null || user === undefined) {
    console.log('unauthorized token is null')
    navigate(UrlList.LOGIN)
  } else {
    console.log('authorized token is', user)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const loadName = () => {
    if (
      selectedIndex === undefined ||
      appstate.sortedFeatures === null ||
      appstate.sortedFeatures.length === 0
    ) {
      return literal['default_home_title']
    }
    return appstate.sortedFeatures[selectedIndex].name
  }

  const container = window ? () => window.document.body : undefined

  return (
    <ThemeProvider theme={themeContext.darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <ToolbarComponent
          title={loadName()}
          handleDrawerToggle={handleDrawerToggle}
          themeContext={themeContext}
        />
      </AppBar>

      <DrawerComponent
        container={container}
        sortedFeatures={appstate.sortedFeatures}
        UiFeatureList={UiFeatureList}
        setSelectedIndex={setSelectedIndex}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <HomeContent
        homeState={appstate}
        index={selectedIndex}
        homeFeatureList={UiFeatureList}
      />
    </ThemeProvider>
  )
}
