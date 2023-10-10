//path src/common/repo/useStatusMessage.ts
import { HttpStatusCode } from './HttpStatusCode'

const useStatusMessage = (
  status: HttpStatusCode,
  literal: Record<string, string>,
): string => {
  let message = ''

  switch (status) {
    case HttpStatusCode.SUCCESS:
      message = literal['success_message']
      break
    case HttpStatusCode.CREATED:
      message = literal['created_message']
      break
    case HttpStatusCode.BAD_REQUEST:
      message = literal['bad_request_message']
      break
    case HttpStatusCode.UNAUTHORIZED:
      message = literal['unauthorized_message']
      break
    case HttpStatusCode.NOT_FOUND:
      message = literal['not_found_message']
      break
    case HttpStatusCode.INTERNAL_SERVER_ERROR:
      message = literal['internal_server_error']
      break
    case HttpStatusCode.INTERNET_ERROR:
      message = literal['internet_error']
      break
    case HttpStatusCode.IDLE:
      message = literal['idle_message']
      break
    default:
      message = literal['unknown_message']
      break
  }

  return message
}

export default useStatusMessage
