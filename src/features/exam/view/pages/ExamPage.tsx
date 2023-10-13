import ExamDetails from '../components/ExamDetails'
import useExam from '../../hooks/useExam'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const ExamPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate, fetchQuiz } =
    useExam(literal)

  return (
    <div>
      <ExamDetails
        appstate={appstate}
        literal={literal}
        fetchQuiz={fetchQuiz}
      />
    </div>
  )
}

export default ExamPage
