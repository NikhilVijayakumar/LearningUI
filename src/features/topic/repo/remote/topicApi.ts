//path src/features/organization/repo/remote/organizationApi.ts
import ApiService from '../../../../common/repo/ApiService'
import { TopicResponse } from '../data/topicData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'

export const getTopic = async (
  literal: Record<string, string>,
): Promise<ServerResponse<TopicResponse>> => {
  return ApiService.getInstance(literal).get<TopicResponse>(URL.TOPICS_ENDPOINT)
}
