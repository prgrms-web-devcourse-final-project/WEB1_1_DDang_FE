import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'
import { BooleanString } from '~types/common'

export type FetchNotificationListRequest = {
  page: number
}

export type FetchNotificationListResponse = {
  size: number
  content: [
    {
      notificationId: number
      type: string
      content: string
      isRead: BooleanString
      memberId: number
      createdAt: string
    },
  ]
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  pageable: {
    offset: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    pageSize: number
    paged: boolean
    pageNumber: number
    unpaged: boolean
  }
  first: boolean
  last: boolean
  empty: boolean
}

export const fetchNotificationList = async (
  req: FetchNotificationListRequest
): Promise<APIResponse<FetchNotificationListResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<FetchNotificationListResponse>>(`/notification/list`, {
      params: req,
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
