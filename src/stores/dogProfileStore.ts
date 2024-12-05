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
    birthDate: undefined,
    intro: '',
    gender: null,
    isNeutered: 'FALSE',
    breed: '',
    weight: 0,
  },
  setDogProfile: update =>
    set(state => ({
      dogProfile: { ...state.dogProfile, ...update },
    })),
}))
