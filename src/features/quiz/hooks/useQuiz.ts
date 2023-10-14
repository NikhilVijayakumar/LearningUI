//path:- src/features/orgnization/hooks/useOrganization.ts
import { getQuiz as api } from '../repo/remote/quizAPI'
import {
  QuizTopic,
  QuizState,
  QuizResponse,
  Quiz,
} from '../repo/data/quizData'
import { useState } from 'react'
import { HttpStatusCode } from '../../../common/repo/HttpStatusCode'
import { StateType } from '../../../common/repo/AppState'
import useStatusMessage from '../../../common/repo/useStatusMessage'


const useQuiz = (literal: Record<string, string>) => {


  const [appstate, setAppState] = useState<
  QuizState<Quiz>
  >({
    state: StateType.INIT,
    isError: false,
    isSuccess: false,
    status: HttpStatusCode.IDLE,
    statusMessage: '',
    data: null,    
  })



  // useEffect(() => {
  //   fetchQuiz()
  // }, [])

  const fetchQuiz = async (quizdata:QuizTopic) => {
    setAppState((prevState) => ({
      ...prevState,
      state: StateType.LOADING,
    }))
    try {
      const response = await api(literal,quizdata)
      if (response.isSuccess && response.data) {
        const quizResponse: QuizResponse = response.data
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isSuccess: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
          data: quizResponse.data.quiz,
        }))
      } else {
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isError: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
        }))
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        state: StateType.COMPLETED,
        isError: true,
        status: HttpStatusCode.INTERNET_ERROR,
        statusMessage: useStatusMessage(HttpStatusCode.INTERNET_ERROR, literal),
      }))
    }
  }
  return {
    appstate, 
    fetchQuiz 
  }
}

export default useQuiz
