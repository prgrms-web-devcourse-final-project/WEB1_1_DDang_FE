import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/apiResponse'
import { axiosInstance } from '~apis/axiosInstance'

type Provider = string
type Gender = 'MALE' | 'FEMALE'
type FamilyRole = 'BROTHER' | 'MOTHER' | 'FATHER' | 'SISTER'

interface CreateRegisterRequest {
  email: string
  provider: string
  name: string
  birthDate: string
  gender: Gender
  address: string
  familyRole: FamilyRole
  profileImg: string
}
interface CreateRegisterRequest {
  email: string
  provider: Provider
  name: string
  birthDate: string
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
  birthDate: string
  gender: Gender
  address: string
  familyRole: FamilyRole
  profileImg: string
}

export const createRegister = async (req: CreateRegisterRequest): Promise<APIResponse<CreateRegisterResponse>> => {
  try {
    const { data } = await axiosInstance.post<APIResponse<CreateRegisterResponse>>('/member/join', {
      ...req,
      gender: req.gender as Gender,
      provider: req.provider as Provider,
      familyRole: req.familyRole as FamilyRole,
    })
    return data
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
