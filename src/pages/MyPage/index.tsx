import { fetchMypage } from '~apis/myPage/fetchMypage'
import { Helmet } from 'react-helmet-async'
import { IoSettingsOutline } from 'react-icons/io5'
import { Typo14, Typo15, Typo24 } from '~components/Typo'
import SettingModal from '~modals/SettingModal'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import CountSection from '~components/WalkCountArea'
import { useQuery } from '@tanstack/react-query'
import DogProfile from '~components/DogProfile'
import { FAMILY_ROLE } from '~constants/familyRole'
import { useEffect, useState } from 'react'

export default function MyPage() {
  const { data } = useQuery({
    queryKey: ['myPage'],
    queryFn: fetchMypage,
  })
  const [ProfileImage, setProfileImage] = useState<React.ComponentType | null>(null)

  const myPageData = data?.data // API 응답 구조에 맞춰 접근
  console.log(myPageData)

  useEffect(() => {
    if (myPageData?.profileImg) {
      // profileImg에서 파일 번호를 추출
      const avatarNumber = myPageData.profileImg.match(/Avatar(\d+)/)?.[1]

      if (avatarNumber) {
        import(`../../../src/assets/avatars/Avatar${avatarNumber}.svg?react`)
          .then(module => {
            setProfileImage(() => module.default)
          })
          .catch(err => console.error('Error loading SVG:', err))
      }
    }
  }, [myPageData?.profileImg])

  const { pushModal } = useModalStore()
  const familyRole = Object.values(FAMILY_ROLE)
  console.log(familyRole)

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
            {ProfileImage && <ProfileImage />}
          </S.ProfileArea>
          <S.ProfileText>
            <Typo24 $weight='800'>{myPageData?.name}</Typo24>
            <Typo15 $weight='400' $color='font_2'>
              {myPageData?.address} 거주
            </Typo15>
            <S.TypoWrap>
              <Typo14 $weight='700'>{myPageData?.gender === 'FEMALE' ? '여자' : '남자'}</Typo14>
              <Typo14 $weight='700'>
                {myPageData?.familyRole ? FAMILY_ROLE[myPageData.familyRole as keyof typeof FAMILY_ROLE] : ''}
              </Typo14>
            </S.TypoWrap>
          </S.ProfileText>
        </S.ProfileSection>

        <CountSection />
        <S.DogProfileWrapper>{myPageData?.dog && <DogProfile dogProfile= {myPageData.dog} />}</S.DogProfileWrapper>

      </S.MainContainer>

      {/* <S.CountWrapperBig>{myPageData?.walkCount}회</S.CountWrapperBig>
      <S.CountWrapperBig>{myPageData?.totalDistance}km</S.CountWrapperBig>
      <S.CountWrapperBig>{myPageData?.countWalksWithMember}회</S.CountWrapperBig> */}
    </S.MyPage>
  )
}
