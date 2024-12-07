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
    //? 채팅 구현을 위해 임의로 추가한 부분입니다.
    memberId: undefined,
  },
  setOwnerProfile: profile =>
    set(state => ({
      ownerProfile: { ...state.ownerProfile, ...profile },
    })),
}))
