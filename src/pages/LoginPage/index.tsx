import * as S from './styles'
import { Helmet } from 'react-helmet-async'

const SOCIAL_LOGIN_BUTTONS = [
  { Component: S.Kakao, Icon: S.KakaoIcon, text: '카카오계정 로그인' },
  { Component: S.Naver, Icon: S.NaverIcon, text: '네이버로 로그인' },
  { Component: S.Google, Icon: S.GoogleIcon, text: '구글로 로그인' },
] as const

const TitleSection = () => (
  <S.TitleSection>
    건강한 반려 생활{'\n'}
    <S.BrandText>댕</S.BrandText>과 함께해요!
  </S.TitleSection>
)

const SocialLoginButtons = (): JSX.Element => {
  return (
    <S.SocialLoginSection>
      {SOCIAL_LOGIN_BUTTONS.map(({ Component, Icon, text }) => (
        <Component key={text} weight='700'>
          <div style={{ position: 'relative', width: '100%' }}>
            <Icon />
            <div style={{ textAlign: 'center' }}>{text}</div>
          </div>
        </Component>
      ))}
    </S.SocialLoginSection>
  )
}

export default function LoginPage() {
  return (
    <S.LoginPageContainer>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      <TitleSection />
      <S.Logo>로고</S.Logo>
      <SocialLoginButtons />
    </S.LoginPageContainer>
  )
}
