import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import DogProfileSection from './DogProfileSection'
import DogProfileDetailSection from './DogProfileDetailSection'
import FamilyCodeSection from './FamilyCodeSection'
import CheckDogProfileSection from './CheckDogProfileSection'


export default function LoginPage() {
  return (
    <S.LoginPageContainer>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      {/* <DogProfileSection /> */}
      <S.TitleSection>
        건강한 반려 생활{'\n'}
        <S.BrandText>댕</S.BrandText>과 함께해요!
      </S.TitleSection>{' '}
      <S.Logo>로고</S.Logo>
      <S.SocialLoginSection>
        <S.Kakao weight='700'>
          <S.KakaoIcon />
          카카오계정 로그인
        </S.Kakao>
        <S.Naver weight='700'>
          <S.NaverIcon />
          네이버로 로그인
        </S.Naver>
        <S.Gogle weight='700'>
          <S.GoogleIcon />
          구글로 로그인
        </S.Gogle>
      </S.SocialLoginSection>
    </S.LoginPageContainer>
  )
}
