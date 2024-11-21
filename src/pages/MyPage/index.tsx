import * as S from './styles'
import { Helmet } from 'react-helmet-async'

export default function MyPage() {
  return (
    <S.MyPage>
      <Helmet>
        <title>DDang | 마이페이지</title>
        <meta name='description' content='나의 반려견 정보와 산책 기록을 관리하세요.' />
      </Helmet>
      MyPage
    </S.MyPage>
  )
}
