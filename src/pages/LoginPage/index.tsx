import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import Logo from '~assets/favicon.svg?react'
const serverUrl = import.meta.env.VITE_SERVER_URL
const BACK_URL = new URL(serverUrl).origin

const SOCIAL_LOGIN_BUTTONS = [
  {
    Component: S.Kakao,
    Icon: S.KakaoIcon,
    text: '카카오계정 로그인',
    href: `${BACK_URL}/oauth2/authorization/kakao`,
  },
  {
    Component: S.Google,
    Icon: S.GoogleIcon,
    text: '구글로 로그인',
    href: `${BACK_URL}/oauth2/authorization/google`,
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
  const handleLogin = (href: string) => {
    window.location.href = href
  }

  return (
    <S.SocialLoginSection>
      {SOCIAL_LOGIN_BUTTONS.map(({ Component, Icon, text, href }) => (
        <Component key={text} weight='700' onClick={() => handleLogin(href)}>
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
      <S.Logo>
        <Logo width='90%' height='90%' />
      </S.Logo>
      <SocialLoginButtons />
    </S.LoginPage>
  )
}
