import * as S from './styles'
import { Helmet } from 'react-helmet-async'
// import { ActionButton } from '../../components/Button/ActionButton'

export default function MyPage() {
  return (
    <S.MyPage>
      <Helmet>
        <title>DDang | 마이페이지</title>
        <meta name='description' content='나의 반려견 정보와 산책 기록을 관리하세요.' />
      </Helmet>
      <p>MyPage</p>
      <S.ButtonArea>
        <S.CustomActionButton $type='semiRoundedRect' $bgColor='font_1'>
          로그아웃
        </S.CustomActionButton>
      </S.ButtonArea>
    </S.MyPage>
  )
}
