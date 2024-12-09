import { AxiosError } from 'axios'
import { APIResponse, CommonAPIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

export type InviteCodeResponse = Pick<CommonAPIResponse, 'familyId' | 'inviteCode' | 'expiresInSeconds'>

export const fetchInviteCode = async (): Promise<APIResponse<InviteCodeResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<InviteCodeResponse>>('/family/invite-code')
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse<ErrorResponse>>
      if (response) {
        const { code, message } = response.data
        switch (code) {
          case 400:
            throw new Error(message || '잘못된 요청입니다')
          case 401:
            throw new Error(message || '인증에 실패했습니다')
          case 500:
            throw new Error(message || '서버 오류가 발생했습니다')
          default:
            throw new Error(message || '알 수 없는 오류가 발생했습니다')
        }
      }
      throw new Error('네트워크 연결을 확인해주세요')
    }
    throw new Error('알 수 없는 오류가 발생했습니다')
  }
}
