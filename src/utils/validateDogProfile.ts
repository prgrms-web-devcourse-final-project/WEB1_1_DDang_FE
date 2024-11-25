interface DogProfileType {
  name: string
  image: string | undefined
  birth: string
  intro: string
}

const regex = /^[가-힣]+$/

export const validateDogProfile = (dogProfile: DogProfileType): string | null => {
  if (!dogProfile.name) return '반려견의 이름을 입력해주세요'
  if (!regex.test(dogProfile.name) || dogProfile.name.length > 10) return '최대 10자의 한글이름만 사용해 주세요'
  if (!dogProfile.image) return '반려견의 사진을 등록해주세요'
  if (!dogProfile.birth) return '반려견의 생일을 입력해주세요'
  if (!dogProfile.intro) return '한줄 소개를 적어주세요'
  if (dogProfile.intro.length > 50) '한줄 소개는 최대 50자까지 가능합니다'
  return null
}
