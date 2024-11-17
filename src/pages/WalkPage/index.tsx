import * as S from './styles'
import { Helmet } from 'react-helmet'

export default function WalkPage() {
  return (
    <S.WalkPage>
      <Helmet>
        <title>DDang | 산책하기</title>
        <meta name='description' content='반려견과 함께 산책을 시작해보세요.' />
      </Helmet>
      WalkPage
    </S.WalkPage>
  )
}
