import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { GoBell } from 'react-icons/go'
import { Typo14, Typo17, Typo24 } from '~components/Typo'
import { LuClock5 } from 'react-icons/lu'
import { Separator } from '~components/Separator'
import { ActionButton } from '~components/Button/ActionButton'
import { GrLocation } from 'react-icons/gr'
import Profile from '~components/Profile'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      console.log('토큰 가져옴(숨김처리 예정) : ', accessToken)
      //URL에서 토큰 파라미터 제거하고 홈페이지로 리다이렉트, JWT토큰이 URL에 노출되어 히스토리에 남지 않게 함
      window.history.replaceState({}, '', '/')
      return
    }
    const storedToken = localStorage.getItem('accessToken')
    if (!storedToken) {
      console.log('토큰 없음 비로그인 상태. login페이지 이동.')
      navigate('/login')
    }
  }, [searchParams, navigate])
  return (
    <S.HomePage>
      <Helmet>
        <title>DDang | 반려견 산책 서비스</title>
        <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang.' />
      </Helmet>

      <S.Header>
        <Profile $size={32} $src='test.svg' />
        <GoBell cursor='pointer' size={28} />
      </S.Header>

      <S.Visual>
        <Typo24 $weight='700'>오늘은 아빠랑</Typo24>
        <Typo24 $weight='700'>산책가는 날!</Typo24>
      </S.Visual>

      <S.CharacterWrapper>
        <S.Character />
      </S.CharacterWrapper>

      <S.WalkInfoArea>
        <Typo17 $weight='700'>
          오늘 밤톨이가&nbsp;
          <Typo17 as='span' $weight='700' color='default'>
            1,293
          </Typo17>
          kcal 소비했어요!
        </Typo17>
        <S.WalkInfoWrapper>
          <S.WalkTime>
            <LuClock5 style={{ marginRight: 6 }} size={18} />
            <Typo14 $weight='700'>산책 시간&nbsp;</Typo14>
            <Typo14 $color='default' $weight='700'>
              1시간
            </Typo14>
          </S.WalkTime>
          <Separator $height={20} />
          <S.WalkDistance>
            <GrLocation style={{ marginRight: 6 }} size={18} />
            <Typo14 $weight='700'>산책한 거리&nbsp;</Typo14>{' '}
            <Typo14 as='span' color='default' $weight='700'>
              3km
            </Typo14>
          </S.WalkDistance>
        </S.WalkInfoWrapper>
      </S.WalkInfoArea>
      <ActionButton $fontWeight='700' $type='roundedRect'>
        산책 시작하기
      </ActionButton>
    </S.HomePage>
  )
}
