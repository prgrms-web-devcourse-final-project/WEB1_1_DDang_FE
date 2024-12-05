export interface DogProfileType {
  name: string
  profileImg?: string
  profileImgFile?: File
  birthDate?: string
  gender: 'MALE' | 'FEMALE' | null
  isNeutered: 'TRUE' | 'FALSE'
  breed: string
  weight: number
  comment?: string
}
