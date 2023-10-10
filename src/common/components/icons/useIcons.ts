//path src/common/routes/useRoutes.ts

import OrganizationIcon from '@mui/icons-material/CorporateFare'
import UserIcon from '@mui/icons-material/People'
import RoleIcon from '@mui/icons-material/ManageAccounts'
import ProductIcon from '@mui/icons-material/PrecisionManufacturing'
import BoardModelIcon from '@mui/icons-material/Cable'
import BoardIcon from '@mui/icons-material/ElectricalServices'
import SensorModelIcon from '@mui/icons-material/EdgesensorHigh'
import SensorIcon from '@mui/icons-material/Sensors'
import HomeIcon from '@mui/icons-material/Home'
import { UrlList } from '../../routes/UrlList'

const useRoutes = (path: string) => {
  switch (path) {
    case UrlList.USER:
      return UserIcon
    case UrlList.ORGANIZATION:
      return OrganizationIcon
    case UrlList.ROLE:
      return RoleIcon
    case UrlList.PRODUCT:
      return ProductIcon
    case UrlList.BOARD_MODEL:
      return BoardModelIcon
    case UrlList.BOARD:
      return BoardIcon
    case UrlList.SENSOR_MODEL:
      return SensorModelIcon
    case UrlList.SENSOR:
      return SensorIcon
    case UrlList.ORGANIZATION_DETAILS:
      return OrganizationIcon
    case UrlList.USER_DETAILS:
      return UserIcon
    case UrlList.ROLE_DETAILS:
      return RoleIcon
    case UrlList.PRODUCT_DETAILS:
      return ProductIcon
    case UrlList.BOARD_MODEL_DETAILS:
      return BoardModelIcon
    case UrlList.BOARD_DETAILS:
      return BoardIcon
    case UrlList.SENSOR_MODEL_DETAILS:
      return SensorModelIcon
    case UrlList.SENSOR_DETAILS:
      return SensorIcon

    default:
      return HomeIcon
  }
}

export default useRoutes
