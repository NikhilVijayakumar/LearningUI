import QuizView from '../components/QuizView'
import useQuiz from '../../hooks/useQuiz'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const QuizPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate, fetchQuiz } =
  useQuiz(literal)

  return (
    <div>
      <QuizView
        appstate={appstate}
        literal={literal}
        fetchQuiz={fetchQuiz}
      />
    </div>
  )
}

export default QuizPage
