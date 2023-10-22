//path src/features/quiz/repo/remote/quizAPI.ts

import ApiService from '../../../../common/repo/ApiService'
import { QuizResponse, QuizRequest } from '../data/quizData'
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
