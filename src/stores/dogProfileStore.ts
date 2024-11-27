import { create } from 'zustand'

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

interface DogProfileStore {
  dogProfile: DogProfileType
  setDogProfile: (profile: Partial<DogProfileType>) => void
}

export const useDogProfileStore = create<DogProfileStore>(set => ({
  dogProfile: {
    name: '',
    image: undefined,
    birth: '',
    intro: '',
    gender: null,
    isNeutered: false,
    breed: '',
    weight: '',
  },
  setDogProfile: profile =>
    set(state => ({
      dogProfile: { ...state.dogProfile, ...profile },
    })),
}))
