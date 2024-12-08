import DogFood from '~assets/dog_food.svg?react'
import { ActionButton } from '~components/Button/ActionButton'
import { Typo24 } from '~components/Typo'
import * as S from './styles'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <S.NotFoundPage>
      <S.ErrorMessage>404!</S.ErrorMessage>
      <Typo24 $textAlign='center' $weight='800' style={{ marginBottom: 24 }}>
        요청하신 페이지를 찾을 수 없어요
      </Typo24>
      <ActionButton $type='roundedRect' onClick={() => navigate(-1)}>
        되돌아가기
      </ActionButton>
      <S.Wrapper>
        <DogFood />
      </S.Wrapper>
    </S.NotFoundPage>
  )
}
