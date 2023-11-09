// src/features/registration/repo/remote/registrationApi.ts
import ApiService from '../../../../common/repo/ApiService'
import {
  RegistrationRequest,
  RegistrationResponse,
} from '../data/registrationData'
import ServerResponse from '../../../../common/repo/ServerResponse'
import URL from '../../../../common/repo/ApiUrl'

export const registrationApi = async (
  registrationRequest: RegistrationRequest,
  literal: Record<string, string>,
): Promise<ServerResponse<RegistrationResponse>> => {
  return ApiService.getInstance(literal).post<RegistrationResponse>(
    URL.REGISTRATION_ENDPOINT,
    registrationRequest,
  )
}