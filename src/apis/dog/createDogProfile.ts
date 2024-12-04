import { AxiosError } from 'axios'
import { APIResponse, ErrorResponse } from '~types/api'
import { axiosInstance } from '~apis/axiosInstance'

export interface CreateDogProfileRequest {
  name: string
  breed: string
  birthDate: Date
  weight: number
  gender: 'MALE' | 'FEMALE'
  profileImg: File // string에서 File로 변경
  isNeutered: 'TRUE' | 'FALSE'
  familyId: null
  comment: string
}
interface CreateDogProfileResponse {
  dogId: number
  name: string
  breed: string
  birthDate: string
  weight: number
  gender: 'MALE' | 'FEMALE'
  profileImg: File
  isNeutered: 'TRUE' | 'FALSE'
  familyId: number
  comment: string
}

export const createDogProfile = async (
  dogData: CreateDogProfileRequest,
  imageFile: File
): Promise<APIResponse<CreateDogProfileResponse>> => {
  try {
    const formData = new FormData()

    // 이미지 파일 추가
    formData.append('profileImg', imageFile)

    // 나머지 데이터 추가
    const dogInfo = {
      name: dogData.name,
      breed: dogData.breed,
      birthDate: dogData.birthDate,
      weight: dogData.weight,
      gender: dogData.gender,
      isNeutered: dogData.isNeutered,
      familyId: dogData.familyId,
      comment: dogData.comment,
    }
    formData.append('dogInfo', new Blob([JSON.stringify(dogInfo)], { type: 'application/json' }))

    const { data } = await axiosInstance.post<APIResponse<CreateDogProfileResponse>>('/dogs/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
