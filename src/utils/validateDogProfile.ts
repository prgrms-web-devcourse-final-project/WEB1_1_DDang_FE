interface DogProfileType {
  name: string
  image: string | undefined
  birth: string
  intro: string
}

export const validateDogProfile = (dogProfile: DogProfileType): string | null => {
  if (!dogProfile.name) return '반려견의 이름을 입력해주세요'
  if (!dogProfile.image) return '반려견의 사진을 등록해주세요'
  if (!dogProfile.birth) return '반려견의 생일을 입력해주세요'
  if (!dogProfile.intro) return '한줄 소개를 적어주세요'
  return null
}
