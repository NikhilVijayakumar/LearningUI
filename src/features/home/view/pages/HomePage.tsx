//path src/features/home/view/HomePage.tsx

import HomeDashboard from '../components/HomeDashboard'
import useHome from '../../hooks/useHome'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { useAuth } from '../../../../common/auth/authContext'

const HomePage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate } = useHome(literal)
  const { user } = useAuth()
  return (
    <div>
      <HomeDashboard appstate={appstate} user={user} />
    </div>
  )
}

export default HomePage
