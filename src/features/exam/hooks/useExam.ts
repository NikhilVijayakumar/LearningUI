//path:- src/features/orgnization/hooks/useOrganization.ts
import { getQuiz as api } from '../repo/remote/examApi'
import {
  ExamState,
  QuizResponse,
  Quiz,
} from '../repo/data/examData'
import { useState, useEffect } from 'react'
import { HttpStatusCode } from '../../../common/repo/HttpStatusCode'
import { StateType } from '../../../common/repo/AppState'
import useStatusMessage from '../../../common/repo/useStatusMessage'
import { EventType } from '../../../common/components/list/EventType'

const useExam = (literal: Record<string, string>) => {


  const [appstate, setAppState] = useState<
  ExamState<Quiz>
  >({
    state: StateType.INIT,
    isError: false,
    isSuccess: false,
    status: HttpStatusCode.IDLE,
    statusMessage: '',
    data: null,    
  })



  useEffect(() => {
    fetchQuiz()
  }, [])

  const fetchQuiz = async () => {
    setAppState((prevState) => ({
      ...prevState,
      state: StateType.LOADING,
    }))
    try {
      const response = await api(literal)
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
  }
}

export default useExam
