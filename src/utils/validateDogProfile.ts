import { DogProfileType } from '~types/dogProfile'

const regex = /^[가-힣]+$/
const familyCodeDummyData = ['TYK14TK2', '1234']

export const validateDogProfile = (dogProfile: DogProfileType): string | null => {
  if (!dogProfile.name) return '반려견의 이름을 입력해주세요'
  if (!regex.test(dogProfile.name) || dogProfile.name.length > 10) return '최대 10자의 한글이름만 사용해 주세요'
  if (!dogProfile.image) return '반려견의 사진을 등록해주세요'
  if (!dogProfile.birth) return '반려견의 생일을 입력해주세요'
  if (!dogProfile.intro) return '한줄 소개를 적어주세요'
  if (dogProfile.intro.length > 40) '한줄 소개는 최대 40자까지만 적어주세요'
  return null
}

export const validateDogDetailProfile = (dogProfile: DogProfileType): string | null => {
  if (!dogProfile.gender) return '성별을 선택해주세요'
  if (!dogProfile.breed) return '견종을 선택해주세요'
  if (!dogProfile.weight) return '몸무게를 입력해주세요'
  return null
}

export const validateFamilyCode = (familyCode: string): string | null => {
  if (!familyCode) return '가족 코드를 입력해주세요'
  if (!familyCodeDummyData.includes(familyCode)) return '가족 코드가 유효하지 않습니다'
  return null
}
