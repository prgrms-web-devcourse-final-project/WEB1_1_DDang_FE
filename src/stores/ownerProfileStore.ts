import { create } from 'zustand'
import { OwnerProfileType } from '~types/ownerProfile'

interface OwnerProfileStore {
  ownerProfile: OwnerProfileType
  setOwnerProfile: (profile: Partial<OwnerProfileType>) => void
}

export const useOwnerProfileStore = create<OwnerProfileStore>(set => ({
  ownerProfile: {
    memberId: undefined,
    name: '',
    email: '',
    provider: '',
    profileImg: '',
    familyRole: '',
    address: '',
    gender: 'MALE',
  },
  setOwnerProfile: profile =>
    set(state => ({
      ownerProfile: { ...state.ownerProfile, ...profile },
    })),
}))
