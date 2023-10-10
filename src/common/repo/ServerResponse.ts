//src/common/api/ServerResponse.ts
import { ResponseSucess, ResponseError } from './APITypes'
import { HttpStatusCode } from './HttpStatusCode'

export default class ServerResponse<T> {
  public isError: boolean = false
  public isSuccess: boolean = false
  public status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
  public statusMessage: String = ''
  public data?: T

  private constructor() {}

  private static getSucessInstance<T>(success: ResponseSucess<T>) {
    const instance = new ServerResponse<T>()
    instance.isSuccess = true
    instance.isError = false
    instance.status = success.status
    instance.statusMessage = success.statusMessage
    instance.data = success.data
    return instance
  }

  private static getErrorInstance<T>(error: ResponseError) {
    const instance = new ServerResponse<T>()
    instance.isSuccess = false
    instance.isError = true
    instance.status = error.status
    instance.statusMessage = error.statusMessage
    return instance
  }

  public static success<T>(success: ResponseSucess<T>): ServerResponse<T> {
    return ServerResponse.getSucessInstance<T>(success)
  }

  static error<T>(error: ResponseError): ServerResponse<T> {
    return ServerResponse.getErrorInstance<T>(error)
  }
}
