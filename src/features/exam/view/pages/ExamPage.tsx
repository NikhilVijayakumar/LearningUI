import ExamDetails from '../components/ExamDetails'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { useAuth } from '../../../../common/auth/authContext'
import { UrlList } from '../../../../common/routes/UrlList'
import { useNavigate } from 'react-router-dom'

const ExamPage: React.FC = () => {
  const { literal } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  if (user === null || user === undefined) {
    console.log('unauthorized token is null')
    navigate(UrlList.LOGIN)
  }
  return (
    <div>
      <ExamDetails literal={literal} />
    </div>
  )
}

export default ExamPage
