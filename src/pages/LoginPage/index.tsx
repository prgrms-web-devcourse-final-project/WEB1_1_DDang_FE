import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import DogProfileSection from './DogProfileSection'

export default function LoginPage() {
  return (
    <S.LoginPageContainer>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      {/* <DogProfileSection /> */}

      <S.TitleSection>건강한 반려 생활</S.TitleSection>
      <S.TitleSection>댕과 함께해요!</S.TitleSection>
      <S.Logo>로고</S.Logo>
    </S.LoginPageContainer>
  )
}
