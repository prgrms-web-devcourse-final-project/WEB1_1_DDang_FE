import { useNavigate, useParams } from 'react-router-dom'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo13, Typo15, Typo20, Typo24 } from '~components/Typo'
import * as S from './styles'

export default function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  console.log(id) //todo id 이용해 fetch
  return (
    <S.ProfilePage>
      <S.Header type='sm' prevBtn onClickPrev={() => navigate(-1)} title='닉네임' />

      <S.ProfileArea>
        <Profile $size={140} $src={userInfo.profileImg} />
        <Typo24 $weight='800'>{userInfo.name}</Typo24>
        <Typo15 $weight='500' $color='font_2'>
          {userInfo.location} 거주
        </Typo15>
        <S.TypoWrapper $gap={8}>
          <Typo13 $weight='700'>{userInfo.gender === 'male' ? '남자' : '여자'}</Typo13>
          <Separator $height={8} />
          <Typo13 $weight='700'>{userInfo.role}</Typo13>
        </S.TypoWrapper>
      </S.ProfileArea>

      <S.WalkInfoArea>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{userInfo.walkCount}회</Typo20>
          <Typo13 $weight='500'>누적 산책 횟수</Typo13>
        </S.WalkInfoWrapper>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{userInfo.walkDistance}km</Typo20>
          <Typo13 $weight='500'>총 산책 거리</Typo13>
        </S.WalkInfoWrapper>
        <S.WalkInfoWrapper>
          <Typo20 $weight='800'>{userInfo.gangbunttaCount}회</Typo20>
          <Typo13 $weight='500'>강번따 횟수</Typo13>
        </S.WalkInfoWrapper>
      </S.WalkInfoArea>

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
          <Typo15 $weight='800' $color='default'>
            우리 댕댕이를 소개해요!
          </Typo15>
          <Typo13 $weight='500' style={{ lineHeight: 1.2 }}>
            {dogInfo.intro}
          </Typo13>
        </S.OneLineIntro>
      </S.DogInfoArea>
    </S.ProfilePage>
  )
}

const userInfo = {
  name: '이성훈',
  gender: 'male',
  location: '용산구 남영동',
  role: '할아버지',
  walkCount: 23,
  walkDistance: 32,
  gangbunttaCount: 16,
  profileImg: '',
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
