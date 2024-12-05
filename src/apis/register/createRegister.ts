import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

// import { useSearchParams } from 'react-router-dom'
// import { useEffect } from 'react'
type Provider = string
type Gender = 'MALE' | 'FEMALE'
type FamilyRole =
  | 'MOTHER'
  | 'FATHER'
  | 'ELDER_BROTHER'
  | 'OLDER_BROTHER'
  | 'ELDER_SISTER'
  | 'OLDER_SISTER'
  | 'GRANDFATHER'
  | 'GRANDMOTHER'

interface CreateRegisterRequest {
  email: string
  provider: string
  name: string
  gender: Gender
  address: string
  familyRole: FamilyRole
  profileImg: string
}

interface CreateRegisterResponse {
  memberId: number
  name: string
  email: string
  provider: Provider
  gender: Gender
  address: string
  familyRole: FamilyRole
  profileImg: string
}

export const createRegister = async (req: CreateRegisterRequest): Promise<APIResponse<CreateRegisterResponse>> => {
  try {
    const response = await axiosInstance.post<APIResponse<CreateRegisterResponse>>('/member/join', {
      ...req,
      gender: req.gender as Gender,
      provider: req.provider as Provider,
      familyRole: req.familyRole as FamilyRole,
    })

    const accessToken = response.headers['authorization']
    const refreshToken = response.headers['refresh']
    if (accessToken) {
      localStorage.setItem('token', accessToken)
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    }

    if (response.data) {
      alert('견주정보 입력 완료')
      console.log(response.data)
    }
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response, request } = error as AxiosError<ErrorResponse>
      if (response) {
        console.error('ErrorMessage', response.data)
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
