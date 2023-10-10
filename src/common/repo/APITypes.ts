//src/common/api/APITypes.ts
import { HttpStatusCode } from './HttpStatusCode'

export type ResponseSucess<T> = {
  status: HttpStatusCode
  statusMessage: String
  data: T
}

export type ResponseError = {
  status: HttpStatusCode
  statusMessage: String
}
