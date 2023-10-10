//package src/common/components/navigation/DrawerComponent.tsx

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Features, DrawerProps, drawerWidth } from './drawerData'
import useIcons from '../icons/useIcons'

const DrawerComponent = <T extends Features>(props: DrawerProps<T>) => {
  const {
    sortedFeatures,
    UiFeatureList,
    container,
    setSelectedIndex,
    mobileOpen,
    handleDrawerToggle,
  } = props

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index)
    handleDrawerToggle()
  }

  const loadList = () => {
    if (!sortedFeatures || sortedFeatures.length === 0) {
      return <List />
    }

    return (
      <List>
        {sortedFeatures.map((feature) => {
          const { id, name, display_order } = feature
          const uiFeatures = UiFeatureList[name]
          if (uiFeatures) {
            const IconComponent = useIcons(uiFeatures.url)
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick(display_order - 1)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            )
          } else {
            return null
          }
        })}
      </List>
    )
  }

  const loadDrawer = () => {
    return (
      <div>
        <Toolbar />
        <Divider />
        {loadList()}
      </div>
    )
  }

  return (
    <Box
      component="nav"
      sx={{ width: { drawerWidth } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {loadDrawer()}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {loadDrawer()}
      </Drawer>
    </Box>
  )
}

export default DrawerComponent
