import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'
import { useQuery } from '@tanstack/react-query'

export const WALK_COMPLETE_QUERY_KEY = 'walkComplete' as const

export type FetchWalkCompleteRequest = {
  walkImgFile: File
  totalDistanceMeter: number
  totalWalkTimeSecond: number
}

export type TimeDuration = {
  hours: number
  minutes: number
  seconds: number
}

export type WalkWithDogInfo = {
  otherDogId: number
  otherDogProfileImg: string
  otherDogName: string
  otherDogBreed: string
  otherDogAge: number
  otherDogGender: 'MALE' | 'FEMALE'
  memberId: number
}

export type FetchWalkCompleteResponse = {
  date: string
  memberName: string
  dogName: string
  totalDistanceMeter: number
  timeDuration: TimeDuration
  totalCalorie: number
  walkImg: string
  walkWithDogInfo: WalkWithDogInfo
}

export const fetchWalkComplete = async (formData: FormData): Promise<APIResponse<FetchWalkCompleteResponse>> => {
  try {
    const { data } = await axiosInstance.post<APIResponse<FetchWalkCompleteResponse>>(`/walk/complete`, formData, {
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
      throw new Error('네트워크 연결을 확인해주세요')
    }

    console.error('예상치 못한 에러:', error)
    throw new Error('다시 시도해주세요')
  }
}

export const useWalkComplete = (formData: FormData) => {
  return useQuery({
    queryKey: [WALK_COMPLETE_QUERY_KEY, formData],
    queryFn: () => fetchWalkComplete(formData),
    enabled: false,
  })
}
