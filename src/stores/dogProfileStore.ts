import { create } from 'zustand'
import { DogProfileType } from '~types/dogProfile'

interface DogProfileStore {
  dogProfile: DogProfileType
  setDogProfile: (profile: Partial<DogProfileType>) => void
}

export const useDogProfileStore = create<DogProfileStore>(set => ({
  dogProfile: {
    name: '',
    image: undefined,
    imageFile: undefined,
    birth: null,
    intro: '',
    gender: null,
    isNeutered: false,
    breed: '',
    weight: '',
  },
  setDogProfile: update =>
    set(state => ({
      dogProfile: { ...state.dogProfile, ...update },
    })),
}))
