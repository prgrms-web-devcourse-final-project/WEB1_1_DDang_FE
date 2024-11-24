import { Typo15 } from '~components/Typo'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'

export default function LogPage() {
  return (
    <S.LogPage>
      <Helmet>
        <title>DDang | 산책 기록</title>
        <meta name='description' content='반려견과의 소중한 산책 기록을 확인하세요.' />
      </Helmet>
      <Typo15>LogPage</Typo15>
    </S.LogPage>
  )
}
