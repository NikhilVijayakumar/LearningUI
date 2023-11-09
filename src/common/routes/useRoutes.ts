//path src/common/routes/useRoutes.ts


import Login from '../../features/login/view/pages/LoginPage'
import Registration from '../../features/registration/view/pages/RegistrationPage.tsx'
import Topic from '../../features/topic/view/pages/TopicListPage'
import Exam from '../../features/exam/view/pages/ExamPage'
import Quiz from '../../features/quiz/view/pages/QuizPage'
import { UrlList } from './UrlList'

const useRoutes = (path: string) => {
  switch (path) {
    case UrlList.LOGIN:
      return Login as () => JSX.Element
    case UrlList.REGISTRATION:
      return Registration as () => JSX.Element
    case UrlList.TOPIC:
      return Topic as () => JSX.Element
    case UrlList.EXAM:
      return Exam as () => JSX.Element
    case UrlList.QUIZ:
      return Quiz as () => JSX.Element
    default:
      return Login as () => JSX.Element
  }
}

export default useRoutes
