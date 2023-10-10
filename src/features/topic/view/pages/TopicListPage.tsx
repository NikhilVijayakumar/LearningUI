import TopicList from '../components/TopicList'
import useTopic from '../../hooks/useTopic'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const TopicListPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate,gotoExam } =
    useTopic(literal)

  return (
    <div>
      <TopicList
        appstate={appstate}
        literal={literal}   
        gotoExam={gotoExam}    
      />
    </div>
  )
}

export default TopicListPage
