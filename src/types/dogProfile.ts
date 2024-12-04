export interface DogProfileType {
  name: string
  image: string | undefined
  birth: Date | null
  intro: string
  gender: 'male' | 'female' | null
  isNeutered: boolean
  breed: string
  weight: string
}
