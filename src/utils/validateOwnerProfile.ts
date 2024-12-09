import { OwnerProfileType } from '~types/ownerProfile'

const regex = /^[가-힣]{1,10}$/

export const validateOwnerProfile = (
  ownerProfile: OwnerProfileType,
  options?: { skipAddress?: boolean } // 옵션 추가
): string | null => {
  if (!ownerProfile.familyRole) return '아바타를 선택해 주세요'
  if (!ownerProfile.name) return '견주님의 닉네임을 입력해주세요'
  if (!regex.test(ownerProfile.name)) return '닉네임은 한글로 10자 이내로 작성해 주세요'
  if (!ownerProfile.familyRole) return '견주님의 역할을 선택해주세요'
  if (!options?.skipAddress && !ownerProfile.address) return '견주님의 위치 인증을 해주세요' // address 검사 조건 추가
  if (!ownerProfile.gender) return '견주님의 성별을 선택해주세요'
  return null
}
