export type APIResponse<T> = {
  code: number
  status: string
  message: string
  data: T
}

export type ErrorResponse = APIResponse<null>
