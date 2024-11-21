import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { IoSettingsOutline } from 'react-icons/io5'

export default function MyPage() {
  return (
    <S.MyPage>
      <Helmet>
        <title>DDang | 마페</title>
        <meta name='description' content='나의 반려견 정보와 산책 기록을 관리하세요.' />
      </Helmet>
      <S.HeaderContainer>
        마이페이지
        <S.SettingIcon>
          <IoSettingsOutline cursor='pointer' size={28} />
        </S.SettingIcon>
      </S.HeaderContainer>

      <S.MainContainer>
        <S.ButtonArea>
          <S.CustomActionButton $type='semiRoundedRect' $bgColor='font_1'>
            로그아웃
          </S.CustomActionButton>
        </S.ButtonArea>
      </S.MainContainer>
    </S.MyPage>
  )
}
