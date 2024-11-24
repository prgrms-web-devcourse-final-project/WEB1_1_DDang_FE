import { IoChevronBack } from 'react-icons/io5'
import MapComponent from './components/MapComponent'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

export default function WalkPage() {
  const navigate = useNavigate()

  return (
    <S.WalkPage>
      <Helmet>
        <title>DDang | 산책하기</title>
        <meta name='description' content='반려견과 함께 산책을 시작해보세요.' />
      </Helmet>

      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <IoChevronBack size={24} />
        </S.BackButton>
        <S.LocationText>강남구 논현동</S.LocationText>
        <S.ProfileImgWrapper>
          <S.ProfileImg />
        </S.ProfileImgWrapper>
      </S.Header>

      <MapComponent />
    </S.WalkPage>
  )
}
