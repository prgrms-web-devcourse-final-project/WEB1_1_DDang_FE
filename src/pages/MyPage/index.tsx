import { fetchMypage } from '~apis/myPage/fetchMypage'
// import ProfileImage from 'assets/masterprofile.svg?react'
import { Helmet } from 'react-helmet-async'
import { IoSettingsOutline } from 'react-icons/io5'
import { useTheme } from 'styled-components'
import { Typo13, Typo15, Typo24 } from '~components/Typo'
import SettingModal from '~modals/SettingModal'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import CountSection from '~components/WalkCountArea'
import { useQuery } from '@tanstack/react-query'
import DogProfile from '~components/DogProfile'

export default function MyPage() {
  const { data } = useQuery({
    queryKey: ['myPage'],
    queryFn: fetchMypage,
  })

  const myPageData = data?.data // API 응답 구조에 맞춰 접근
  console.log(myPageData)

  const theme = useTheme()
  const { pushModal } = useModalStore()

  const onSettingsClick = () => {
    pushModal(<SettingModal />)
  }

  return (
    <S.MyPage>
      <Helmet>
        <title>DDang | 마이페이지</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content='나의 반려견 정보와 산책 기록을 관리하세요.' />
      </Helmet>
      <S.HeaderContainer>
        마이페이지
        <S.SettingIcon onClick={onSettingsClick}>
          <IoSettingsOutline cursor='pointer' size={28} />
        </S.SettingIcon>
      </S.HeaderContainer>

      <S.MainContainer>
        <S.ProfileSection>
          <S.ProfileArea>
            {/* <ProfileImage /> */}
            {myPageData?.profileImg}
          </S.ProfileArea>
          <S.ProfileText>
            <Typo24 $weight='800'>{myPageData?.name}</Typo24>
            <Typo15 $weight='400' $color='font_2'>
              {myPageData?.address} 거주
            </Typo15>
            <S.TypoWrap>
              <Typo13 $weight='700'>{myPageData?.gender}</Typo13>
              <Typo13 $weight='700'>{myPageData?.familyRole}</Typo13>
            </S.TypoWrap>
          </S.ProfileText>
        </S.ProfileSection>

        <CountSection walkCount={23} totalDistance={32} gangCount={16} />
        <S.DogProfileWrapper>{myPageData?.dog && <DogProfile {...myPageData.dog} />}</S.DogProfileWrapper>
      </S.MainContainer>

      {/* <S.CountWrapperBig>{myPageData?.walkCount}회</S.CountWrapperBig>
      <S.CountWrapperBig>{myPageData?.totalDistance}km</S.CountWrapperBig>
      <S.CountWrapperBig>{myPageData?.countWalksWithMember}회</S.CountWrapperBig> */}
    </S.MyPage>
  )
}
