import { AxiosError } from 'axios'
import { APIResponse, CommonAPIRequest, CommonAPIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

export type FetchMypageResponse = Pick<
  CommonAPIResponse,
  | 'memberId'
  | 'address'
  | 'gender'
  | 'familyRole'
  | 'profileImg'
  | 'isMatched'
  | 'totalDistance'
  | 'walkCount'
  | 'countWalksWithMember'
  | 'dog'
  | 'dogId'
  | 'breed'
  | 'birthDate'
  | 'weight'
  | 'isNeutered'
  | 'familyId'
  | 'comment'
>

export const fetchMypage = async (): Promise<APIResponse<FetchMypageResponse>> => {
  try {
    const { data } = await axiosInstance.get<APIResponse<FetchMypageResponse>>(`/member/mypage`)
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

// import { AxiosError } from 'axios'
// import { axiosInstance } from '~apis/axiosInstance'
// import { APIResponse, ErrorResponse } from '~types/api'

// export interface GetDogInfoResponse {
//   memberId: number
//   name: string
//   address: string
//   gender: 'MALE' | 'FEMALE'
//   familyRole: string
//   profileImg: string
//   isMatched: 'TRUE' | 'FALSE'
//   totalDistance: number
//   walkCount: number
//   countWalksWithMember: number
//   dog: {
//     dogId: number
//     name: string
//     breed: string
//     birthDate: string
//     weight: number
//     gender: 'MALE' | 'FEMALE'
//     profileImg: string
//     isNeutered: 'TRUE' | 'FALSE'
//     familyId: number
//     comment: string
//   }
// }

// export const fetchMypage = async (): Promise<APIResponse<GetDogInfoResponse>> => {
//   try {
//     const { data } = await axiosInstance.get<APIResponse<GetDogInfoResponse>>('/member/mypage')
//     return data
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const { response, request } = error as AxiosError<ErrorResponse>
//       if (response) {
//         throw new Error(response.data.message ?? '요청 실패')
//       }
//       if (request) {
//         throw new Error('네트워크 연결을 확인해주세요')
//       }
//     }
//     throw new Error('다시 시도해주세요')
//   }
// }
