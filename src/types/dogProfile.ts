export interface DogProfileType {
  name: string
  image: string | undefined
  birth: string
  intro: string
  gender: 'male' | 'female' | null
  isNeutered: boolean
  breed: string
  weight: string
}
