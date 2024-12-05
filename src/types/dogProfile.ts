export interface DogProfileType {
  name: string
  image?: string
  imageFile?: File
  birth: Date | null
  intro: string
  gender: 'MALE' | 'FEMALE' | null
  isNeutered: boolean
  breed: string
  weight: string
}
