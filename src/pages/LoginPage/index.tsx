import * as S from './styles'
import { Helmet } from 'react-helmet-async'

const SOCIAL_LOGIN_BUTTONS = [
  {
    Component: S.Kakao,
    Icon: S.KakaoIcon,
    text: '카카오계정 로그인',
    href: '/oauth2/authorization/kakao',
  },
  {
    Component: S.Naver,
    Icon: S.NaverIcon,
    text: '네이버로 로그인',
    href: '/oauth2/authorization/naver',
  },
  {
    Component: S.Google,
    Icon: S.GoogleIcon,
    text: '구글로 로그인',
    href: '/oauth2/authorization/google',
  },
] as const

const TitleSection = () => (
  <S.TitleSection>
    <span>
      건강한 반려 생활{'\n'}
      <S.BrandText>댕</S.BrandText>과 함께해요!
    </span>
  </S.TitleSection>
)

const SocialLoginButtons = (): JSX.Element => {
  const handleLogin = () => {
    window.location.href = '/oauth2/authorization/kakao'
  }
  return (
    <S.SocialLoginSection>
      {SOCIAL_LOGIN_BUTTONS.map(({ Component, Icon, text }) => (
        <Component key={text} weight='700' onClick={handleLogin}>
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
    <S.LoginPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='robots' content='noindex' />
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      <TitleSection />
      <S.Logo>로고</S.Logo>
      <SocialLoginButtons />
    </S.LoginPage>
  )
}
