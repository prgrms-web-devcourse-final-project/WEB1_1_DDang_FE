import Header from '~components/Header'
import { Profile } from '~components/Profile'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import GraphIcon from '~/assets/graph.svg'

export default function LogPage() {
  return (
    <S.LogPage>
      <Helmet>
        <title>DDang | 산책 기록</title>
        <meta name='description' content='반려견과의 소중한 산책 기록을 확인하세요.' />
      </Helmet>
      <Header type={'sm'}>
        <Profile $size={32} $src='test.svg' />
        <S.dogName>밤톨이 일기</S.dogName>
        <S.graphImage src={GraphIcon} alt='' />
      </Header>
    </S.LogPage>
  )
}
