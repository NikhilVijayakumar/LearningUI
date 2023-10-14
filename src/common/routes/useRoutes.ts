//path src/common/routes/useRoutes.ts

import Home from '../../features/home/view/pages/HomePage'
import Login from '../../features/login/view/pages/LoginPage'
import Topic from '../../features/topic/view/pages/TopicListPage'
import Exam from '../../features/exam/view/pages/ExamPage'
import Quiz from '../../features/quiz/view/pages/QuizPage'
import { UrlList } from './UrlList'


const useRoutes = (path: string) => {
  switch (path) {
    case UrlList.LOGIN:
      return Login as () => JSX.Element
    case UrlList.HOME:
      return Home as () => JSX.Element    
      case UrlList.TOPIC:
        return Topic as () => JSX.Element   
        case UrlList.EXAM:
          return Exam as () => JSX.Element  
        case UrlList.QUIZ:
          return Quiz as () => JSX.Element   
    default:
      return Topic as () => JSX.Element
  }
}

export default useRoutes
