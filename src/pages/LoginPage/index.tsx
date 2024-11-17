import * as S from './styles'
import { Helmet } from 'react-helmet'

export default function LoginPage() {
  return (
    <S.LoginPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      LoginPage
    </S.LoginPage>
  )
}
