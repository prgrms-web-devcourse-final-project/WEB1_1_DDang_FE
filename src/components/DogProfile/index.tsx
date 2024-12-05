import * as S from './styles'
import { Typo13, Typo15, Typo20 } from '~components/Typo'
import { Separator } from '~components/Separator'
import Profile from '~components/Profile'
import { DogProfileType } from '~types/dogProfile'

//날짜 계산 로직
const calculateAge = (birthDate: Date | null): number => {
  if (!birthDate) return 0
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}
export default function DogProfile({ name, gender, image, birth, breed, intro }: DogProfileType) {
  const age = calculateAge(birth)
  return (
    <S.DogInfoArea>
      <S.DogInfoWrapper>
        <Profile $size={80} $src={image} />
        <S.DogDetailWrapper>
          <S.TypoWrapper>
            <Typo20 $weight='700'>{name}</Typo20>
            <Typo15 $weight='400'>{breed}</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{age}살</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{gender === 'MALE' ? '남' : '여'}</Typo15>
          </S.TypoWrapper>
        </S.DogDetailWrapper>
      </S.DogInfoWrapper>

      <S.OneLineIntro>
        <Typo15 $weight='700' $color='default'>
          우리 댕댕이를 소개해요!
        </Typo15>
        <Typo13 $weight='500' style={{ lineHeight: 1.2 }}>
          {intro}
        </Typo13>
      </S.OneLineIntro>
    </S.DogInfoArea>
  )
}
