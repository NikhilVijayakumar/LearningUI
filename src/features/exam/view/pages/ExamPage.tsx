import ExamDetails from '../components/ExamDetails'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const ExamPage: React.FC = () => {
  const { literal } = useLanguage()  

  return (
    <div>
      <ExamDetails       
      />
    </div>
  )
}

export default ExamPage
