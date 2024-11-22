import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'

export default function CheckDogProfileSection() {

  const handleClickPrev = () => {

  }

  return (
          <S.CheckDogProfileSection>
            <Header
              type='sm' 
              onClickPrev={handleClickPrev}
              prevBtn={true}
            />
            <S.TypoWrapper>
              <Typo24 weight='700'>이 반려견이<br/>맞나요?</Typo24>
            </S.TypoWrapper>
            <ActionButton>다음</ActionButton>
          </S.CheckDogProfileSection>
  )
}