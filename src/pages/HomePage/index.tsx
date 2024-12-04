import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { GoBell } from 'react-icons/go'
import { Typo14, Typo17, Typo24 } from '~components/Typo'
import { LuClock5 } from 'react-icons/lu'
import { Separator } from '~components/Separator'
import { ActionButton } from '~components/Button/ActionButton'
import { GrLocation } from 'react-icons/gr'
import Profile from '~components/Profile'
import { fetchHomePageData, FetchHomePageDataResponse } from '~apis/main/fetchHomePageData'
import { useEffect, useState } from 'react'
import { useModalStore } from '~stores/modalStore'
import NotificationModal from '~modals/NotificationModal'

export default function HomePage() {
  const [data, setData] = useState<FetchHomePageDataResponse>()
  const { pushModal } = useModalStore()

  useEffect(() => {
    fetchHomePageData().then(data => setData(data.data))
  }, [])

  return (
    <S.HomePage>
      <Helmet>
        <title>DDang | 반려견 산책 서비스</title>
        <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang.' />
      </Helmet>

      <S.Header>
        <Profile $size={32} $src='test.svg' />
        <GoBell cursor='pointer' size={28} onClick={() => pushModal(<NotificationModal />)} />
      </S.Header>

      <S.Visual>
        {/* FAMILY_ROLE 적용 */}
        <Typo24 $weight='700'>오늘은 {data?.familyRole}랑</Typo24>
        <Typo24 $weight='700'>산책가는 날!</Typo24>
      </S.Visual>

      <S.CharacterWrapper>
        <S.Character />
      </S.CharacterWrapper>

      <S.WalkInfoArea>
        <Typo17 $weight='700'>
          오늘 {data?.dogName}가&nbsp;
          <Typo17 as='span' $weight='700' color='default'>
            {data?.totalCalorie}
          </Typo17>
          kcal 소비했어요!
        </Typo17>
        <S.WalkInfoWrapper>
          <S.WalkTime>
            <LuClock5 style={{ marginRight: 6 }} size={18} />
            <Typo14 $weight='700'>산책 시간&nbsp;</Typo14>
            <Typo14 $color='default' $weight='700'>
              {data?.timeDuration.hours}시간
              {data?.timeDuration.minutes}분
            </Typo14>
          </S.WalkTime>
          <Separator $height={20} />
          <S.WalkDistance>
            <GrLocation style={{ marginRight: 6 }} size={18} />
            <Typo14 $weight='700'>산책한 거리&nbsp;</Typo14>{' '}
            <Typo14 as='span' color='default' $weight='700'>
              {data && (data.totalDistanceMeter / 100).toFixed(1)}km
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
