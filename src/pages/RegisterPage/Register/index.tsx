import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import AddOwnerAvatar from '~assets/add-dog-picture.svg'

export default function Register() {
  return (
    <S.Register>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>

      <S.TextSection weight='700'>견주님에 대해{'\n'}알려주세요</S.TextSection>

      <S.AddOwnerAvatarBtnWrapper>
        <S.AddOwnerAvatarBtn>
          <img src={AddOwnerAvatar} alt='프로필 선택' />
          <div>프로필 선택</div>
        </S.AddOwnerAvatarBtn>
      </S.AddOwnerAvatarBtnWrapper>
    </S.Register>
  )
}
