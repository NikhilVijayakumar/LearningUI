//src/common/api/HttpStatusCode.ts
export enum HttpStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  //for managing state
  INTERNET_ERROR = 0,
  IDLE = 1000,
}

export function getStatusMessage(
  status: HttpStatusCode,
  literal: Record<string, string>,
): string {
  switch (status) {
    case HttpStatusCode.SUCCESS:
      return literal['success_message']
    case HttpStatusCode.CREATED:
      return literal['created_message']
    case HttpStatusCode.BAD_REQUEST:
      return literal['bad_request_message']
    case HttpStatusCode.UNAUTHORIZED:
      return literal['unauthorized_message']
    case HttpStatusCode.NOT_FOUND:
      return literal['not_found_message']
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      return literal['internal_server_error']
    case HttpStatusCode.INTERNET_ERROR:
      return literal['internet_error']
    case HttpStatusCode.IDLE:
      return literal['idle_message']
    default:
      return literal['unknown_message']
  }
}
