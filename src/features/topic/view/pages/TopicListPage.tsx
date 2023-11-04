import TopicList from '../components/TopicList'
import useTopic from '../../hooks/useTopic'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { useAuth } from '../../../../common/auth/authContext'
import { UrlList } from '../../../../common/routes/UrlList'
import { useNavigate } from 'react-router-dom'

const TopicListPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate, gotoExam } = useTopic(literal)
  const { user } = useAuth()
  const navigate = useNavigate()
  if (user === null || user === undefined) {
    console.log('unauthorized token is null')
    navigate(UrlList.LOGIN)
  }
  return (
    <div>
      <TopicList appstate={appstate} literal={literal} gotoExam={gotoExam} />
    </div>
  )
}

export default TopicListPage
