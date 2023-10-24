//path src/features/home/view/components/HomeContent.tsx

import React from 'react'
import Box from '@mui/material/Box'
import { drawerWidth } from '../../../../common/components/navigation/drawerData'
import { StateType } from '../../../../common/utils/AppState'
import { HomeContentProps } from '../../repo/data/homeData'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import useRoutes from '../../../../common/routes/useRoutes'

const HomeContent: React.FC<HomeContentProps> = ({
  homeState,
  index,
  homeFeatureList,
}) => {
  const emptyComponent = () => {
    return <div />
  }

  const showLoader = () => {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  const showError = () => {
    return (
      <Box>
        <Alert severity="error">appstate.statusMessage</Alert>{' '}
      </Box>
    )
  }

  const loadContent = () => {
    if (homeState.isError) {
      console.log('error')
      return showError()
    }

    if (index === undefined) {
      console.log('index === undefined')
      return emptyComponent()
    }
    if (homeState.state === StateType.LOADING) {
      console.log('loading', homeState.state)
      return showLoader()
    }
    const feature = homeState.sortedFeatures[index]
    if (feature === undefined) {
      console.log('feature === undefined')
      return emptyComponent()
    }
    const uiFeatures = homeFeatureList[feature.name]
    if (uiFeatures !== undefined) {
      console.log('valid uiFeatures', uiFeatures.url)
      return React.createElement(useRoutes(uiFeatures.url))
    }
    return emptyComponent()
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: '100vw',
        marginLeft: { sm: `${drawerWidth}px` },
        minHeight: '100vh',
        marginTop: '64px',
      }}
    >
      {loadContent()}
    </Box>
  )
}

export default HomeContent
