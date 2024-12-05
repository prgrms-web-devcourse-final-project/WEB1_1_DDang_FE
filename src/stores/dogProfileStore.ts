import { create } from 'zustand'
import { DogProfileType } from '~types/dogProfile'

interface DogProfileStore {
  dogProfile: DogProfileType
  setDogProfile: (profile: Partial<DogProfileType>) => void
}

export const useDogProfileStore = create<DogProfileStore>(set => ({
  dogProfile: {
    name: '',
    profileImg: undefined,
    profileImgFile: undefined,
    birthDate: undefined,
    comment: '',
    gender: null,
    isNeutered: 'FALSE',
    breed: '',
    weight: 0,
    familyId: null,
  },
  setDogProfile: update =>
    set(state => ({
      dogProfile: { ...state.dogProfile, ...update },
    })),
}))
