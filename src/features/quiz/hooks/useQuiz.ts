//path:- src/features/quiz/hooks/useQuiz.ts

import { getQuiz as api } from '../repo/remote/quizAPI'
import {
  QuizTopic,
  QuizState,
  QuizResponse,
  Quiz,
  QuizRequest,
} from '../repo/data/quizData'
import { useState } from 'react'
import { HttpStatusCode } from '../../../common/repo/HttpStatusCode'
import { StateType } from '../../../common/repo/AppState'
import useStatusMessage from '../../../common/repo/useStatusMessage'
import { EventType } from '../../../common/components/list/EventType'

const useQuiz = (literal: Record<string, string>) => {
  const [appstate, setAppState] = useState<QuizState<Quiz>>({
    state: StateType.INIT,
    isError: false,
    isSuccess: false,
    status: HttpStatusCode.IDLE,
    statusMessage: '',
    data: null,    
    validationError: false,
    quiz: [],
    currentQuestionIndex: 0,
    selectedAnswer: '',
    correctAnswers: 0,   
    chapterResults: [],
    eventType: EventType.IDLE,
   
  })

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    appstate.selectedAnswer = (event.target as HTMLInputElement).value
  }

  const handleSubmit = () => {
    if (appstate.selectedAnswer === '') {     
      setAppState((prevState) => ({
        ...prevState,
       validationError: true,
      eventType: EventType.NEXT,
      }))
      return
    }   
    if (appstate.selectedAnswer === appstate.quiz[appstate.currentQuestionIndex].question.correct_answer) {
     let answer = appstate.correctAnswers + 1
      setAppState((prevState) => ({
        ...prevState,
        correctAnswers: answer      
      }))
    }

    if (appstate.currentQuestionIndex < appstate.quiz.length - 1) {
      appstate.currentQuestionIndex = appstate.currentQuestionIndex + 1
      appstate.selectedAnswer = ''
      setAppState((prevState) => ({
        ...prevState,
        selectedAnswer: '',
       validationError: false,
      eventType: EventType.NEXT,
      }))
    } else {    
      setAppState((prevState) => ({
        ...prevState,
        validationError: false,
        eventType: EventType.COMPLETED,   
      }))
    }
  }

  const handleRestart = () => {
    appstate.currentQuestionIndex = 0
    appstate.selectedAnswer = ''
    appstate.correctAnswers = 0   
    setAppState((prevState) => ({
      ...prevState,
      validationError: false,
      currentQuestionIndex: 0,
      selectedAnswer: '',
      correctAnswers: 0, 
      chapterResults: [],
    eventType: EventType.NEXT,
    }))
  }

  const fetchQuiz = async (quizdata: QuizTopic) => {
    setAppState((prevState) => ({
      ...prevState,
      state: StateType.LOADING,
    }))
    try {
      const request: QuizRequest = { topic: quizdata.name, type: quizdata.type }
      const response = await api(literal, request)
      if (response.isSuccess && response.data) {
        const quizResponse: QuizResponse = response.data
        //  console.log("response.isSuccess", quizResponse.data)
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isSuccess: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
          data: quizResponse.data,
          quiz: quizResponse.data,
          eventType: EventType.NEXT,
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
    fetchQuiz,
    handleRadioChange,
    handleSubmit,
    handleRestart
  }
}

export default useQuiz
