export interface DogProfileType {
  name: string
  image?: string
  imageFile?: File
  birthDate?: string
  intro: string //한줄소개
  gender: 'MALE' | 'FEMALE' | null
  isNeutered: 'TRUE' | 'FALSE'
  breed: string
  weight: number
}
