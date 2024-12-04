import { useNavigate, useParams } from 'react-router-dom'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo13, Typo15, Typo20, Typo24 } from '~components/Typo'
import * as S from './styles'

import DogProfile from '~components/DogProfile'
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

      <DogProfile />
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
