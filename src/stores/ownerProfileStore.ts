import { create } from 'zustand'
import { OwnerProfileType } from '~types/ownerProfile'

interface OwnerProfileStore {
  ownerProfile: OwnerProfileType
  setOwnerProfile: (profile: Partial<OwnerProfileType>) => void
}

export const useOwnerProfileStore = create<OwnerProfileStore>(set => ({
  ownerProfile: {
    avatar: undefined,
    nickName: '',
    position: '',
    location: '',
    gender: null,
  },
  setOwnerProfile: profile =>
    set(state => ({
      ownerProfile: { ...state.ownerProfile, ...profile },
    })),
}))
