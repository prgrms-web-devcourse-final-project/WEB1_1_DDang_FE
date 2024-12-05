import { AxiosError } from 'axios'
import { APIResponse, CommonAPIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

export type CreateChatRoomRequest = {
  opponentMemberId: number
}

export type CreateChatRoomResponse = Pick<
  CommonAPIResponse,
  'chatRoomId' | 'name' | 'lastMessage' | 'unreadMessageCount' | 'members'
>

/**
 * 새로운 채팅방을 생성하고, 채팅방 정보를 반환합니다.
 *? 이미 동일한 맴버와의 채팅방이 있다면, 해당 채팅방을 반환합니다.
 */
export const createChatRoom = async (req: CreateChatRoomRequest): Promise<APIResponse<CreateChatRoomResponse>> => {
  try {
    const { data } = await axiosInstance.post<APIResponse<CreateChatRoomResponse>>(`/chat/rooms`, req)
    console.log(data.message || '채팅방 생성 성공')
    console.log(data.data)
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
