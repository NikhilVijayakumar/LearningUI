//path src\common\components\navigation\drawerData.ts

export type UiFeature = {
  url: string
}

export interface Features {
  id: number
  name: string
  display_order: number
}

export const drawerWidth = 240

export interface DrawerProps<T extends Features> {
  sortedFeatures: T[] | null
  UiFeatureList: Record<string, UiFeature>
  container: (() => HTMLElement) | undefined
  setSelectedIndex: (value: React.SetStateAction<number>) => void
  mobileOpen: boolean
  handleDrawerToggle: () => void
}
