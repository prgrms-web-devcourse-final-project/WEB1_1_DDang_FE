import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'
import { DogProfileType } from '~types/dogProfile'

export type CreateDogProfileRequest = FormData

export type CreateDogProfileResponse = DogProfileType

/**
 * 새로운 반려견 프로필을 생성합니다.
 */
export const createDogProfile = async (
  req: CreateDogProfileRequest
): Promise<APIResponse<CreateDogProfileResponse>> => {
  try {
    const { data } = await axiosInstance.post<APIResponse<CreateDogProfileResponse>>('/dogs/create', req, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<ErrorResponse>

      if (response) {
        const { code, message } = response.data
        switch (code) {
          case 400:
            throw new Error(message || '잘못된 요청입니다.')
          case 401:
            throw new Error(message || '인증에 실패했습니다.')
          case 500:
            throw new Error(message || '서버 오류가 발생했습니다.')
          default:
            throw new Error(message || '알 수 없는 오류가 발생했습니다.')
        }
      }

      // 요청 자체가 실패한 경우
      throw new Error('네트워크 연결을 확인해주세요')
    }

    console.error('예상치 못한 에러:', error)
    throw new Error('다시 시도해주세요')
  }
}
