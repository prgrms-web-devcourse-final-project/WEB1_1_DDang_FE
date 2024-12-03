import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/apiResponse'
import { axiosInstance } from '~apis/axiosInstance'

interface FetchWalkSchedulesRequest {}

interface FetchWalkSchedulesResponse {
  walkScheduleId: number
  dayOfWeek: string
  walkTime: string
  memberName: string
  dogName: string
  familyId: number
}

export const fetchWalkSchedules = async (
  req: FetchWalkSchedulesRequest
): Promise<APIResponse<FetchWalkSchedulesResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<FetchWalkSchedulesResponse>>(`/walk-schedules`, req)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>

      if (response) {
        //? 서버에서 응답이 왔지만 에러가 발생한 경우
        console.error('ErrorMessage', response.data)
        throw new Error(response.data.message ?? '요청 실패')
      }

      if (request) {
        //? 요청 자체가 실패한 경우 : 네트워크 연결 문제나 CORS 에러와 같은 클라이언트 측 문제
        console.error('요청 에러:', request)
        throw new Error('네트워크 연결을 확인해주세요')
      }
    }

    console.error('예상치 못한 에러:', error)
    throw new Error('다시 시도해주세요')
  }
}
