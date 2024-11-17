import * as S from './styles'
import { Helmet } from 'react-helmet-async'

export default function HomePage() {
  return (
    <S.HomePage>
      <Helmet>
        <title>DDang | 반려견 산책 서비스</title>
        <meta name='description' content='반려견과 함께하는 즐거운 산책, DDang과 함께하세요.' />
      </Helmet>
      HomePage
    </S.HomePage>
  )
}
