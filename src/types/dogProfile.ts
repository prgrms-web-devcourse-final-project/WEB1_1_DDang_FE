import { BooleanString, Gender } from './common'

export interface DogProfileType {
  name: string
  profileImg: string
  profileImgFile?: File
  birthDate: string
  gender: Gender | null
  isNeutered: BooleanString
  breed: string
  weight?: number
  comment: string
}
