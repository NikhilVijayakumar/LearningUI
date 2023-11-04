//path src/features/quiz/repo/remote/quizAPI.ts

import ApiService from '../../../../common/repo/ApiService'
import {
  QuizResponse,
  QuizRequest,
  ExamResultRequest,
  ExamResultResponse,
} from '../data/quizData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'

export const getQuiz = async (
  literal: Record<string, string>,
  request: QuizRequest,
): Promise<ServerResponse<QuizResponse>> => {
  return ApiService.getInstance(literal).post<QuizResponse>(
    URL.QUIZ_ENDPOINT,
    request,
  )
}

export const saveResult = async (
  literal: Record<string, string>,
  request: ExamResultRequest,
  authToken: string,
): Promise<ServerResponse<ExamResultResponse>> => {
  console.log('saveResult authToken', authToken)
  return ApiService.getInstance(literal, authToken).post<ExamResultResponse>(
    URL.EXAM_RESULT_ENDPOINT,
    request,
  )
}
