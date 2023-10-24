//path src\features\quiz\view\pages\QuizPage.tsx

import QuizView from '../components/QuizView'
import useQuiz from '../../hooks/useQuiz'
import { useLanguage } from '../../../../common/localization/LanguageContext'

const QuizPage: React.FC = () => {
  const { literal } = useLanguage()
  const { appstate, fetchQuiz,handleRadioChange,handleRestart,handleSubmit } = useQuiz(literal)

  return (
    <div>
      <QuizView appstate={appstate} 
      literal={literal} 
      fetchQuiz={fetchQuiz} 
      handleRadioChange={handleRadioChange}
      handleRestart={handleRestart}
      handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default QuizPage
