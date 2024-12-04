import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
}

interface TotalWalkRecordsResponse {
  timeDuration: TimeDuration
  walkCount: number
  totalDistanceKilo: number
}

export const fetchTotalWalkRecords = async (): Promise<APIResponse<TotalWalkRecordsResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<TotalWalkRecordsResponse>>('/log/total')
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        console.error('전체 산책 기록 조회 오류:', response.data)
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
