// Path: src\features\home\repo\data\homeData.ts

import OrganizationIcon from '@mui/icons-material/CorporateFare'
import UserIcon from '@mui/icons-material/People'
import RoleIcon from '@mui/icons-material/ManageAccounts'
import ProductIcon from '@mui/icons-material/PrecisionManufacturing'
import ComponentTypeIcon from '@mui/icons-material/Cable'
import ComponentIcon from '@mui/icons-material/ElectricalServices'
import SensorTypeIcon from '@mui/icons-material/EdgesensorHigh'
import SensorIcon from '@mui/icons-material/Sensors'
import { AppState } from '../../../../common/repo/AppState'
import {
  UiFeature,
  Features,
} from '../../../../common/components/navigation/drawerData.ts'
import { AuthUser } from '../../../../common/auth/authData'
import { UrlList } from '../../../../common/routes/UrlList.ts'

export type HomeUiFeature = UiFeature

export const UiFeatureList: Record<string, HomeUiFeature> = {
  Organization: { url: UrlList.ORGANIZATION },
  Users: { url: UrlList.USER },
  Roles: { url: UrlList.ROLE },
  Products: { url: UrlList.PRODUCT },
  BoardsModels: { url: UrlList.BOARD_MODEL },
  Boards: { url: UrlList.BOARD },
  SensorModels: { url: UrlList.SENSOR_MODEL },
  Sensors: { url: UrlList.SENSOR },
}

export interface HomeFeature extends Features {
  createdDate: string
  createdBy: string
  updatedDate: string
  updatedBy: string
}

export type HomeResponse = {
  features: HomeFeature[]
}

export interface HomeState<HomeResponse> extends AppState<HomeResponse> {
  sortedFeatures: HomeFeature[]
}

export interface HomeDashboardProps {
  appstate: HomeState<HomeResponse>
  window?: Window | null
  user: AuthUser
}

export interface HomeContentProps {
  homeState: HomeState<HomeResponse>
  index: number
  homeFeatureList: Record<string, HomeUiFeature>
}
