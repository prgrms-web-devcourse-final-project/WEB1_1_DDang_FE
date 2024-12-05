import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

interface CreateDogProfileResponse {
  dogId: number
  name: string
  breed: string
  birthDate: string
  weight: number
  gender: 'MALE' | 'FEMALE'
  profileImg: File
  isNeutered: 'TRUE' | 'FALSE'
  familyId: number
  comment: string
}

export const createDogProfile = async (formData: FormData): Promise<APIResponse<CreateDogProfileResponse>> => {
  try {
    const { data } = await axiosInstance.post<APIResponse<CreateDogProfileResponse>>('/dogs/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        console.error('반려견 등록 오류:', response.data)
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
