import { axiosInstance } from '~apis/axiosInstance'
import { APIResponse } from '~types/apiResponse'
import { AxiosError } from 'axios'

interface TestRequest {}

interface TestResponse {}

export const test = async (req: TestRequest): Promise<TestResponse> => {
  try {
    const { data } = await axiosInstance.post<TestResponse>(`/endpoint`, req)

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<APIResponse<TestResponse>>

      if (response) {
        console.error('ErrorMessage', response.data)
        throw new Error(response.data.message ?? '요청 실패')
      }

      if (request) {
        console.error('요청 에러:', request)
        throw new Error('네트워크 연결을 확인해주세요')
      }
    }

    console.error('예상치 못한 에러:', error)
    throw new Error('다시 시도해주세요')
  }
}
