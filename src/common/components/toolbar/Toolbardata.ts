//path src/components/toolbar/Toolbardata.ts

import { ThemeContextValue } from '../../theme/themeData'

export interface ToolbarProps {
  handleDrawerToggle: () => void
  title: string
  themeContext: ThemeContextValue
}
