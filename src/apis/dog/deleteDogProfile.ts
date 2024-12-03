import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/apiResponse'
import { axiosInstance } from '~apis/axiosInstance'

interface DeleteDogProfileResponse {
  data: Record<string, never> // 빈 객체를 나타내는 타입
}

export const deleteDogProfile = async (id: number): Promise<APIResponse<DeleteDogProfileResponse>> => {
  try {
    const { data } = await axiosInstance.delete<APIResponse<DeleteDogProfileResponse>>(`/dogs/${id}`)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        console.error('반려견 삭제 오류:', response.data)
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
