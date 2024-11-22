import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import DogProfileSection from './DogProfileSection'
import DogProfileDetailSection from './DogProfileDetailSection'
import FamilyCodeSection from './FamilyCodeSection'


export default function LoginPage() {
  return (
    <S.LoginPage>
      <Helmet>
        <title>DDang | 로그인</title>
        <meta name='description' content='DDang 서비스 로그인' />
      </Helmet>
      <DogProfileSection />
      <DogProfileDetailSection />
      <FamilyCodeSection />
    </S.LoginPage>
  )
}
