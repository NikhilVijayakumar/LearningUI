//src/common/api/ApiService.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import ServerResponse from './ServerResponse'
import { HttpStatusCode } from './HttpStatusCode'
import { ResponseSucess, ResponseError } from './APITypes'

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

let BASE_URL = import.meta.env.VITE_REACT_APP_HOST

class ApiService {
  private static instance: ApiService

  private constructor(private literal: Record<string, string>) {}

  public static getInstance(literal: Record<string, string>): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(literal)
    }
    return ApiService.instance
  }

  private async request<T>(
    config: AxiosRequestConfig,
  ): Promise<ServerResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axios(config)
      const responseSucess: ResponseSucess<T> = {
        status: response.status,
        statusMessage: response.statusText,
        data: response.data,
      }
      return ServerResponse.success<T>(responseSucess)
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        const status =
          axiosError.response?.status || HttpStatusCode.INTERNAL_SERVER_ERROR
        const message =
          axiosError.message || this.literal['internal_server_error']
        const responseError: ResponseError = {
          status: status,
          statusMessage: message,
        }
        return ServerResponse.error<T>(responseError)
      } else {
        return ServerResponse.error<T>({
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          statusMessage: this.literal['internal_server_error'],
        })
      }
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ServerResponse<T>> {
    return this.request<T>({
      ...config,
      url: `${BASE_URL}/${url}`,
      method: HTTPMethod.GET,
    })
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ServerResponse<T>> {
    return this.request<T>({
      ...config,
      url: `${BASE_URL}/${url}`,
      method: HTTPMethod.POST,
      data,
    })
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ServerResponse<T>> {
    return this.request<T>({
      ...config,
      url: `${BASE_URL}/${url}`,
      method: HTTPMethod.PUT,
      data,
    })
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ServerResponse<T>> {
    return this.request<T>({
      ...config,
      url: `${BASE_URL}/${url}`,
      method: HTTPMethod.DELETE,
    })
  }
}

export default ApiService
