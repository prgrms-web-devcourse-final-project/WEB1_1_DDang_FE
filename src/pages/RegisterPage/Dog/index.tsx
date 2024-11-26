import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import DogProfileDetailSection from '~modals/RegisterDogModal/DogProfileDetailSection'

export default function RegisterDogPage() {
  return (
    <S.RegisterDogPage>
      <Helmet>
        <title>DDang | 반려견 정보 등록</title>
        <meta name='description' content='반려견의 정보를 등록하세요.' />
      </Helmet>
      <DogProfileDetailSection />
    </S.RegisterDogPage>
  )
}
