import { AxiosError } from 'axios'
import { axiosInstance } from '~apis/axiosInstance'
import { APIResponse, ErrorResponse } from '~types/apiResponse'

interface GetDogInfoResponse {
  memberId: number
  name: string
  address: string
  gender: 'MALE' | 'FEMALE'
  familyRole: string
  profileImg: string
  isMatched: 'TRUE' | 'FALSE'
  totalDistance: number
  walkCount: number
  countWalksWithMember: number
  dog: {
    dogId: number
    name: string
    breed: string
    birthDate: string
    weight: number
    gender: 'MALE' | 'FEMALE'
    profileImg: string
    isNeutered: 'TRUE' | 'FALSE'
    familyId: number
    comment: string
  }
}

export const fetchMypage = async (): Promise<APIResponse<GetDogInfoResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<GetDogInfoResponse>>('/member/mypage')
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>
      if (response) {
        throw new Error(response.data.message ?? '요청 실패')
      }
      if (request) {
        throw new Error('네트워크 연결을 확인해주세요')
      }
    }
    throw new Error('다시 시도해주세요')
  }
}
