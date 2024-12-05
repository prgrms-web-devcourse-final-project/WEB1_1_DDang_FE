import * as S from './styles'
import { Typo13, Typo15, Typo20 } from '~components/Typo'
import { Separator } from '~components/Separator'
import Profile from '~components/Profile'
import { Dog } from '~types/api'
import { calculateAge } from '~utils/calculateAge'

type DogProfileProps = Pick<Dog, 'birthDate' | 'breed' | 'comment' | 'gender' | 'name' | 'profileImg'>

export default function DogProfile({ birthDate, breed, comment, gender, name, profileImg }: DogProfileProps) {
  return (
    <S.DogInfoArea>
      <S.DogInfoWrapper>
        <Profile $size={80} $src={profileImg} />
        <S.DogDetailWrapper>
          <S.TypoWrapper>
            <Typo20 $weight='700'>{name}</Typo20>
            <Typo15 $weight='400'>{breed}</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{calculateAge(birthDate)}살</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{gender === 'MALE' ? '남' : '여'}</Typo15>
          </S.TypoWrapper>
          <S.TypoWrapper>
            <Typo13>중성화 X</Typo13>
            <Separator $height={8} />
            <Typo13>3.4KG</Typo13>
          </S.TypoWrapper>
        </S.DogDetailWrapper>
      </S.DogInfoWrapper>

      <S.OneLineIntro>
        <Typo15 $weight='700' $color='default'>
          우리 댕댕이를 소개해요!
        </Typo15>
        <Typo13 $weight='500' style={{ lineHeight: 1.2 }}>
          {comment}
        </Typo13>
      </S.OneLineIntro>
    </S.DogInfoArea>
  )
}
