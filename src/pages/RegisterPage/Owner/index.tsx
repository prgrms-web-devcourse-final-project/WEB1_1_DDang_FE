import * as S from './styles'
import { Helmet } from 'react-helmet-async'

export default function RegisterPage() {
  return (
    <S.RegisterPage>
      <Helmet>
        <title>DDang | 견주 정보 등록</title>
        <meta name='description' content='견주님의 정보를 등록하세요.' />
      </Helmet>
      RegisterPage
    </S.RegisterPage>
  )
}
