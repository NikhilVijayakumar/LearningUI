// src/features/login/repo/remote/loginApi.ts
import ApiService from '../../../../common/repo/ApiService'
import { LoginRequest, LoginResponse } from '../data/loginData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'

export const loginApi = async (
  loginRequest: LoginRequest,
  literal: Record<string, string>,
): Promise<ServerResponse<LoginResponse>> => {
  return ApiService.getInstance(literal).post<LoginResponse>(
    URL.LOGIN_ENDPOINT,
    loginRequest,
  )
}
