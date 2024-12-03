import { OwnerProfileType } from '~types/ownerProfile'

const regex = /^[가-힣]{1,10}$/

export const validateOwnerProfile = (ownerProfile: OwnerProfileType): string | null => {
  if (!ownerProfile.avatar) return '아바타를 선택해 주세요'
  if (!ownerProfile.nickName) return '견주님의 닉네임을 입력해주세요'
  if (!regex.test(ownerProfile.nickName)) return '닉네임은 한글로 10자 이내로 작성해 주세요'
  if (!ownerProfile.position) return '견주님의 역할을 선택해주세요'
  if (!ownerProfile.location) return '견주님의 위치 인증을 해주세요'
  if (!ownerProfile.gender) return '견주님의 성별을 선택해주세요'
  return null
}
