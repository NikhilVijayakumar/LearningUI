//path src/features/organization/repo/remote/organizationApi.ts
import ApiService from '../../../../common/repo/ApiService'
import { QuizResponse,QuizTopic } from '../data/examData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'



export const getQuiz = async (
  literal: Record<string, string>,data: QuizTopic
): Promise<ServerResponse<QuizResponse>> => {
  return ApiService.getInstance(literal).post<QuizResponse>(
    URL.QUIZ_ENDPOINT, data
  )
}



