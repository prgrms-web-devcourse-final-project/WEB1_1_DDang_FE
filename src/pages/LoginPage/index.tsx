import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import DogProfileSection from './DogProfileSection'
import CheckDogProfileSection from './CheckDogProfileSection'
import FamilyCodeSection from './FamilyCodeSection'

export default function LoginPage() {
  return (
    <S.LoginPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      <DogProfileSection />
      <FamilyCodeSection />
      <CheckDogProfileSection/>
    </S.LoginPage>
  )
}
