import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/apiResponse'
import { axiosInstance } from '~apis/axiosInstance'

interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
}

interface WalkLogDetail {
  points: string
  timeDuration: TimeDuration
  totalCalorie: number
  totalDistanceMeter: number
}

export interface FetchWalkLogByDateRequest {
  date: string // "YYYY-MM-DD" 형식
}

interface FetchWalkLogByDateResponse {
  data: WalkLogDetail[]
}

export const fetchWalkLogByDate = async (date: string): Promise<APIResponse<FetchWalkLogByDateResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<FetchWalkLogByDateResponse>>('/log/date', {
      params: {
        selectDate: date,
      },
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        console.error('산책 내역 조회 오류:', response.data)
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
