import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
}

interface WalkDetail {
  name: string
  points: string
  timeDuration: TimeDuration
  profileImg: string
  totalCalorie: number
  totalDistanceMeter: number
}

export const fetchWalkDetail = async (date: string): Promise<APIResponse<WalkDetail[]>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<WalkDetail[]>>('/log/date', {
      params: {
        selectDate: date,
      },
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        console.error('산책 상세 내역 조회 오류:', response.data)
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
