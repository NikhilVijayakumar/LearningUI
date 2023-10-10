// src/features/home/repo/remote/homeApi.ts
import ApiService from '../../../../common/repo/ApiService'
import { HomeResponse } from '../data/homeData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'

export const homeApi = async (
  literal: Record<string, string>,
): Promise<ServerResponse<HomeResponse>> => {
  return ApiService.getInstance(literal).get<HomeResponse>(URL.HOME_ENDPOINT)
}
