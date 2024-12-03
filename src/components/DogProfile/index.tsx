import * as S from './styles'
import { Typo13, Typo15, Typo20 } from '~components/Typo'
import { Separator } from '~components/Separator'

import Profile from '~components/Profile'
export default function DogProfile() {
  return (
    <S.DogInfoArea>
      <S.DogInfoWrapper>
        <Profile $size={80} $src={dogInfo.profileImg} />
        <S.DogDetailWrapper>
          <S.TypoWrapper>
            <Typo20 $weight='700'>{dogInfo.name}</Typo20>
            <Typo15 $weight='400'>{dogInfo.breed}</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{dogInfo.age}살</Typo15>
            <Separator $height={8} />
            <Typo15 $weight='400'>{dogInfo.gender === 'male' ? '남' : '여'}</Typo15>
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
          {dogInfo.intro}
        </Typo13>
      </S.OneLineIntro>
    </S.DogInfoArea>
  )
}

const dogInfo = {
  name: '밤톨이',
  breed: '포메라니안',
  age: 4,
  gender: 'male',
  neutered: false, // 중성화 여부
  weight: 3.4,
  profileImg: '',
  intro: `우리아이 안 물어요 착해요. 
  강아지껌을 너무 좋아해요 같이 놀아요. `,
}
