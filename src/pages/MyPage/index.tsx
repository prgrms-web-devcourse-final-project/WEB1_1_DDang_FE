import { useState } from 'react'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { IoSettingsOutline } from 'react-icons/io5'
import ProfileImage from '~assets/masterprofile.svg'
import { Typo13, Typo15, Typo24 } from '~components/Typo'
import ToggleBox from '~components/ToggleBox'
import { useTheme } from 'styled-components'
import SettingsModal from '~pages/MyPage/SettingModal'

export default function MyPage() {
  const theme = useTheme()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleSettingsClick = () => {
    setIsSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <S.MyPage>
      <Helmet>
        <title>DDang | 마페</title>
        <meta name='description' content='나의 반려견 정보와 산책 기록을 관리하세요.' />
      </Helmet>
      <S.HeaderContainer>
        마이페이지
        <S.SettingIcon onClick={handleSettingsClick}>
          <IoSettingsOutline cursor='pointer' size={28} />
        </S.SettingIcon>
      </S.HeaderContainer>

      <S.MainContainer>
        <S.ProfileSection>
          <S.ProfileArea>
            <img src={ProfileImage} />
          </S.ProfileArea>
          <S.ProfileText>
            <Typo24 weight='800'>닉네임</Typo24>
            <Typo15 weight='400' style={{ color: theme.colors.grayscale.font_2 }}>
              용산구 남영구 거주
            </Typo15>
            <S.TypoWrap>
              <Typo13 weight='700'>남자</Typo13>
              <Typo13 weight='700'>할아버지</Typo13>
            </S.TypoWrap>
          </S.ProfileText>
        </S.ProfileSection>

        <S.CountSection>
          <S.CountArea>
            <S.CountWrapperBig>23회</S.CountWrapperBig>
            <S.CountWrapperSmall>누적 산책 횟수</S.CountWrapperSmall>
          </S.CountArea>

          <S.CountArea>
            <S.CountWrapperBig>32km</S.CountWrapperBig>
            <S.CountWrapperSmall>총 산책거리</S.CountWrapperSmall>
          </S.CountArea>

          <S.CountArea>
            <S.CountWrapperBig>16회</S.CountWrapperBig>
            <S.CountWrapperSmall>강번따 횟수</S.CountWrapperSmall>
          </S.CountArea>
        </S.CountSection>

        <S.GangbunttaArea>
          <ToggleBox type='md' setting='gangbuntta' />
        </S.GangbunttaArea>

        <S.ButtonArea>
          <S.CustomActionButton $type='semiRoundedRect' $bgColor='font_1'>
            로그아웃
          </S.CustomActionButton>
        </S.ButtonArea>
      </S.MainContainer>
      <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </S.MyPage>
  )
}
