//path src\features\quiz\view\pages\QuizPage.tsx

import QuizView from '../components/QuizView'
import useQuiz from '../../hooks/useQuiz'
import { useLanguage } from '../../../../common/localization/LanguageContext'
import { useAuth } from '../../../../common/auth/authContext'
import { UrlList } from '../../../../common/routes/UrlList'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const QuizPage: React.FC = () => {
  const { literal } = useLanguage()
  const {
    appstate,
    fetchQuiz,
    handleRadioChange,
    handleRestart,
    handleSubmit,
    setAuthToken,
  } = useQuiz(literal)
  const { user } = useAuth()
  const navigate = useNavigate()
  if (user === null || user === undefined) {
    console.log('unauthorized token is null')
    navigate(UrlList.LOGIN)
  } else {
    useEffect(() => {
      setAuthToken(user.token)
    }, [])
  }
  return (
    <div>
      <QuizView
        appstate={appstate}
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
