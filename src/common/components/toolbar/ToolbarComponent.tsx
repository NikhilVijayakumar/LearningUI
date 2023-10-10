//path src/components/toolbar/ToolbarComponent.tsx

import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import ThemeToggle from '../theme/ThemeToggle'
import { ToolbarProps } from './Toolbardata'

const ToolbarComponent: React.FC<ToolbarProps> = ({
  handleDrawerToggle,
  title,
  themeContext,
}) => {
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <ThemeToggle themeContext={themeContext} />
    </Toolbar>
  )
}

export default ToolbarComponent
